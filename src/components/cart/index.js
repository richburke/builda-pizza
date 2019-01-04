import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeFromCart } from '../../common/store/cart/actions';
import { formatPrice, sumItemPrices } from '../../common/utils';

const EMPTY_CART_PROMPT = 'Your cart is currently empty.';

class Cart extends Component {
  renderItems(item, itemIndex) {
    const { removeFromCart } = this.props;

    const toppings = item.toppings
      .filter((topping) => topping.selected)
      .map((topping) => topping.name)
      .join(', ');

    return (
      <div key={`order-item${itemIndex}`}>
        <div className="order-item-descriptor">
          <div>
            <div
              className="remove-icon"
              onClick={() => removeFromCart(itemIndex)}
            >
              [X]
            </div>
            {`${item.name} pizza`}
          </div>

          <div>{formatPrice(item.price)}</div>
        </div>
        <div className="supplementary">
          {toppings}
        </div>
      </div>
    );
  }

  render() {
    const { items } = this.props;

    let cartContent;
    if (items.length === 0) {
      cartContent = <div>{EMPTY_CART_PROMPT}</div>;
    } else {
      cartContent = (
        <div className="cart-container">
          <div className="order-item-container">
            { items.map((item, index) => this.renderItems(item, index)) }
          </div>

          <div className="price-container">
            <div>Total</div>
            <div className="total-price">{formatPrice(sumItemPrices(items))}</div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h4 className="cart-label">Your Cart</h4>
        {cartContent}
      </div>
    );
  }
}

Cart.propTypes = {
  items: PropTypes.array,
  removeFromCart: PropTypes.func,
};

const mapStateToProps = (state) => ({
  items: state.selected,
});

const mapDispatchToProps = (dispatch) => ({
  removeFromCart: (itemIndex) => dispatch(removeFromCart(itemIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart); 
