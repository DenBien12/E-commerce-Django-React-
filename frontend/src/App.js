import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen' 
import CartScreen from './screens/CartScreen' 
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from '../src/screens/ProfileScreen'
import ShippingScreen from '../src/screens/ShippingScreen'
import PaymentScreen from '../src/screens/PaymentScreen'
import PlaceOrderScreen from '../src/screens/PlaceOrderScreen'
import OrderScreen from '../src/screens/OrderScreen'
import UserListScreen  from '../src/screens/UserListScreen'
import UserEditScreen from '../src/screens/UserEditScreen'
import ProductListScreen from '../src/screens/ProductListScreen'
import ProductEditScreen from '../src/screens/ProductEditScreen'
import OrderListScreen from '../src/screens/OrderListScreen'



function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/login' element={<LoginScreen />} exact />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/register' element={<RegisterScreen />} exact />
            <Route path='/profile' element={<ProfileScreen />} exact />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/cart/:id?' element={<CartScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/order/:id' element={<OrderScreen />} />
            <Route path='/admin/productlist' element={<ProductListScreen />} />
            <Route path='/admin/userlist' element={<UserListScreen />} />
            <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
            <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
            <Route path='/admin/orderlist' element={<OrderListScreen />} />
            {/* Add more routes as needed */}
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;