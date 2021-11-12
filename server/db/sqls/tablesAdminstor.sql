create table adminstor(
    account char(16) primary key not null,
    pwd char(16) not null,
    adminname char(16) not null default '管理员',
    image char(50) not null default 'https://s3.bmp.ovh/imgs/2021/11/c7ab74382f6ec5e2.jpg'
);

