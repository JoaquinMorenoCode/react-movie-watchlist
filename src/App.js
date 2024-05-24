import './App.css';
import MainNav from './common/MainNav'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Movies from './pages/Movies';
import Footer from './common/Footer';
import Watchlist from './pages/Watchlist';

function App() {
  return (

    <>
      <BrowserRouter>
        <MainNav />
        <main id='main-content'>
          <Routes>

            <Route path="/" element={<Main></Main>} />
            <Route path="/movies" element={<Movies/>}></Route>                      
              <Route path='/list' element={<Watchlist></Watchlist>}></Route>   
          </Routes>

      

        </main>
        <Footer></Footer>


      </BrowserRouter>

    </>


  );
}

export default App;
