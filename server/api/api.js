const request = require('request');


/**
 * @function Get request中的Get方法Promise封装
 * @param {String} url 请求的URL
 */
const Get = async (url) => {
    return new Promise(async (resolve, reject) => {
        request.get(url, async (error, response, body) => {
            if (error) {
                reject(error)
            } else {
                resolve({
                    'response': response,
                    'body': body
                })
            }
        })
    })
}

/**
 * @function Get request中的POST方法Promise封装
 * @param {String} url 请求的URL
 * @param {String} data 请求表单数据
 */
const Post = async (url, data) => {
    return new Promise(async (resolve, reject) => {
        request({
            url: url,
            method: "POST",
            json: true,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        }, function (error, response, body) {
            if (error) {
                reject(error)
            } else {
                resolve({
                    'response': response,
                    'body': body
                })
            }
        });
    })


}

module.exports = {
    Get,
    Post
}