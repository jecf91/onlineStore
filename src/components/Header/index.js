import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdShoppingCart } from 'react-icons/md';

import { Container, Cart } from './styles';

import logo from '../../assets/logo.SVG'

const Header = ({cartSize}) => {

  return(
    <Container>
      <Link to="/">
        <img src={logo} alt="Rocketshoes" />
      </Link>
      <Cart to="/cart">
        <div>
          <strong>My Cart</strong>
          <span>{cartSize} items</span>
        </div>
        <MdShoppingCart color="#FFF" size={36} />
      </Cart>
    </Container>
  );
}

const mapStateToProps = state => ({
  cartSize: state.cart.length,
})

export default connect(mapStateToProps)(Header);