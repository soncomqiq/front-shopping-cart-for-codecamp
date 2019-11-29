import React, { Component } from 'react'
import Categories from './Categories'
import Products from './Products'
import Cart from './Cart'
import { Row, Col } from 'antd'
import { uniqueId } from 'lodash'
import Axios from 'axios'

export class ShoppingCart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categoriesList: [],
      productsList: [],
      cart: [],
      selectedCategoriesId: null,
    }

    this.handleCategoriesId = this.handleCategoriesId.bind(this)
    this.handleClickAddToCart = this.handleClickAddToCart.bind(this)
    this.handleClickDeleteProductInCart = this.handleClickDeleteProductInCart.bind(this)
    this.handleDeleteAllProductInCart = this.handleDeleteAllProductInCart.bind(this)
  }

  async componentDidMount() {
    const result1 = await Axios.get('http://localhost:3030/product-category')
    const result2 = await Axios.get('http://localhost:3030/product')
    this.setState({
      productsList: result2.data,
      categoriesList: result1.data,
      selectedCategoriesId: result1.data[0].id
    })
  }

  filterProducts() {
    const id = this.state.selectedCategoriesId;
    if (id == null) {
      return []
    } else {
      return this.state.productsList.filter(product => product.ProductCategoryId == id)
    }
  }

  handleCategoriesId(id) {
    this.setState({
      selectedCategoriesId: id
    })
  }

  handleClickAddToCart(product) {
    if (this.state.cart.find(cartItem => cartItem.product.id === product.id)) {
      this.setState({
        cart: this.state.cart.map(cartItem =>
          cartItem.product.id === product.id ?
            { ...cartItem, amount: cartItem.amount + 1 } : cartItem)
      })
    } else {
      this.setState({
        cart: [...this.state.cart, { uid: uniqueId(), product, amount: 1 }]
      })
    }
  }

  handleClickDeleteProductInCart(uid) {
    this.setState({
      cart: this.state.cart.filter(cartItem => cartItem.uid !== uid)
    })
  }

  handleDeleteAllProductInCart() {
    this.setState({
      cart: []
    })
  }

  render() {
    return (
      <Row type='flex' justify="center">
        <Col span={3}>
          <Categories categories={this.state.categoriesList}
            handleCategoriesIdFunc={this.handleCategoriesId}
            selectedId={this.state.selectedCategoriesId} />
        </Col>
        <Col span={13}>
          <Products products={this.filterProducts()}
            handleClickAddToCart={this.handleClickAddToCart}
          />
        </Col>
        <Col span={6}>
          <Cart cart={this.state.cart}
            handleClickDeleteProductInCart={this.handleClickDeleteProductInCart}
            handleDeleteAllProductInCart={this.handleDeleteAllProductInCart}
          />
        </Col>
      </Row>
    )
  }
}

export default ShoppingCart
