import React, { Component } from "react";
import axios from "axios";
import { updateUser } from "../../ducks/reducer";
import { connect } from "react-redux";
import swal from "sweetalert2";
import {withRouter} from 'react-router-dom'
import "./Auth.css";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password1: "",
      password2: ""
    };
  }
  handleChange = (e, key) => {
    this.setState({
      [key]: e.target.value
    });
  };

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
  };

  render() {
    return (
      <div className="register-banner">
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
        <div></div>
      </div>
    );
  }
}
function mapStateToProps(reduxState) {
  const {user} = reduxState;
  return{user}
}

export default withRouter(connect(mapStateToProps,
  { updateUser }
)(Auth));
