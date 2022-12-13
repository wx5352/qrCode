###  **微信小程序生成二维码（支持中文）** 
 **功能简介** ：
微信小程序生成二维码，支持文本和网址，支持中英文，输入框可清空，可单击保存二维码......


**核心代码** ：
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


 **功能示例图** ：
![优化版本](%E4%BC%98%E5%8C%961.png)


 **重要说明** ：
 在gitee和github找的此小程序生成二维码DOME存在几个严重bug，所以自己在这个版本修复bug并优化了部分功能。


 ![原版本](https://foruda.gitee.com/images/1670897171017169265/a46b5c21_5429226.png "1.png")


  **bug如下** ：
 1.不支持中文。
 2.图片保存扫描识别不了二维码。
 3.仅支持网址（优化）


 
 

