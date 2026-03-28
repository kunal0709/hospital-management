import { createStore } from "redux";
import reducerfn from "./reducerFn";
const store=  createStore(reducerfn)
export default store;