import React, { Component } from "react";
import axios from "axios";
import { updateUser } from "../../ducks/reducer";
import { connect } from "react-redux";
import swal from "sweetalert2";
import {withRouter} from 'react-router-dom'
import "./Auth.css";
import {popularMovies} from '../../ducks/movieReducer'
import Movies from '../Movies/Movies'




class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password1: "",
      password2: "",
      popularMovies: []
    };
  }
 
  componentDidMount() {
    axios.get('http://localhost:4002/api/popularMovies/?results=4').then(res => {
      this.setState({popularMovies: res.data.results})
    })
  }

  register = async () => {
    const { username, email, password1, password2 } = this.state;
    if (password1 === password2) {
      const profile_pic = `https://robohash.org/${username}`;
      const res = await axios.post("/auth/register", {
        username,
        email,
        password: password1,
        profile_pic
      });
      this.props.updateUser(res.data.user);
      this.props.history.push("/dashboard");
      swal.fire({ type: "success", text: `Welcome ${username}` });
    } else if (password1 !== password2) {
      swal.fire({ type: "error", text: "Passwords do not match." });
    } else {
      swal.fire({ type: "error", text: "Email already in use" });
    }
  }

  handleChange = (e, key) => {
    this.setState({
      [key]: e.target.value
    });
  };


viewMovie = ()=>  {
  const url = 'https://www.themoviedb.org/movie/' + this.getMovies(this.props.movie.id)
  window.location.href = url
}

  render() {
    const authMovie = this.state.popularMovies.map((movie, index) => {
      movie.poster_src = 'https://image.tmdb.org/t/p/w300' + movie.poster_path
      return <Movies key={movie.id} movie ={movie} poster_path ={movie.poster_path}/>
    })
    return (
      <div> 
      <div className="register-banner">
        <p>Prioritize your watch list, if you have little time for movies and shows this app is for you.</p>
        <div className="registration-box">
          <p> Username </p>
          <input
            placeholder="Username"
            value={this.state.username}
            onChange={e => this.handleChange(e, "username")}
          ></input>
          <p> Email </p>
          <input
            placeholder="Email"
            value={this.state.email}
            onChange={e => this.handleChange(e, "email")}
          ></input>
          <p>Password</p>

          <input
            placeholder="Password"
            type="password"
            value={this.state.password1}
            onChange={e => this.handleChange(e, "password1")}
          ></input>
          <p> Confirm Password </p>
          <input
            placeholder="Confirm Password"
            type="password"
            value={this.state.password2}
            onChange={e => this.handleChange(e, "password2")}
          ></input>

          <button className='btn-register' onClick={this.register}>Register</button>
        </div>
      <div>
 
     </div>
  </div>

<div className ='pop-movies'>  {authMovie}</div>
  </div>
    )}
}
function mapStateToProps(reduxState) {
  const {user} = reduxState.reducer
  const{movies, loading} = reduxState.movieReducer
  return{user, movies, loading}
}

export default withRouter(connect(mapStateToProps,
  { updateUser, popularMovies }
)(Auth));
