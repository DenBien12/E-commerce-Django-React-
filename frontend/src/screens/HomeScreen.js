import React, {useState, useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import  Loader from '../components/Loader'
import  Message from '../components/Message'
import { useNavigate, useLocation } from 'react-router-dom'

import {  useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'



function HomeScreen() {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {error, loading, products} = productList
  const navigate = useNavigate()
  const location = useLocation()

  let keyword = location.search 
  console.log(keyword)

  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch, keyword])

  return (
    <div>
      <h1>Lastest Products</h1>
      {loading ? <Loader/>
        : error ? <Message variant={'danger'}>{error}</Message> 
          :   
          <Row>
            {products.map(product =>(
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                </Col>
            ))}
          </Row>
      }
    </div>
  )
}

export default HomeScreen
