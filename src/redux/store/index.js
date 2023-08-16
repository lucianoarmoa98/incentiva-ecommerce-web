import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reducerGlobal from "../../redux/reducers/reducer";


const reducer = combineReducers({
    reducerGlobal
});


const store = configureStore({
    reducer
});

export default store;