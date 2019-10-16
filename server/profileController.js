

const updateProfile = async (req,res) => {
    const id = req.params
    const editProfile = req.body
    const db = req.app.get('db')
    const editInfo = await db.edit_profile([profile_pic])
    const profImg =  users.find(profile_pic => {
        return profile_pic.id === +id
    })
    profImg.profile_pic = editProfile.editImage
    
    req.session.user= {user}
    res.status(200).send({message: 'Profile Updated', user: req.session.user, loggedIn: true })
}

const wantToWatch = async (req,res) =>{
    const id = req.params
}

module.exports={
    updateProfile
}