import React, { useState } from 'react'

const RegisterPage = () => {
const path = "http://localhost:4000/register" ;
  const[username , setUsername]= useState('');
  const[password , setPassword]= useState('');

  async function Regsiter (e) {

 e.preventDefault();

  const response = await fetch(path , {
    method: 'POST' , 
    body:JSON.stringify({username , password}),
    headers:{'Content-Type' : 'application/json'},
    
  
   })
if(response.status === 200 ) {

  alert("resgister succeed ")
}
else {
  alert('regsitartion failed ')
}
  }

  return (

<form className='register' onSubmit={Regsiter}>
  <h1>Register</h1>
 <input type='text' placeholder='username' 
  value={username}
  onChange={e => setUsername (e.target.value)}
/>
<input type='password' placeholder='password' 
 value={password}
 onChange={e => setPassword(e.target.value)}
/>
<button>Register</button>


</form>
  )
}

export default RegisterPage