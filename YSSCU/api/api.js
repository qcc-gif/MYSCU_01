const get = (url) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: "GET",
      header: {
        'Content-Type': 'application/json'
      },
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

const post = (url, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: "POST", //指定请求方式，默认get
      data: data,
      header: {
        //默认值'Content-Type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded' //post
      },
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    });
  })
}

const upload = (url, tempFilePath, data) => {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: url,
      filePath: tempFilePath,
      name: 'file',
      formData: {
        'studentNumber': data.studentNumber,
        'ppos': data.ppos,
        'plabel': data.plabel,
        'ptitle': data.ptitle,
        'ptext': data.ptext,
      },
      success(res) {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

const adminUpload = (url, tempFilePath, data) => {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: url,
      filePath: tempFilePath,
      name: 'file',
      formData: {
        'adminId': data.adminId,
        'studentNumber': data.studentNumber,
        'mtext': data.mtext,
      },
      success(res) {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

const addcomment = (url, tempFilePath, data) => {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: url,
      filePath: tempFilePath,
      name: 'file',
      formData: {
        'studentNumber': data.studentNumber,
        'postId': data.postId,
        'ptext': data.ptext,
      },
      success(res) {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

module.exports = {
  post: post,
  get: get,
  upload: upload,
  addcomment: addcomment,
  adminUpload: adminUpload,
}