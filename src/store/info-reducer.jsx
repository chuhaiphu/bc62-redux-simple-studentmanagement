const initialState = {
  listInfo: JSON.parse(localStorage.getItem('listInfo')) || [],
  selectedInfo: null,
  keyword: '',
}

const infoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_INFO':
      return {
        ...state,
        listInfo: [...state.listInfo, action.payload]
      }
    case 'SEARCH':
      return {
        ...state,
        keyword: action.payload
      }
    case 'SET_SELECTED_INFO':
      return {
        ...state,
        selectedInfo: action.payload
      }
    case 'UPDATE_INFO':
      return {
        ...state,
        listInfo: state.listInfo.map((info) => {
          if (info.maSV === action.payload.maSV) {
            return action.payload
          }
          return info
        }),
        selectedInfo: null,
      }
    case 'DELETE_INFO':
      return {
        ...state,
        listInfo: state.listInfo.filter((info) => info.maSV !== action.payload),
      }
    case 'RESET':
      return {
        ...state,
        selectedInfo: null,
        keyword: '',
      }
    default:
      return state
  }
}

export default infoReducer