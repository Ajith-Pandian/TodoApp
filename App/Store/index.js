import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, autoRehydrate } from "redux-persist";
import { AsyncStorage } from "react-native";
import thunk from "redux-thunk";
import logger from "redux-logger";
import getRootReducer from "./Reducers";
const middlewares = [];
middlewares.push(thunk);
//Configuring Redux Logger only for Development
if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}

const getStore = () =>
  createStore(
    getRootReducer(),
    {},
    compose(applyMiddleware(...middlewares), autoRehydrate(true))
  );

export default getStore;
