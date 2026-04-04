require('dotenv').config();

module.exports = function() {
  return {
    clientId: process.env.PAYPAL_CLIENT_ID || '',
    slackWebhookUrl: process.env.SLACK_WEBHOOK_URL || ''
  };
};
