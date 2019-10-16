import React, { Component } from 'react'
import axios from 'axios';

export default class EditProfile extends Component {
    constructor() {
        super() 
        this.state = {
            editImage: '',
            about_me: 'default about me section, needs to be updated',
            user: null

        }
    }
    
    handleChange =(e, key) => {
        this.setState({
            [key]: e.target.value
        })
    }


    handleEditProfile = async(id) =>{
        const editProfile = {
            editImage: this.state.editImage,
            about_me: this.state.about_me
        }
        const res = await axios.put(`/auth/user/${id}`, editProfile)
            this.props.updateProfile(res.data.user)
            this.props.history.push('/profile')
    
    }

    render() {

        return (
        
                    <div>
                            <div>
                    <input value={this.state.editImage}
                           placeholder='Change Image (url)'
                            onChange ={e =>this.handleChange(e, 'editImage')}>
                    </input>
                     </div>

                        
                 <div>
                    <input value ={this.state.about_me}
                           placeholder='About Me'
                           onChange={e => this.handleChange(e, 'about_me')}></input>
                    </div>

                    
                           <button onClick={this.handleEditProfile}> Submit Changes</button>
                    
                           
                

        </div>
        )
    }
}
