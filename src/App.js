import './App.css';
import Nav from './navigation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './SignUp';
import PrivateComponents from './PrivateComponent';
import Login from './Login';
import MobileData from './MobileData';
import Details from './Details';
import AddToCart from './AddToCart';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponents />} >
          </Route>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<MobileData />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/cart" element={<AddToCart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App