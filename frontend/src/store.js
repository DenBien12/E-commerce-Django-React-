import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk"; // Correct import
import { productListReducer, productDetailReducer } from '../src/reducers/productReducers'; // Correct import
import { cartReducer } from '../src/reducers/cartReducers'; // Correct import
import { orderCreateReducer, orderDetailsReducer } from './reducers/orderReducers';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from "./reducers/userReducers";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailReducer,
    cart: cartReducer,
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails : userDetailsReducer,  
    userUpdateProfile : userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderCreateReducer
});



const cartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {};

export const initialState = {
    cart: { cartItems: cartItemsFromStorage, 
        shippingAddress: shippingAddressFromStorage 
    },
    userLogin: { userInfo: userInfoFromStorage },
};

const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store; // Correct export