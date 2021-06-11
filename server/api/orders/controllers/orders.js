'use strict';
const stripe = require('stripe')('sk_test_51IaG2bAcL9YG2kg7z4786nkt21fueJD2Jqtl8hLQ3ytxpCudJgzHYqpx5kzxpXSJBBkn2bsmK8h93xvwx6T7n1bg00duouvLu4');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    const {
      address,
      amount,
      brews,
      postalCode,
      token,
      city
    } = ctx.request.body;

    // Send charge to Stripe
    const charge = await stripe.charges.create({
      amount: amount * 100,
      currency: "usd",
      description: `Order ${new Date(Date.now())} - User ${ctx.state.user._id}`,
      source: token
    });

    // Create order in database
    const order = await strapi.services.orders.create({
      user: ctx.state.user._id,
      address,
      amount,
      brews,
      postalCode,
      city
    });

    return order;
  },
};
