import {createStore} from 'redux'
import reducer from './reducer'
// import movieReducer from './movieReducer'

// const reducers = combineReducers({
//     reducer,
// })
export default createStore(reducer)
