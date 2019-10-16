import React, {Component} from 'react'

import ('./Movies.css')


class Movies extends Component {
constructor(props) {
super(props)
this.state = {
    seen: false, 
    unseen: false,
}
}

viewMovie = ()=>  {

    const url ='https://www.themoviedb.org/movie/' + this.props.movie.id
    window.location.href = url
}
handleToggle =() => {

}

    render() {
   
        return (

            <div className ='movie-search'>
                <div>
                    <h1>{this.props.movie.title}</h1>
            <img className='view-movie' alt='movie-poster' src={this.props.movie.poster_src} onClick={this.viewMovie}></img>
                {/* <p>{this.props.movie.overview}</p> */}
              
                </div>
               <button className='buttons' > Want to Watch</button>
              <button className='buttons' > Finished Watching</button> 
                <input className='view-btn' type='button' onClick ={this.viewMovie} value ='View'/>

            </div>


        );
    }
}

export default Movies