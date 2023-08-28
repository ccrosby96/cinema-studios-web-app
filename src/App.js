import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import NavigationSidebar from "./components/navigation";
import MovieHome from "./components/home/index.html";
import MoviePage from "./components/movie_page";
import movie_data from "./components/movie_page/movie.json"
import ActorPage from "./components/actor_page";
import MovieRouting from "./components/home/movie-routing";
import ActorRouting from "./routing/actor-routing";


function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route index element={<MovieHome/>}/>
            <Route path = "movies/*" element = {<MovieRouting/>}/>
            <Route path = "actors/*" element = {<ActorRouting/>}/>

        </Routes>

      </BrowserRouter>


  );
}

export default App;
