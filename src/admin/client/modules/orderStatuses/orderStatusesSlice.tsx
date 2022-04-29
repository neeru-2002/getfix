import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import api from "lib/api"
import { RootState } from "lib/store"
import messages from "lib/text"

// Define a type for the slice state
interface OrderStatusesState {
  items: any[]
  isFetched: boolean
  isFetching: boolean
  isSaving: boolean
  errorFetch: null
  errorUpdate: null
  selectedId: "all"
}

// Define the initial state using that type
const initialState: OrderStatusesState = {
  items: [],
  isFetched: false,
  isFetching: false,
  isSaving: false,
  errorFetch: null,
  errorUpdate: null,
  selectedId: "all",
}

export const orderStatusesSlice = createSlice({
  name: "orderStatuses",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    requestStatuses: state => {
      state.isFetching = true
    },
    receiveStatuses: (state, { payload }: PayloadAction<any>) => {
      state.isFetching = false
      state.isFetched = true
      state.items = payload
    },
    receiveErrorStatuses: (state, { payload }: PayloadAction<any>) => {
      state.errorFetch = payload
    },
    selectStatus: (state, { payload }: PayloadAction<string>) => {
      state.selectedId = payload
    },
    deselectStatus: state => {
      state.selectedId = null
    },
    requestUpdateStatus: (state, { payload }: PayloadAction<string>) => {
      state.isSaving = true
    },
    receiveUpdateStatus: state => {
      state.isSaving = false
    },
    errorUpdateStatus: (state, { payload }: PayloadAction<any>) => {
      state.isSaving = false
      state.errorUpdate = payload
    },
    successCreateStatus: (state, { payload }: PayloadAction<string>) => {},
    successDeleteStatus: (state, { payload }: PayloadAction<string>) => {},
  },
})

export const {
  requestStatuses,
  receiveStatuses,
  receiveErrorStatuses,
  selectStatus,
  deselectStatus,
  requestUpdateStatus,
  receiveUpdateStatus,
  errorUpdateStatus,
  successCreateStatus,
  successDeleteStatus,
} = orderStatusesSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectOrderStatuses = (state: RootState) => state.orderStatuses

export default orderStatusesSlice.reducer

function fetchStatuses() {
  return dispatch => {
    dispatch(requestStatuses())
    return api.orderStatuses
      .list()
      .then(({ status, json }) => {
        json = json.sort((a, b) => a.position - b.position)

        json.forEach((element, index, theArray) => {
          if (theArray[index].name === "") {
            theArray[index].name = `<${messages.draft}>`
          }
        })

        dispatch(receiveStatuses(json))
      })
      .catch(error => {
        dispatch(receiveErrorStatuses(error))
      })
  }
}

function shouldFetchStatuses(state) {
  const statuses = state.orderStatuses
  if (statuses.isFetched || statuses.isFetching) {
    return false
  } else {
    return true
  }
}

export function fetchStatusesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchStatuses(getState())) {
      return dispatch(fetchStatuses())
    }
  }
}

export function updateStatus(data) {
  return (dispatch, getState) => {
    dispatch(requestUpdateStatus(data.id))
    return api.orderStatuses
      .update(data.id, data)
      .then(({ status, json }) => {
        dispatch(receiveUpdateStatus())
        dispatch(fetchStatuses())
      })
      .catch(error => {
        dispatch(errorUpdateStatus(error))
      })
  }
}

export function createStatus(data) {
  return (dispatch, getState) => {
    return api.orderStatuses
      .create(data)
      .then(({ status, json }) => {
        dispatch(successCreateStatus(json.id))
        dispatch(fetchStatuses())
        dispatch(selectStatus(json.id))
      })
      .catch(error => {
        //dispatch error
        console.log(error)
      })
  }
}

export function deleteStatus(id) {
  return (dispatch, getState) => {
    return api.orderStatuses
      .delete(id)
      .then(({ status, json }) => {
        if (status === 200) {
          dispatch(successDeleteStatus(id))
          dispatch(deselectStatus())
          dispatch(fetchStatuses())
        } else {
          throw status
        }
      })
      .catch(error => {
        //dispatch error
        console.log(error)
      })
  }
}