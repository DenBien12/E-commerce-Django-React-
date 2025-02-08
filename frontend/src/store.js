import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk"; // Correct import
import { productListReducer, productDetailReducer } from '../src/reducers/productReducers'; // Correct import

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailReducer
});

const cartItemsFromStorage = localStorage.getItem("cartItem")
    ? JSON.parse(localStorage.getItem("cartItem"))
    : [];

export const initialState = {
    cart: { cartItems: cartItemsFromStorage },
};

const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store; // Correct export