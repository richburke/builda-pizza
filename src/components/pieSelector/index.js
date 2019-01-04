import React from 'react';
import PropTypes from 'prop-types';
import ToppingsSelector from '../toppingsSelector';
import { formatPrice, sumToppingsPrices } from '../../common/utils';

const BUILD_PROMPT_EMPTY = 'Pick a pie and then add some toppings.';
const BUILD_PROMPT_MORE = 'Still hungry? Add another pizza to your cart.';

const PieSelector = ({
  options,
  selectedOption,
  cartCount,
  onChangeSize,
  onChangeTopping,
  onSubmit }) => {
  const selectedName = (selectedOption && selectedOption.name) || '';
  const selectableOptions = [<option key='size-empty'></option>]
    .concat(options.map(({ name }, index) => (
      <option value={name} key={`size${index}`}>
        {`${name} pie`}
      </option>
    )));

  let pizzaSelection;
  if (selectedOption) {
    const { name, basePrice, toppings, maxToppings } = selectedOption;

    pizzaSelection = (
      <div>
        <p>OK, that's a {name} pie.  They start at {formatPrice(basePrice)}. We've pre-selected some toppings for you.</p>

        <form onSubmit={onSubmit}>
          <ToppingsSelector
            toppings={toppings}
            maxNumberOfToppings={maxToppings}
            onChange={onChangeTopping}
          />

          <div className="price-container">
            <div>Total for this pizza</div>
            <div className="total-price">{formatPrice(selectedOption.basePrice + sumToppingsPrices(toppings))}</div>
          </div>

          <div className="submit-container">
            <input type="submit" value="Add to Your Cart" />
          </div>
        </form>
      </div>
    );
  } else {
    pizzaSelection = (
      <div className="selection-prompt">
        {cartCount > 0
      ? <div>{BUILD_PROMPT_MORE}</div>
      : <div>{BUILD_PROMPT_EMPTY}</div>}
      </div>
    );
  }

  return (
    <div>
      <h4 className="menu-items-label">Menu Items</h4>
      <div className="menu-container">
        <select
          className="pie-size"
          onChange={onChangeSize}
          size={selectableOptions.length - 1}
          value={selectedName}
        >
          {selectableOptions}
        </select>
      </div>

      <div className="selection-container">
        {pizzaSelection}
      </div>
    </div>
  );
};

PieSelector.propTypes = {
  options: PropTypes.array,
  selectedOption: PropTypes.object,
  cartCount: PropTypes.number,
  onChangeSize: PropTypes.func,
  onChangeTopping: PropTypes.func,
  onSubmit: PropTypes.func,
};
PieSelector.defaultProps = {
  options: [],
  selectedOption: null,
  cartCount: 0,
  onChangeSize: () => {},
  onChangeTopping: () => {},
  onSubmit: () => {},
};

export default PieSelector;
