import { routerMiddleware } from "connected-react-router";
import { createHashHistory } from "history";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import createRootReducer from "./reducer";
import rootSaga from "./saga";
import { composeWithDevTools } from "redux-devtools-extension"

export const history = createHashHistory()

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    createRootReducer(history),
    // 状态链接到浏览器调试工具
    composeWithDevTools(
        // routerMiddleware监听路由状态，路由状态更改时dispatch action
        applyMiddleware(routerMiddleware(history), sagaMiddleware)
    )
)
sagaMiddleware.run(rootSaga)
export default store