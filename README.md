###  **微信小程序生成二维码（支持中文）** 
 **功能简介** ：

微信小程序生成二维码，支持文本和网址，支持中英文，输入框可清空，可单击保存二维码......


**核心代码** ：

 createQrCode:function(url,canvasId,cavW,cavH){
    
    QR.qrApi.draw(url,canvasId,cavW,cavH);

    var that = this;
    
    var st = setTimeout(function(){

      that.canvasToTempImage();

      clearTimeout(st);
    
    },3000);
    
  },


 **微信扫码查看**：

![小程序](https://user-images.githubusercontent.com/42396365/207815372-805f0920-4b3c-4243-98f9-02691a1098bb.jpg)



 **重要说明** ：

 在gitee和github找的此小程序生成二维码DOME存在几个严重bug，所以自己在这个版本修复bug并优化了部分功能。



  **bug如下** ：

 1.不支持中文。

 2.图片保存扫描识别不了二维码。

 3.仅支持网址（优化）

  **喜欢的可以点个Star，谢谢！** 

