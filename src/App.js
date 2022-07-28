import { Route, Routes } from 'react-router';
import './App.css';
import Header from './components/header/Header';
import CartPage from './Container/cartPage/CartPage';
import DetailPage from './Container/detailsPage/DetailPage';
import StarterPage from './Container/starterPage/StarterPage';
import SearchPage from './Container/searchPage/SearchPage';
import Home from './Container/homePage/Home';
import Favourite from './Container/favouritePage/Favourite';
import FavMealsDetails from './components/favMealsDetails/FavMealsDetails';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function App() {
  const [tab, setTab] = useState("")
  // const { user } = useSelector(state => state.users)

  return (
    <div className="app">
          <Header tab={tab}/>
      <Routes>
       <Route path="/" element={<StarterPage setTab={setTab}/>}/>
       <Route path="/search" element={<SearchPage setTab={setTab}/>}/>
       <Route path="/details" element={<DetailPage setTab={setTab} tab={tab}/>}/>
       <Route path="/saved" element={<FavMealsDetails setTab={setTab}/>}/>
       <Route path="/home" element={<Home setTab={setTab} tab={tab}/>}/>
       <Route path="/cart" element={<CartPage setTab={setTab}/>}/>
       <Route path="/favourites" element={<Favourite setTab={setTab}/>}/>
      </Routes>
    </div>
  );
}

export default App;
