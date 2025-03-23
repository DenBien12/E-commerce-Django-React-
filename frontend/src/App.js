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
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;