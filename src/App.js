import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import MovieHome from "./components/home";
import MovieRouting from "./components/home/movie-routing";
import ActorRouting from "./routing/actor-routing";
import {combineReducers} from "redux";
import filtersReducer from "./reducers/filters-reducer";
import ratingsReducer from "./reducers/ratings-filter-reducer";
import releaseYearsReducer from "./reducers/filter-release-years-reducer";
import audienceScoreReducer from "./reducers/filter-score-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";

const rootReducer = combineReducers({
    genreFilters: filtersReducer,
    ratingsFilters: ratingsReducer,
    yearFilters: releaseYearsReducer,
    scoreFilter: audienceScoreReducer
});
const store = configureStore({reducer: rootReducer})
function App() {
  return (
      <BrowserRouter>
          <Provider store={store}>
            <Routes>
                <Route index element={<MovieHome/>}/>
                <Route path = "movies/*" element = {<MovieRouting/>}/>
                <Route path = "actors/*" element = {<ActorRouting/>}/>
            </Routes>
          </Provider>
      </BrowserRouter>
  );
}export default App;