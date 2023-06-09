import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware, combineReducers } from 'redux';
import LoginSlice from './slices/Login';
import ProfileSlice from './slices/Profile';
import thunk from 'redux-thunk';
const reducer = combineReducers({
    LoginSlice,
    ProfileSlice,
});

const store = configureStore({ reducer }, applyMiddleware(thunk));

export default store;
