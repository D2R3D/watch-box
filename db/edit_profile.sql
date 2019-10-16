update users
set profile_pic, about_me = $1, $2
where users.id = $1
returning users.id, profile_pic