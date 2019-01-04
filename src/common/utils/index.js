export const formatPrice = (price) => `$${price.toFixed(2)}`;

export const formatToppingPrice = (price) =>
  price > 1.00
    ? `$${price.toFixed(2)}`
    : `${price.toFixed(2)}¢`;

export const sumItemPrices = (items) =>
  items
    .reduce((acc, item) => acc + item.price, 0);

export const sumToppingsPrices = (toppings) =>
  toppings
    .filter((topping) => topping.selected)
    .reduce((acc, topping) => acc + topping.price, 0);

export const determineLimitMessage = (numberOfSelectedToppings, maxNumberOfToppings) => {
  if (maxNumberOfToppings === null) {
    return 'Large pie?  You can add as many toppings as you want.';
  }

  const toppingsRemaining = maxNumberOfToppings - numberOfSelectedToppings;
  if (toppingsRemaining === 0) {
    return 'That\'s it for toppings for this pizza.  Add it to the cart below.';
  }
  if (toppingsRemaining === 1) {
    return 'This pizza will hold 1 more topping.';
  }
  return `You have ${toppingsRemaining} more toppings you can add.`;
};
