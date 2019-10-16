import axios from 'axios'

const initialState = {
    movies: {results: []},
    loading: false
    
}

const GET_MOVIES = 'GET_MOVIES'
const POPULAR_MOVIES = 'POPULAR_MOVIES'


// SEARCH MOVIES

export const getMovies = (url) => {
    const moviePromise = axios.get(url).then(res=> {
    return res.data
})
return {
    type: GET_MOVIES, 
    payload: moviePromise
    }
}
 // POPULAR MOVIES

export const popularMovies = (url) => {
    const popularPromise = axios.get(url).then(res => {
        return res.data
    })
    return{
    type: POPULAR_MOVIES,
    payload: popularPromise
   }
}

function reducer (state= initialState, action){
    switch(action.type) {
         case GET_MOVIES +'_PENDING':
             return {...state, loading: true}

        case GET_MOVIES +'_REJECTED': 
        return {...state, loading: false}

        case GET_MOVIES +'FULFILLED':
            return{...state, loading: false, movies: action.payload}
        
        case POPULAR_MOVIES + '_PENDING':
             return {...state, loading: true}
           

        case POPULAR_MOVIES +'_REJECTED': 
        return {...state, loading: false}

        case POPULAR_MOVIES +'FULFILLED':
            return{...state, loading: false, movies: action.payload}
        
            default: return state

    }
}

export default reducer