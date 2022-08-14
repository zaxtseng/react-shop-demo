import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import authReducer, { AuthState } from "./auth.reducer";
import categoryReducer, { CategoryState } from "./category.reducer";
import productReducer, { ProductState } from "./product.reducer";

export interface IAppState {
    router: RouterState
    auth: AuthState
    category: CategoryState
    product: ProductState
}
const createRootReducer = (history: History) => combineReducers({
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    router: connectRouter(history)
})

export default createRootReducer