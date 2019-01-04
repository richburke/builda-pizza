import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import {
  selectOption,
  clearSelectedOption,
  updateTopping,
  addToCart
} from '../../common/store/cart/actions';
import PieSelector from '../pieSelector';
import GET_PIZZA_OPTIONS from '../../common/queries/pizzaOptions';
import { sumToppingsPrices } from '../../common/utils';

class PizzaBuilder extends Component {
  handleChangeSize = (event, options) => {
    const { selectOption } = this.props;

    const selected = JSON.parse(JSON.stringify(
      options.find((option) => option.name === event.target.value)
    )); // Deep copy so we don't update the toppings objects.
    selectOption(selected);
    event.preventDefault();
  }

  handleChangeTopping = (event) => {
    const { updateTopping } = this.props;
    updateTopping(event.target.value);
  }

  handleSubmit = (event) => {
    const { selectedOption, addToCart, clearSelectedOption } = this.props;

    selectedOption.price = selectedOption.basePrice + sumToppingsPrices(selectedOption.toppings);
    addToCart(selectedOption);
    clearSelectedOption();
    event.preventDefault();
  }

  renderSelector(options) {
    const { selectedOption, cartItems } = this.props;

    return (
      <PieSelector
        options={options}
        selectedOption={selectedOption}
        cartCount={cartItems.length}
        onChangeSize={(event) => this.handleChangeSize(event, options)}
        onChangeTopping={this.handleChangeTopping}
        onSubmit={this.handleSubmit}
      />
    );
  }

  render() {
    return (
      <Query
        query={GET_PIZZA_OPTIONS}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          const options = data.pizzaSizes.map(({
            name,
            basePrice,
            maxToppings,
            toppings,
          }) => {
            return {
              name,
              basePrice,
              maxToppings,
              toppings: toppings.map(({ defaultSelected, topping }) => ({
                name: topping.name,
                price: topping.price,
                selected: defaultSelected
              }))
            };
          });
          return this.renderSelector(options);
        }}
      </Query>
    );
  }
}

PizzaBuilder.propTypes = {
  selectedOption: PropTypes.object,
  cartItems: PropTypes.array,
  selectOption: PropTypes.func,
  clearSelectedOption: PropTypes.func,
  updateTopping: PropTypes.func,
  addToCart: PropTypes.func,
};

const mapStateToProps = (state) => ({
  selectedOption: state.selectedOption,
  cartItems: state.selected,
});

const mapDispatchToProps = (dispatch) => ({
  selectOption: (option) => dispatch(selectOption(option)),
  clearSelectedOption: () => dispatch(clearSelectedOption()),
  updateTopping: (toppingName) => dispatch(updateTopping(toppingName)),
  addToCart: (pizza) => dispatch(addToCart(pizza)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PizzaBuilder); 
