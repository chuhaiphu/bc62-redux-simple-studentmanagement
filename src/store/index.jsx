import { createStore } from'redux'
// ! thêm root reducer vào store (tạo ra các gian hàng nhỏ hơn bên trong kho hàng tổng)
import rootReducer from './root-reducer'

// ? Tạo store(kho hàng tổng) để chứa dữ liệu chung
const mainStore = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export default mainStore