import {combineReducers} from 'redux'
import infoReducer from './info-reducer'
// ? Tạo các root reducer (chứa các gian hàng nhỏ hơn -> đại diện cho từng Component con của React)
const rootReducer = combineReducers({
  infoReducer
})

export default rootReducer