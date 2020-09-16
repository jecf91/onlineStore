import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import api from '../../services/api';
import { formatPrice } from '../../util/format';

import * as CartActions from '../../store/modules/cart/actions';

import { ProductList } from './styles';

export default function Home () {
  
  const [products, setProducts] = useState([]);
 
  const totalItemsInCart = useSelector(state => state.cart.reduce((totalItemsInCart, product) => {
    totalItemsInCart[product.id] = product.amount;
    return totalItemsInCart;
  },{}))

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('/products');

      const data = response.data.map(product => ({
        ...product,
        pricedFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }
    loadProducts();
  }, [])

  function handleAddToCart(id) { 
   dispatch(CartActions.addToCartRequest(id));
  }

  return(
      <ProductList>
        {products && products.map(product => (
            <li key={product.id}>
            <img src={product.image} alt={product.title}/>
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>
            <button type=
            "button" 
            onClick={()=>handleAddToCart(product.id)}
            >
              <div>
                <MdAddShoppingCart size={16} color="#fff"/> {' '}
                {totalItemsInCart[product.id] || 0 }
              </div>
              <span>Add to cart</span>
            </button>
          </li>
        ))}
      </ProductList>
  );
}