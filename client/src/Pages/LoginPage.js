import React, { useState } from 'react'
import {Navigate} from 'react-router-dom'

const LoginPage = () => {
  const path = "http://localhost:4000/login" ;

  const [username ,setUsername]= useState('');
  const[password ,setPassowrd]= useState('');
  const [redirect , setRedirect]=useState(false);

  async function  login (e) {
    e.preventDefault();
const response = await fetch(path , {

  method:'POST',
  body:JSON.stringify({username , password}),
  headers:{'Content-Type':'application/json'},
  credentials:'include',
});
 if (response.ok){
  setRedirect(true);
 }
 else {
  alert('wrong credential !')
 }

  }

  if(redirect) {

    return <Navigate to = {'/'}/>
  }

  return (


<form className='login' onSubmit={login}>
<h1>Login</h1>

<input type='text' placeholder='username' 
value={username}
onChange={e => setUsername(e.target.value)}
/>
<input type='password' placeholder='password' 
value={password}
onChange={e => setPassowrd(e.target.value)}
/>
<button>Login</button>


</form>    )
}

export default LoginPage