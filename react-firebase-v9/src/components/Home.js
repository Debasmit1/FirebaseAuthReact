import React,{ useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const handleLogout = () => {
    sessionStorage.remove('Auth Token');
    navigate('/login')
  }

  let navigate = useNavigate();
  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')
    console.log(authToken)

    if(authToken){
      navigate('/home')
    }
    if(!authToken){
      navigate('/register')
    }

  }, []);

  return (<div>
      Home Page

      <button onClick={handleLogout}>Log Out</button>
  </div>)
}

export default Home;
