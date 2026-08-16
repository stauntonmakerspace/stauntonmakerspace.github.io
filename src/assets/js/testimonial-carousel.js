let testimonials = document.querySelectorAll(".c-left-right-block--testimonial")

const rotationIntervalMs = 6000
const fadeDurationMs = 400

testimonials.forEach(testimonial => {
    let rotator = testimonial.querySelector(".c-left-right-block--testimonial__rotator")
    if (!rotator) return

    let quotes = Array.from(rotator.querySelectorAll(".c-left-right-block--testimonial__rotator__quote"))
        .map(el => ({ quote: el.dataset.quote, author: el.dataset.author }))

    let heading = testimonial.querySelector(".c-heading__primary_heading")
    let author = testimonial.querySelector(".c-text-block")

    if (!heading || !author || quotes.length < 2) return

    let index = 0

    setInterval(() => {
        index = (index + 1) % quotes.length
        testimonial.classList.add("c-left-right-block--testimonial--fading")

        setTimeout(() => {
            heading.textContent = `“${quotes[index].quote}”`
            author.textContent = quotes[index].author
            testimonial.classList.remove("c-left-right-block--testimonial--fading")
        }, fadeDurationMs)
    }, rotationIntervalMs)
})