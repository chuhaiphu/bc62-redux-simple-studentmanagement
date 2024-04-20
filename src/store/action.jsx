export const actionAddInfo = (info) => {
  return {
    type: 'ADD_INFO',
    payload: info
  }
}

export const actionSearch = (keyword) => {
  return {
    type: 'SEARCH',
    payload: keyword
  }
}

export const actionDeleteInfo = (maSV) => {
  return {
    type: 'DELETE_INFO',
    payload: maSV,
  }
}

export const actionSetSelectedInfo = (info) => {
  return {
    type: 'SET_SELECTED_INFO',
    payload: info
  }
}

export const actionUpdateInfo = (info) => {
  return {
    type: 'UPDATE_INFO',
    payload: info
  }
}

export const actionReset = () => {
  return {
    type: 'RESET',
  }
}