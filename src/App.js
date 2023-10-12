import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import { useEffect } from 'react';
import { auth } from './firebase';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useStateValue } from './StateProvider';
import Payment from './Payment';

const promise = loadStripe('pk_live_51MZApDD1ztTIXwaVtpZria8eaoHwC3Wbw6X4RgBYHS082w3Cn8XvfS8rJY0Hi5wL7YWbJUtfTkcIMHoKWxdGZ8eH00ycdI47FN');

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() =>{
     auth.onAuthStateChanged(authUser => {
      if(authUser){
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }else{
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }
     })
  })
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/checkout' element={
          <>
            <Header /><Checkout />
            </>} />
            <Route path='/payment' element={
          <>
            <Header />
            <Elements stripe={promise}>
            <Payment/>
            </Elements>
            </>} />
          <Route path='/' element={
          <>
            <Header /><Home />
            </>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
