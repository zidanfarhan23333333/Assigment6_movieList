import { createStore } from "redux";
import MovieReducer from "./reducers/MovieReducer.js";

const store = createStore(MovieReducer);

export default store;
