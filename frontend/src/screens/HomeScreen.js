import React, {useState, useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'



function HomeScreen() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get('/api/products/')
        setProducts(data)
      } catch (error) {
        setError(error.message)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div>
      <h1>Lastest Products</h1>
      <Row>
            {products.map(product =>(
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                </Col>
            ))}
      </Row>
    </div>
  )
}

export default HomeScreen
