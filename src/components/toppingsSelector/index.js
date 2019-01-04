import React from 'react';
import { formatToppingPrice, determineLimitMessage } from '../../common/utils';

const LIMIT_ALERT = 'You\'ve added all the toppings you can add to this pie size.';

const ToppingsSelector = ({ toppings, maxNumberOfToppings, onChange }) => {
  const numberOfSelectedToppings = toppings.filter((topping) => topping.selected).length;
  const toppingsLimitMessage = determineLimitMessage(numberOfSelectedToppings, maxNumberOfToppings);
  const handleToppingClick = (event) => {
    if (maxNumberOfToppings !== null
      && event.target.checked
      && numberOfSelectedToppings === maxNumberOfToppings) {
        alert(LIMIT_ALERT);
        return;
    }
    onChange(event);
  };

  const toppingsList = toppings.map((topping, index) => {
    return (
      <div className="topping-item" key={`topping${index}`}>
        <div>
          <input
            type="checkbox"
            value={topping.name}
            checked={topping.selected}
            onChange={handleToppingClick}
          />
          {topping.name}
        </div>
        <div>{formatToppingPrice(topping.price)}</div>
      </div>
    );
  });

  return (
    <div className="toppings-container">
      {toppingsList}
      <p className="supplementary">
        {toppingsLimitMessage}
      </p>
    </div>
  )
};

export default ToppingsSelector;
