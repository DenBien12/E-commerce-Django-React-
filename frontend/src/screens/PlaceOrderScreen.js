import React, {useMemo, useEffect} from 'react'
import { Row,Col,ListGroup,Card, Button, ListGroupItem} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import CheckoutSteps  from '../components/CheckoutSteps'
import { Image } from 'react-bootstrap'

function PlaceOrderScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart)
    const prices = useMemo(() => {
        const itemsPrice = cart.cartItems.reduce(
            (acc, item) => acc + item.price * item.qty, 
            0
        ).toFixed(2)
        
        const shippingPrice = (Number(itemsPrice) > 100 ? 0 : 10).toFixed(2)
        const taxPrice = ((0.082) * Number(itemsPrice)).toFixed(2)
        const totalPrice = (
            Number(itemsPrice) + 
            Number(shippingPrice) + 
            Number(taxPrice)
        ).toFixed(2)

        return {
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        }
    }, [cart.cartItems])

    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [cart.paymentMethod, navigate]);
    const placeOrder = () => {
        console.log("Place Order")
    }
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4/>
      <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Shipping</h2>

                    <p>
                        <strong>Shipping: </strong>
                        {cart.shippingAddress.address}, {cart.shippingAddress.city}
                        {' '}
                        {cart.shippingAddress.postalCode},
                        {' '}
                        {cart.shippingAddress.country}
                    </p>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Payment Method</h2>

                    <p>
                        <strong>Method: </strong>
                        {cart.paymentMethod}
                    </p>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Order Items</h2>

                        {cart.cartItems.lenght === 0 ? <Message variant='info'>
                            Your cart is empty!
                        </Message> :(
                            <ListGroup variant='flush'>
                                {cart.cartItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt = {item.name} fluid rounded/>
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>
                                        </Row>
                                            <Col md={4}>
                                                {item.qty} x ${item.price} =${(item.qty * item.price).toFixed(2)}
                                            </Col>
                                        
                            </ListGroup.Item>         
                        ))}
                            </ListGroup>
                        )
                        }
                
                </ListGroup.Item>

            </ListGroup>
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Item:</Col>
                            <Col>${prices.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping:</Col>
                            <Col>${prices.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Tax: </Col>
                            <Col>${prices.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Total:</Col>
                            <Col>${prices.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                    <div>
                        <Button 
                            type="button"
                            className='btn-block w-100'
                            disabled={cart.cartItems ===0}
                            onClick={placeOrder}
                        > 
                        Place Order
                        </Button>
                    </div>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
        </Row>
    </div>
  )
}

export default PlaceOrderScreen
