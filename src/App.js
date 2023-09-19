import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import MovieHome from "./components/home";
import MovieRouting from "./components/home/movie-routing";
import ActorRouting from "./routing/actor-routing";
import MultiSearchRouting from "./routing/search-routing";
import TvRouting from "./routing/TvRouting";
import {combineReducers} from "redux";
import filtersReducer from "./reducers/filters-reducer";
import ratingsReducer from "./reducers/ratings-filter-reducer";
import releaseYearsReducer from "./reducers/filter-release-years-reducer";
import audienceScoreReducer from "./reducers/filter-score-reducer";
import searchResultsReducer from "./reducers/search-results-reducer";
import usersReducer from "./reducers/users-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import multiSearchReducer from "./reducers/multi-search-reducer";
import Login from "./components/login";
import CreateAccount from "./components/login/create-account";
import ProfileScreen from "./components/profile/profile-screen";
import MovieReviewItem from "./components/reviews/movie-review";
import review from "./components/reviews/review.json"

const rootReducer = combineReducers({
        filters: combineReducers({
            genre: filtersReducer,
            ratings: ratingsReducer,
            years: releaseYearsReducer,
            score: audienceScoreReducer
        }),
        searchResults: searchResultsReducer,
        multiSearch: multiSearchReducer,
        user: usersReducer
    }
);
const store = configureStore({reducer: rootReducer})
function App() {
  return (
      <BrowserRouter>
          <Provider store={store}>
            <Routes>
                <Route path="login" element={<Login/>}/>
                <Route path="create_account" element={<CreateAccount/>}/>
                <Route path = "search/*" element = {<MultiSearchRouting/>}/>
                <Route index element={<MovieHome/>}/>
                <Route path = "movies/*" element = {<MovieRouting/>}/>
                <Route path = "actors/*" element = {<ActorRouting/>}/>
                <Route path = "tv/*" element = {<TvRouting/>}/>
                <Route path = "profile" element = {<ProfileScreen/>}/>
                <Route path = "test/review" element = {<MovieReviewItem review = {review}/>}/>
            </Routes>
          </Provider>
      </BrowserRouter>
  );
}export default App;