import React,{useState,useEffect} from 'react';
import './App.css';
import Form from './components/common/Form'
import Home from './components/Home'
import {Routes,Route,useNavigate} from "react-router-dom"
import { app } from './firebase-config';
import { getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword } from 'firebase/auth'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();
  const handleAction = (id) => {
    const authentication = getAuth();

    if(id === 2){
      createUserWithEmailAndPassword(authentication,email,password)
      .then((response)=>{
        navigate('/home')
        sessionStorage.setItem('Auth Token',response._tokenResponse.refreshToken)
      })
      .catch((error)=>{
        if(error.code === 'auth/email-already-in-use'){
          toast.error('Email Already in Use')
        }
      })
    }
    if(id === 1){
      signInWithEmailAndPassword(authentication,email,password)
      .then((response) => {
        navigate('/home')
        sessionStorage.setItem('Auth Token',response._tokenResponse.refreshToken)
      })
      .catch((error)=>{
        if(error.code === 'auth/wrong-password'){
          toast.error('Please check the Password')
        }
        if(error.code === 'auth/user-not-found'){
          toast.error('Please check the Email');
        }
      })
    }
  }
  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')

    if(authToken){
      navigate('/home')
    }
  }, []);



  return(
    <div className='App'>
      <>
        <Routes>
          <Route
          path='/login'
          element={
            <Form
            title="login"
            setEmail={setEmail}
            setPassword={setPassword}
            handleAction={()=>handleAction(1)}
            />}
            />
          <Route
          path="/register"
          element={
            <Form
            title="Register"
            setEmail={setEmail}
            setPassword={setPassword}
            handleAction={()=>handleAction(2)}/>
          }/>
          <Route
          path='/home'
          element={
            <Home/>
          }/>
        </Routes>
        <ToastContainer/>
      </>
    </div>
  )
};

export default App;
