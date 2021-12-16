drop table if exists adminstor;

create table adminstor(
    account char(16) primary key not null,
    pwd char(16) not null,
    adminname char(16) not null default '管理员',
    image char(50) not null default 'https://s3.bmp.ovh/imgs/2021/11/c7ab74382f6ec5e2.jpg'
);

insert into adminstor(account,pwd,adminname,image)values('admin002','root','管理员','http://tmp/UNv8lnxr7Oo4d5f36bcf29ad3e41eec0e68bb6336c6d.jpg')
insert into adminstor(account,pwd,adminname,image)values('admin003','root','管理员','https://s3.bmp.ovh/imgs/2021/11/c7ab74382f6ec5e2.jpg')
insert into adminstor(account,pwd,adminname,image)values('admin004','root','管理员','https://s2.loli.net/2021/12/03/k1MAVFfUpOwJBQz.jpg')