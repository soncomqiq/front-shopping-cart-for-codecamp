import React, { Component } from 'react'
import { Row, Col } from 'antd'
import Product from './Product'

export default class Products extends Component {
  renderProducts() {
    return this.props.products.map(product =>
      <Col span={8}>
        <Product productDetail={product}
          handleClickAddToCart={this.props.handleClickAddToCart}
        />
      </Col>
    )
  }

  render() {
    return (
      <Row>
        {this.renderProducts()}
      </Row>
    )
  }
}
