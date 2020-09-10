import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdAddShoppingCart } from 'react-icons/md';
import api from '../../services/api';
import { formatPrice } from '../../util/format';

import * as CartActions from '../../store/modules/cart/actions';

import { ProductList } from './styles';

class Home extends Component {
  
  state= {
    products: [],
  }

  async componentDidMount(){
    const response = await api.get('/products');

    //adding formated price property to object
    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }))

    this.setState({ products: data });
  }

  handleAddToCart(id) {
    //const { dispatch } = this.props;
    //dispatch(CartActions.addToCart(product))

   const { addToCartRequest } = this.props;
   addToCartRequest(id);
  }

  render(){

    const { products } = this.state;
    const { totalItemsInCart } = this.props;

    return(
        <ProductList>
          {products && products.map(product => (
             <li key={product.id}>
             <img src={product.image} alt={product.title}/>
             <strong>{product.title}</strong>
             <span>{product.priceFormatted}</span>
             <button type=
             "button" 
             onClick={()=>this.handleAddToCart(product.id)}
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
}

const mapStateToProps = state => ({
  totalItemsInCart: state.cart.reduce((amount,product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {})
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators( CartActions ,dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);