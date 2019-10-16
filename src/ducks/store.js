import {createStore, combineReducers} from 'redux'
import reducer from './reducer'
import movieReducer from './movieReducer'

const reducers = combineReducers({
    reducer, movieReducer
})
export default createStore(reducers)
