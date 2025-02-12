import React, { use, useEffect } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { Message } from '../components/Message'
import { addToCart } from '../actions/cartActions'


export default function CartScreen() {
  const location = useLocation()
  const params = useParams()
  const productId = params.id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1; // Correctly parse qty as a number


  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  console.log('cartItem:', cartItems)

  useEffect(() => {
    if(productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])


  return (
    <div>
      Cart
    </div>
  )
}
