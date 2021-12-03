char-- 申诉
-- *openid
-- atype 申诉类型
-- areason 申诉理由
-- aphone 联系方式
drop table if exists appeal;
create table appeal(
    stuNum char(30) primary key not null,
    atype char(10),
    areason char(20),
    aphone char(20)
);