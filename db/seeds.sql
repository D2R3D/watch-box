create table users (
id serial primary key,
username varchar(40),
email varchar(100),
password text,
profile_pic text)

insert into users(username, email, password, profile_pic)
values ('username','email1','pass','profilepic')