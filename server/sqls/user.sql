-- 用户
-- *stuNum
-- 学号
-- 昵称
-- 标签
drop table if exists users;
create table users(stuNum char(20) primary key not null,simgurl char(120),nickname char(20),label char(10)default `这个人很懒~`);

-- 贴子
-- *pid 贴子id
-- stuNum 发帖人的账号（学号）
-- plabel 贴子标签，非必填
-- ptime 发帖时间
-- ptext 贴子详情
-- pimgurl 若贴子有图片，贴子图片的存放路径(可能有多张)
-- ppos 贴子的地点
-- pstar 点赞数
-- ptrans 转发数
drop table if exists post;
create table post(pid integer primary key autoincrement,stuNum char(30) not null,plabel VARCHAR(20),ptime integer not null,ptitle VARCHAR(255),ptext VARCHAR(255),pimgurl char(120),ppos char(30),pstar integer default 0,ptrans integer default 0,pcom integer default 0,pthumb integer default 0);

-- 评论
-- *cid 主键自增
-- pid 对应到贴子
-- openid 对应到评论人
-- ctext 评论内容
-- cimgurl 评论附带的图片
-- ctime 评论的创建时间
drop table if exists com;
create table com(cid integer primary key autoincrement,pid integer not null,stuNum char(30),ctext VARCHAR(255),cimgurl char(120),ctime integer not null,cthumb int default 0);

-- 收藏
-- *openid 收藏人的标识
-- *pid 贴子的标识
drop table if exists star;
create table star(stuNum char(30) not null,pid integer not null,primary key(stuNum,pid));

-- 举报
-- *stuNum 举报人的学号
-- *rid 标识号
-- *poc 贴或者是评论
drop table if exists report;
create table report(stuNum char(30) not null,rid integer not null,poc integer,primary key(stuNum,rid,poc));
-- 通知消息表message
-- 学号stuNum*
-- 消息内容mtext
--管理员账号adminId
drop table if exists message;
create table message(mid integer primary key autoincrement,stuNum char(30) not null,mtext VARCHAR(255),adminId char(30) not null,mtime integer not null);


-- 点赞
-- stuNum 点赞者的学号
-- pid 被点赞的帖子的标识号
-- poc 帖子或评论 1为帖子 0为评论
drop table if exists thumb;
create table thumb(stuNum char(30)  not null,pid integer not null,poc int default 1,primary key(stuNum,pid,poc));

-- 转发
-- stuNum 转发者的学号
-- pid 被转发的帖子的标识号
drop table if exists trans;
create table trans(tid integer primary key autoincrement,stuNum char(30)  not null,pid integer not null);