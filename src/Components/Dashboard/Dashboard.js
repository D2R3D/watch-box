import React, { Component } from 'react'
import Movies from '../Movies/Movies'
import $ from 'jquery'
import {getMovies} from '../../ducks/movieReducer'
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'



class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
        
        }

  


this.performSearch()
    }


//  performSearch = async (searchTerm) => {
//          const {movies} = this.state
//          const urlString = `http://api.themoviedb.org/3/search/movie?api_key=88f5709d52c11fd313af1ce79c422110&query=` +searchTerm
//           const url = urlString
//          const res = await axios.get(url,{movies})
//          this.props.getMovies(res.data.movies)

        
//         const movieRows = []
        
//         res.forEach((movie) => {
//         movie.poster_src ='http://image.tmdb.org/t/p/w200' + movie.poster_path
    
//         const movieRow =<Movies key={movie.id} movies ={movie} />
//         movieRows.push(movieRow)

//         this.setState({rows: movieRows})
//     })
//  }


    performSearch(searchTerm) {
        const urlString =`http://api.themoviedb.org/3/search/movie?api_key=88f5709d52c11fd313af1ce79c422110&query=` +searchTerm
        $.ajax({
            url: urlString,
            success: (searchResults) => {
                const results = searchResults.results

                var movieRows =[]

                results.forEach((movie) => {
                    movie.poster_src = 'https://image.tmdb.org/t/p/w200' + movie.poster_path
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


    // handleSubmit =() => {
    //     axios.get( `https://api.themoviedb.org/3/movie/550?api_key=${this.apiKey}&query=${this.state.searchTerm}`).then(data => {
    //         this.setState({
    //             movies: [...data.results]
    //         })
    //     })
    // }


render() {
    return (
        <div>
            <input onChange={this.handleChange}></input>

        {this.state.rows}
        </div>
    );
}
}

const mapStateToProps =(reduxState) => {
    return reduxState
}

export default withRouter(connect(mapStateToProps,{getMovies})(Dashboard))