Page({

  // onShareAppMessage() {
  //   return {
  //     title: '游戏列表',
  //     path: 'page/Game/index/index'
  //   }
  // },

  data: {
    list: [
      {id: 1, name: '24点'},
      {id: 2, name: '数独'},
    ],
  },

  // onLoad() {
  //   // this.setData({
  //   //   savedFilePath: wx.getStorageSync('savedFilePath')
  //   // })
  // },


  // confirm() {
  //   // this.setData({
  //   //   'dialog.hidden': true
  //   // })
  // },

  navigationToDetail(e) {
    wx.navigateTo({
      // url: '../Game/GameDetail?id=' + e.currentTarget.dataset.id
      url: '../Game/twenty-four?id=' + e.currentTarget.dataset.id
    })
  },
})
