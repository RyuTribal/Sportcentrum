import {combineReducers } from "redux";
import { createWrapper } from "next-redux-wrapper";
import userReducers from "./reducers/user";
import { configureStore } from '@reduxjs/toolkit'

// initial states here
const initalState = { user: {} };

const reducer = combineReducers({
  userReducers,
});

// creating store
export const store = configureStore({
  initalState,
  reducer,
});

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
