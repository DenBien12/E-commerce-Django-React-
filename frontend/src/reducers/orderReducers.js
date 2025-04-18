import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_RESET
} from '../constants/orderConstants';

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true };
        case ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order: action.payload }; // Ensure success and order are updated
        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_CREATE_RESET:
            return {}; // Reset the state when the order is created successfully
        default:
            return state;
    }
};