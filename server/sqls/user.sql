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
create table post(
    pid integer primary key autoincrement,
    stuNum char(30) not null,
    plabel char(20),
    ptime integer not null,
    ptext VARCHAR(255),
    pimgurl char(120),
    ppos char(30),
    pstar integer default 0,
    ptrans integer default 0
);

-- 评论
-- *cid 主键自增
-- pid 对应到贴子
-- openid 对应到评论人
-- ctext 评论内容
-- cimgurl 评论附带的图片
-- ptime 评论的创建时间
drop table if exists com;
create table com(
    cid integer primary key autoincrement,
    pid integer not null,
    openid char(30),
    ctext VARCHAR(255),
    cimgurl char(120),
    ptime integer not null
);

-- 收藏
-- *openid 收藏人的标识
-- *pid 贴子的标识
drop table if exists star;
create table star(
    stuNum char(30) not null,
    pid integer not null,
    primary key(stuNum,pid)
);

-- 举报
-- *stuNum 举报人的学号
-- *pid 贴子的标识
-- *poc 贴或者是评论
-- rtype 
-- rreason
-- rphone
-- aopinion 管理员的审核意见
drop table if exists report;
create table report(
    stuNum char(30) not null,
    pid integer not null,
    poc integer,
    rtype char(10),
    rreason char(20),
    rphone char(20),
    aopinion VARCHAR(255),
    primary key(stuNum,pid,poc)
    );
