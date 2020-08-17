var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');



var app = getApp();

Page({
  data: {
    array: ['请选择反馈类型', '商品相关', '物流状况', '客户服务', '优惠活动', '功能异常', '产品建议', '其他'],
    index: 0,
    content: '',
    contentLength: 0,
    mobile: ''
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    });
  },
  mobileInput: function (e) {
    let that = this;
    this.setData({
      mobile: e.detail.value,
    });
    console.log(that.data.mobile);
  },
  contentInput: function (e) {

    let that = this;
    this.setData({
      contentLength: e.detail.cursor,
      content: e.detail.value,
    });
    console.log(that.data.content);
  },
  cleanMobile: function () {
    let that = this;

  },
  sbmitFeedback: function (e) {
    let that = this;
    if (that.data.index == 0) {
      util.showErrorToast('请选择反馈类型');
      return false;
    }

    if (that.data.content == '') {
      util.showErrorToast('请输入反馈内容');
      return false;
    }

    if (that.data.mobile == '') {
      util.showErrorToast('请输入手机号码');
      return false;
    }
    if (!util.validatePhone(that.data.mobile)) {
      util.showErrorToast('请输入正确手机号码');
      return false;
    }
    wx.showLoading({
      title: '提交中...',
      mask: true,
      success: function () {

      }
    });

    util.request(api.FeedbackAdd, {
      tel: that.data.mobile.toString(),
      type: that.data.index.toString(),
      desc: that.data.content
    }, 'POST').then(function (res) {
      if (res.code === 200) {
        console.log(res.data);

        wx.hideLoading();

        wx.showToast({
          title: res.data,
          icon: 'success',
          duration: 2000,
          complete: function () {
            console.log('重新加载');
            that.setData({
              index: 0,
              content: '',
              contentLength: 0,
              mobile: ''
            });
          }
        });
      } else {
        util.showErrorToast(res.data);
      }

    });
  },
  onLoad: function (options) {},
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭
  }
})