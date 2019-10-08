import React, { Component } from "react";
import { updateUser } from "../../ducks/reducer";
import { connect } from "react-redux";


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      profile_pic: '',
      aboutMe: "",
      seen: false,
      haventSeen: true
    };
  }

  handleChange = (e, key) => {
    this.setState({
      [key]: e.target.value
    });
  };

//   profileChange =() => {
//       const {profile_img} = this.props.profile_pic
//       this.setState({profile_pic: `https://robohash.org/${this.props.username}`})
//   }

  render() {
    return (
      <div>
        <div>
          <img src={this.props.profile_pic} alt='profile-img' ></img>
          <p>{this.props.username}</p>

              <input
                value={this.state.username}
                placeholder="Edit Username"
                onChange={e => this.handleChange(e, "username")}
              />
            
        
        </div>

        <div></div>
      </div>
    );
  }
}

export default connect(updateUser)(Profile);
