import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import NavigationSidebar from "./components/navigation";
import Home from "./components/home/index.html";
import MoviePage from "./components/movie_page";
import movie_data from "./components/movie_page/movie.json"


function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route index element={<Home/>}/>
            <Route path="search" element={<NavigationSidebar/>}/>
            <Route path = "movie" element = {<MoviePage movie = {movie_data}/>}/>

        </Routes>



      </BrowserRouter>


  );
}

export default App;
