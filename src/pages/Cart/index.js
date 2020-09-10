import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { MdAddCircle, MdRemoveCircle, MdDelete } from 'react-icons/md';

import * as CartActions from '../../store/modules/cart/actions';
import { formatPrice } from '../../util/format'

import { Container, ProductTable, Total } from './styles';

function Cart({cart, total, removeFromCart, updateAmountRequest}) {

  function increment (product) {
    updateAmountRequest( product.id, product.amount + 1 );
  }

  function decrement (product) {
    updateAmountRequest( product.id, product.amount - 1 );
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th/>
            <th>Product</th>
            <th>QTY</th>
            <th>Subtotal</th>
            <th/>
          </tr>
        </thead>
        <tbody>
          {cart && cart.map(product => (
            <tr key={product.id}>
              <td>
                <img src={product.image} alt={product.title}/>
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.formattedPrice}</span>
              </td>
              <td>
                <div>
                  <button type="buttton" onClick={() => decrement(product)}>
                    <MdRemoveCircle color="#7159c1" size={20}/>
                  </button>
                  <input type="number" readOnly value={product.amount}/>
                  <button type="buttton" onClick={() => increment(product)}>
                    <MdAddCircle color="#7159c1" size={20}/>
                  </button>
                </div>
              </td>
              <td><strong>{product.subtotal}</strong></td>
              <td>
                <button 
                  type="button" 
                  onClick={() => removeFromCart(product.id)}
                  >
                  <MdDelete color="#7159c1" size={20}/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>
      <footer>
        <button>Finish Order</button>
        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}

const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.amount * product.price)
  })),
  total: formatPrice(state.cart.reduce((total, product) => {
    return total += (product.amount * product.price);
  },0))
})

const mapDispatchToProps = dispatch  => {
  return bindActionCreators(CartActions,dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);