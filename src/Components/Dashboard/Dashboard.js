 import React, { Component } from 'react'
import Movies from '../Movies/Movies'
import $ from 'jquery'
// import {popularMovies} from '../../ducks/movieReducer'
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import './Dashboard.css'

const{apiKey} = require('../../config')

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
        movies: []
        }

this.performSearch()
    }
  UNSAFE_componentWillMount() {
 axios.get('http://localhost:4002/api/popularMovies').then(res =>{
        this.setState({movies: res.data.results})
        
        })
    }



    performSearch(searchTerm) {
        const urlString =`http://api.themoviedb.org/3/search/movie${apiKey}&query=` +searchTerm
        $.ajax({
            url: urlString,
            success: (searchResults) => {
                const results = searchResults.results

                var movieRows =[]

                results.forEach((movie) => {
                    movie.poster_src = 'https://image.tmdb.org/t/p/w300' + movie.poster_path
                    const movieRow = <Movies key={movie.id} movie={movie}/>
                    movieRows.push(movieRow)
                })
                this.setState({rows: movieRows})
            }
        })
    }


    

    handleChange = event => {
         const searchTerm = event.target.value
        this.performSearch(searchTerm)
    };



render() {
   console.log(this.state.movies)
   
   const mapPopular = this.state.movies.map((movie, index) => {
    movie.poster_src =  'https://image.tmdb.org/t/p/w300' + movie.poster_path
  return <Movies key={movie.id} movie ={movie} poster_path={movie.poster_path}/>
    
   })

    return (

        <div className='container'>
   
        <div className='search-box'>
            
        <input 
        onChange ={e => this.handleChange(e, 'searchTerm')} placeholder='Search Movies'></input> 
        </div>
        <h1>Search for a movie or browse the most recent and popular Boxoffice hits!</h1> 
        
        
    <div className ='mapped-movies'>

    {/* <div className ='movie-container'> */}
      
      {this.state.rows}
      {/* <div className ='movie-banner'>
      
          
      </div> */}


      
      {/* </div> */}
      <div className ='movie-container'>
          {mapPopular}
        
          </div>
    </div>

</div>
    );
}
}


const mapStateToProps =(reduxState) => {
    return reduxState
}

export default withRouter(connect(mapStateToProps)(Dashboard))