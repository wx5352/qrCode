// pages/main/index.js
var QR = require("../../utils/qrcode.js");
Page({
  data:{
    /*
    官网说hidden只是简单的控制显示与隐藏，组件始终会被渲染，
    但是将canvas转化成图片走的居然是fail，hidden为false就是成功的
    所以这里手动控制显示隐藏canvas
    */
    maskHidden:true,
    imagePath:'',
    inputVal: '',
    placeholder:'请输入内容',
    showTips:false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var size = this.setCanvasSize();//动态设置画布大小
    var initUrl = "http://"+this.data.placeholder;
    this.createQrCode(initUrl,"mycanvas",size.w,size.h);

  },
  onReady:function(){
    
  },
  onShow:function(){
    
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },

  onUnload:function(){
    // 页面关闭

  },
  //适配不同屏幕大小的canvas
  setCanvasSize:function(){
    var size={};
    try {
        var res = wx.getSystemInfoSync();
        var scale = 750/686;//不同屏幕下canvas的适配比例；设计稿是750宽
        var width = res.windowWidth/scale;
        var height = width;//canvas画布为正方形
        size.w = width;
        size.h = height;
      } catch (e) {
        // Do something when catch error
        console.log("获取设备信息失败"+e);
      } 
    return size;
  } ,
  createQrCode:function(url,canvasId,cavW,cavH){
    //调用插件中的draw方法，绘制二维码图片
    QR.qrApi.draw(url,canvasId,cavW,cavH);
    var that = this;
    //二维码生成之后调用canvasToTempImage();延迟3s，否则获取图片路径为空
    var st = setTimeout(function(){
      that.canvasToTempImage();
      clearTimeout(st);
    },3000);
    
  },
  //获取临时缓存照片路径，存入data中
  canvasToTempImage:function(){
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
          var tempFilePath = res.tempFilePath;
          console.log("tempFilePath:"+tempFilePath);
          that.setData({
              imagePath:tempFilePath,
          });
      },
      fail: function (res) {
          console.log(res);
      }
    });
  },
  //点击图片进行预览，长按保存分享图片
  previewImg:function(e){
    var img = this.data.imagePath
    console.info('previewImg:'+this.data.imagePath)
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  },
  clearInputEvent: function(res) {
    this.setData({
    'inputVal': ''
    })
  },
  toUtf8: function(str) {
    var out,//输出
       i,//字符索引
        len,//长度
         c;//charCodeAt 编码后的字符
    out = "";
    len = str.length;
    for(i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if((c >= 0x0001) && (c <= 0x007F)) {
        out += str.charAt(i);
      } else if(c > 0x07FF) {
        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
        out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
      } else {
        out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
      }
    }
    return out;
  },
   /**
   * 表单双向数据绑定
   */
  bindKeyInput: function (e) {
    this.setData({
      inputVal: e.detail.value.trim()
    })
  },
  formSubmit: function(e) {
    if(!this.data.inputVal){
      this.setData({
        showTips:true
      })
      return
    }else{
      this.setData({
        showTips:false
      })
    var that = this;
    var url = e.detail.value.url;
    if(e.detail.value.radType ==1){
      url = url==''?('http://'+that.data.placeholder):('http://'+url);
    }
    url = this.toUtf8(url)
    that.setData({
      maskHidden:false,
    });
    wx.showToast({
      title: '生成中...',
      icon: 'loading',
      duration:2000
    });
    var st = setTimeout(function(){
      wx.hideToast()
      var size = that.setCanvasSize();
      //绘制二维码
      that.createQrCode(url,"mycanvas",size.w,size.h);
      that.setData({
        maskHidden:true
      });
      clearTimeout(st);
    },2000)
  }

  },
   // 保存图片
   saveImg(){
    wx.canvasToTempFilePath({
      destWidth: '686rpx',
      destHeight:'686rpx',
      canvasId: 'mycanvas',
      success(res) {
        wx.saveImageToPhotosAlbum({
          filePath:res.tempFilePath,
          success(res) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    })
  },

})