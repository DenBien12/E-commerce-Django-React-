import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Table, Button, Tab } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listOrders} from '../actions/orderActions'
import { LinkContainer } from 'react-router-bootstrap'


function OrderListScreen() {

    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin



    useEffect(() => {
      if (!userInfo || !userInfo.isAdmin) {
        navigate('/login')
      }
        dispatch(listOrders())
    }, [dispatch, navigate, userInfo])


    

  return (
    <div>
        <h1>Orders</h1>
        {loading
        ? <Loader />
        : error
        ? (<Message variant='danger'>{error}</Message>)
        :(
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
              </tr>
            </thead>

            <tbody>
              {orders.map(order =>(
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createAt ? order.createAt.substring(0, 10) : ''}</td>
                  <td>${order.totalPrice}</td>
                  <td>{order.isPaid ?(
                        order.paidAt.substring(0, 10)
                        ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}</td>
                  
                  <td>{order.isDelivered ?(
                  order.deliveredAt.substring(0, 10)
                        ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}</td>
                  
                  <td>
                    <Link to={`/order/${order._id}`}>
                        <Button variant='light' className='btn-sm'>Detail</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
    </div>
  )
}

export default OrderListScreen
