var { readImg } = require('./../utils/images')
var fs=require('fs');

path = './lzy.jpg'
// var fileData = fs.readFileSync(path, 'binary');
// console.log(fileData)

// imagePath 是图片在本地的路径  如 'D:\img\1.jpg'
let imageData = fs.readFileSync(path)
// 转成 base64
let imageDataToBase64 = imageData.toString('base64')
console.log(imageDataToBase64)