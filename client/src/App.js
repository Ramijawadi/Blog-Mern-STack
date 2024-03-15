import { Routes , Route } from 'react-router-dom';
import './App.css';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import Layout from './components/Layout';
import Posts from './Pages/Posts';

function App() {
  return (
<Routes>
<Route path='/' element={<Layout />}>
  <Route  index element={<Posts/>}  />
    <Route path='/login'  element={<LoginPage/>} />
   <Route path='/register'  element={<RegisterPage/>} />
   </Route>


 
</Routes>

  );
}

export default App;
