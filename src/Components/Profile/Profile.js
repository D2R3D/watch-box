import React, { Component } from "react";
import {updateUser, } from "../../ducks/reducer";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import "./Profile.css";
import axios from 'axios'



class Profile extends Component {
  constructor(props) {
    super(props);
    this.state ={
        wantToWatch: true,
        finishedWatching: false
    }
  }
//  componentDidMount() {
//      this.getUser()
//  }

 getUser =() => {
     const {user} = this.state
     axios.get('/auth/users', user).then(response =>{
         this.setState({user: response.data})
     })
 }

    handleChange = (e, key) => {
        this.setState({
          [key]: e.target.value
        });
      };

    
      handleWatchList = () => {
    
      }

      handleFinishedWatching = () =>{

      }




    render() {
        return(
            <div>
                <div> 
                    {this.props.user ? (
                        <div>
                            <h1> {this.props.user.user.username}</h1>
                            <p>{this.props.about_me}</p>
                          <div>
                          <img src={this.props.user.user.profile_pic} alt='prof-img'></img>

                            <input  type ='text'
                                    placeholder='Interests'
                                   ></input>

                <Link to='/EditProfile'> <button>Edit Profile</button></Link>
                        </div>
                        </div>
                    ) : (
                   null
        
                    )}
                </div>
          

                
            </div>

        )
        
    }

}

function mapStateToProps(reduxState) {
  const { user } = reduxState.reducer;
  return { user };
}

export default withRouter(
  connect(
    mapStateToProps,
    { updateUser,  }
  )(Profile)
);
