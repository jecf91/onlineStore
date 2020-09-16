import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdAddCircle, MdRemoveCircle, MdDelete } from 'react-icons/md';

import * as CartActions from '../../store/modules/cart/actions';
import { formatPrice } from '../../util/format'

import { Container, ProductTable, Total } from './styles';

export default function Cart() {

  const cart = useSelector(state => state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.amount * product.price)
  })))

  const total = useSelector(state => formatPrice(state.cart.reduce((total, product) => {
    return total += (product.amount * product.price);
  },0)))

  const dispatch = useDispatch();

  function increment (product) {
    dispatch(CartActions.updateAmountRequest( product.id, product.amount + 1 ));
  }

  function decrement (product) {
    dispatch(CartActions.updateAmountRequest( product.id, product.amount - 1 ));
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
                  onClick={() => dispatch(CartActions.removeFromCart(product.id))}
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