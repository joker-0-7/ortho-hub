const paypal = require("@paypal/checkout-server-sdk");

class PayPalClient extends paypal.core.PayPalHttpClient {
  async execute(request) {
    // Set timeout to 10 seconds (10000 milliseconds)
    const options = {
      timeout: 10000,
    };

    return super.execute(request, options);
  }
}

// let environment = new paypal.core.SandboxEnvironment(
//   process.env.PAYPAL_CLIENT_ID,
//   process.env.PAYPAL_CLIENT_SECRET
// );

let environment = new paypal.core.LiveEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET
);

let client = new PayPalClient(environment);

module.exports = { client };
