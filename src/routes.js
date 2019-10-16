import React from 'react'
import Auth from './Components/Auth/Auth'
import Dashboard from './Components/Dashboard/Dashboard'
import Profile from './Components/Profile/Profile'
import Seen from './Components/Movies/Seen'
import Unseen from './Components/Movies/Unseen'
import EditProfile from './Components/Profile/EditProfile'

import {Switch, Route} from 'react-router-dom'

export default (
    <Switch>
       <Route exact path = '/' component = {Auth} />
       <Route path = '/dashboard' component ={ Dashboard} />
       <Route path = '/profile' component={Profile} />
       <Route path ='/seen' component={Seen} />
       <Route path ='/unseen' component={Unseen} />
       <Route path ='/editProfile' component ={EditProfile} />
    </Switch>
)