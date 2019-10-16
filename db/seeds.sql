create table users (
id serial primary key,
username varchar(40),
email varchar(100),
password text,
profile_pic text)

create table movies (
id serial primary key,
movie_id int references users(id)



create table watchlist (
id serial primary key,
users_id int references users(id),
movies_id int references movies(id)
)

insert into users(username, email, password, profile_pic)
values ('username','email1','pass','profilepic')