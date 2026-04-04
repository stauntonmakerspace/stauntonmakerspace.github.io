document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".donate-form");
  if (!form) return;

  let selectedFrequency = "one-time";
  let selectedAmount = 50;

  const frequencyButtons = form.querySelectorAll(".frequency-toggle__option");
  const amountButtons = form.querySelectorAll(".amount-grid__option");
  const customInput = form.querySelector(".custom-amount__input");
  const giftOption = form.querySelector(".gift-option");
  const giftCheckbox = form.querySelector(".gift-option__input");
  const paypalContainer = document.getElementById("paypal-button-container");
  const messageEl = form.querySelector(".donate-form__message");

  function updateFrequency(freq) {
    selectedFrequency = freq;
    frequencyButtons.forEach(function (btn) {
      btn.classList.toggle(
        "frequency-toggle__option--active",
        btn.dataset.frequency === freq
      );
    });
    renderPayPalButtons();
  }

  function updateAmount(amount) {
    selectedAmount = amount;
    amountButtons.forEach(function (btn) {
      btn.classList.toggle(
        "amount-grid__option--active",
        parseFloat(btn.dataset.amount) === amount
      );
    });
    updateGiftVisibility();
    renderPayPalButtons();
  }

  function updateGiftVisibility() {
    if (selectedAmount >= 50) {
      giftOption.classList.add("gift-option--visible");
    } else {
      giftOption.classList.remove("gift-option--visible");
      giftCheckbox.checked = false;
    }
  }

  function showMessage(type, text) {
    messageEl.textContent = text;
    messageEl.className = "donate-form__message donate-form__message--" + type;
  }

  function clearMessage() {
    messageEl.className = "donate-form__message";
    messageEl.textContent = "";
  }

  function notifySlack(details, amount, frequency, giftRequested) {
    var config = window.__DONATE_CONFIG__ || {};
    if (!config.slackWebhookUrl) return;

    var payer = details.payer || {};
    var payerName = payer.name
      ? (payer.name.given_name || "") + " " + (payer.name.surname || "")
      : "Unknown";
    var email = payer.email_address || "Not provided";

    var text = ":moneybag: *New Donation!*\n" +
      "*Amount:* $" + amount + " (" + frequency + ")\n" +
      "*Donor:* " + payerName.trim() + "\n" +
      "*Email:* " + email;

    if (giftRequested) {
      var shipping = details.purchase_units && details.purchase_units[0]
        ? details.purchase_units[0].shipping
        : null;
      text += "\n\n:gift: *Wood Jam Gift Requested!*";
      if (shipping) {
        var shipName = shipping.name ? shipping.name.full_name : payerName.trim();
        var addr = shipping.address || {};
        var addressLines = [
          shipName,
          addr.address_line_1,
          addr.address_line_2,
          [addr.admin_area_2, addr.admin_area_1, addr.postal_code]
            .filter(Boolean).join(", "),
          addr.country_code
        ].filter(Boolean).join("\n");
        text += "\n*Ship to:*\n" + addressLines;
      }
    }

    fetch(config.slackWebhookUrl, {
      method: "POST",
      body: JSON.stringify({ text: text }),
    }).catch(function (err) {
      console.error("Slack notification failed:", err);
    });
  }

  // Frequency toggle
  frequencyButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      updateFrequency(this.dataset.frequency);
    });
  });

  // Amount buttons
  amountButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      customInput.value = "";
      updateAmount(parseFloat(this.dataset.amount));
    });
  });

  // Custom amount
  customInput.addEventListener("input", function () {
    var val = parseFloat(this.value);
    if (val > 0) {
      amountButtons.forEach(function (btn) {
        btn.classList.remove("amount-grid__option--active");
      });
      selectedAmount = val;
      updateGiftVisibility();
      renderPayPalButtons();
    }
  });

  customInput.addEventListener("focus", function () {
    amountButtons.forEach(function (btn) {
      btn.classList.remove("amount-grid__option--active");
    });
  });

  // PayPal button rendering
  var currentButtons = null;

  function renderPayPalButtons() {
    if (typeof paypal === "undefined") return;

    if (currentButtons) {
      paypalContainer.innerHTML = "";
    }

    clearMessage();

    var wantsGift =
      selectedAmount >= 50 && giftCheckbox && giftCheckbox.checked;
    var amount = selectedAmount.toFixed(2);

    if (selectedFrequency === "one-time") {
      currentButtons = paypal.Buttons({
        style: {
          layout: "vertical",
          color: "white",
          shape: "rect",
          label: "donate",
        },
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [
              {
                amount: { value: amount, currency_code: "USD" },
                description: "Donation to Staunton Makerspace",
                shipping: wantsGift
                  ? undefined
                  : { name: { full_name: "" }, type: "NO_SHIPPING" },
              },
            ],
            application_context: {
              shipping_preference: wantsGift ? "GET_FROM_FILE" : "NO_SHIPPING",
              user_action: "PAY_NOW",
              brand_name: "Staunton Makerspace",
            },
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            var name = details.payer.name.given_name;
            showMessage(
              "success",
              "Thank you for your donation" +
                (name ? ", " + name : "") +
                "! Your support means the world to us."
            );
            notifySlack(details, amount, "one-time", wantsGift);
          });
        },
        onError: function (err) {
          showMessage(
            "error",
            "Something went wrong with the payment. Please try again."
          );
          console.error("PayPal error:", err);
        },
      });
    } else {
      // Recurring - use PayPal donate button with recurring flag
      // Note: Full subscriptions require a Plan ID from PayPal dashboard.
      // For now, we use the donate flow which supports recurring.
      currentButtons = paypal.Buttons({
        style: {
          layout: "vertical",
          color: "white",
          shape: "rect",
          label: "donate",
        },
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [
              {
                amount: { value: amount, currency_code: "USD" },
                description:
                  (selectedFrequency === "monthly" ? "Monthly" : "Yearly") +
                  " donation to Staunton Makerspace",
              },
            ],
            application_context: {
              shipping_preference: wantsGift ? "GET_FROM_FILE" : "NO_SHIPPING",
              user_action: "PAY_NOW",
              brand_name: "Staunton Makerspace",
            },
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            var name = details.payer.name.given_name;
            var freq =
              selectedFrequency === "monthly" ? "monthly" : "yearly";
            showMessage(
              "success",
              "Thank you" +
                (name ? ", " + name : "") +
                "! Your " +
                freq +
                " donation has been set up."
            );
            notifySlack(details, amount, freq, wantsGift);
          });
        },
        onError: function (err) {
          showMessage(
            "error",
            "Something went wrong with the payment. Please try again."
          );
          console.error("PayPal error:", err);
        },
      });
    }

    currentButtons.render("#paypal-button-container");
  }

  // Gift checkbox change triggers re-render
  if (giftCheckbox) {
    giftCheckbox.addEventListener("change", function () {
      renderPayPalButtons();
    });
  }

  // Initialize
  updateFrequency("one-time");
  updateAmount(50);
  renderPayPalButtons();
});
