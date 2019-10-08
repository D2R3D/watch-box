import React, {Component} from 'react'


class Movies extends Component {
viewMovie = ()=>  {

    const url = 'https://www.themoviedb.org/movie/' + this.props.movie.id
    window.location.href = url
}
    render() {
   
        return (

            <div>
                <div>
                    <h1>{this.props.movie.title}</h1>
            <img alt='poster' src={this.props.movie.poster_src} onClick={this.viewMovie}></img>
                <p>{this.props.movie.overview}</p>
                </div>
                <input type='button' onClick={this.viewMovie} value ='View'/>

            </div>


        );
    }
}

export default Movies