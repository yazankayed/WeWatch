import './App.scss';
import 'swiper/css';
import './App.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Detail from './pages/detail/Detail';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import FavoriteView from './components/favorite/FavoriteView';
import UserDetail from './components/Details/Details';
import Chat from './components/chat/Chat';
import Edit from './components/edit/Edit';
import Form from './components/chat/Form';
import { useState } from 'react';

function App() {
  const [name, setName] = useState("");
  const handelName = (name) => {
    setName(name);
  }
  return (
    <BrowserRouter>
      <Header />
      <Routes>
      <Route path='/chat' element={<div>{
        name?
        <Chat name={ name }/>:
        <Form handelName={ handelName }/>
      }</div>}/>
      <Route path='/register' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Home />} />
      <Route path='/:category' element={<Catalog />} />
      <Route path='/:category/:id' element={<Detail />} />
      <Route path='/:category/search/:keyword' element={<Catalog />} />
      <Route path='/favorites' element={<FavoriteView />} />
      <Route element={<UserDetail/>} path="/user/:id" />
      <Route element={<Edit/>} path="/user/:id/edit"/>
      
    </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
