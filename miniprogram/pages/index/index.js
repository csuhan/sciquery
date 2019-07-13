//index.js
const app = getApp()

Page({
  data: {
    isQuery:false,
    sciname:'',
    sci:[],
  },
  onValueChange:function(value){
    this.setData({
      sciname:value.detail
    })
  },
  onClickQuery:function(){
    var _this = this
    this.setData({
      isQuery:true
    })
    console.log('begin'+_this.data.sciname)
    wx.cloud.callFunction({
      name: 'http_get',
      data: {
        sciname:_this.data.sciname
      },
      success:res=>{
        //未查到
        if(res.result==-1){
           wx.showModal({
             title: '提示',
             content: '未查询到相关信息，换个关键词试试？',
           }) 
        }else{
          wx.setStorageSync('scis', res.result)
          _this.setData({
            sci:res.result
          })
        }
        _this.setData({
          isQuery: false
        })
      },
      fail:err=>{
        _this.setData({
          isQuery: false
        })
        console.log(err)
      },
    })
  },

  onLoad: function() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

 

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

 

})
