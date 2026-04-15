import { createStore } from "redux";
// import reducerfn from " ./red./reducerFn";
import reducerfn from "../Redux/reducerfn"
const store=  createStore(reducerfn)
export default store;