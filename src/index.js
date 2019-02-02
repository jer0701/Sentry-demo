import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from "redux";
import sentry from './sentry';

sentry.install();

const reducer = (state = "Hello world!", action) => {
    switch (action.type) {
      case "CRASH_IN_THE_REDUCER":
        throw new Error("Whoops, we crashed in the reducer!");
      case "UPDATE_MY_STRING":
        return action.str;
      default:
        return state;
    }
};
  
const store = createStore(
    reducer,
    applyMiddleware(sentry.middleware())
);
  
document.getElementById("crash").addEventListener("click", () => {
    throw new Error("Whoops! My application crashed!");
});
document.getElementById("crash-in-reducer").addEventListener("click", () => {
    store.dispatch({ type: "CRASH_IN_THE_REDUCER" });
});
document.getElementById("set-state").addEventListener("click", () => {
    store.dispatch({
      type: "UPDATE_MY_STRING",
      str: document.getElementById("state").value
    });
});
  
const Button = () => (
    <button
      onClick={() => {
        store.dispatch({ type: "CRASH_IN_THE_REDUCER" });
      }}
    >
      Click to crash
    </button>
);
  
render(<Button />, document.getElementById("app"));