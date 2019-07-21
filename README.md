## 写在前面
自从微信小程序功能发布后，我就一直关注着小程序的动向，然而限于学业繁忙，总是没有太多的时间去学习。大二逐渐学习了Vuejs，被其简洁的设计所吸引，后来看了看小程序的开发文档，发现这么的相似？可能前端的发展趋势就是这样的吧，各个框架都趋向于相似的优秀的设计。

大三逐渐学习了Go语言，为了练习Go语言，同时也将自己几年来积累的东西聚合在一起，于是开发了微信小程序：We中南（可以去微信搜索，虽然现在毕业已经不打算维护了），其聚合了中南大学校内常见的信息查询功能，如：成绩课表查询、校车校历查询等项目已经在我的Github开源：[前端](https://github.com/csuhan/wecsu)、[后端](https://github.com/csuhan/csugo)。
![We中南、SCI期刊IF查询](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8zMjQ3NDI0LWY4N2Y1MjdjMWQ5ZDQzNjEucG5n)
今年暑假的某天突然心血来潮，看了下We中南的数据统计，发现还是有人用的，在没有推广的情况下居然增加了好几百的访问量（突然的感动），同时发现小程序支持云函数开发了，也就是说对于小型的小程序不必使用后端服务器，直接使用其提供的nodejs环境进行开发。

经过这些天的摸索，我想把自己从小程序注册到上架的全过程分享出来，供准备学习小程序的同学参考。

## 准备工作
### 1. 注册微信小程序账号
点击[传送门](https://mp.weixin.qq.com/cgi-bin/registermidpage?action=index&lang=zh_CN&token=)立马注册微信小程序账号。点进去后会看到如下界面，选择注册类型时要选择微信小程序。
![注册界面](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8zMjQ3NDI0LWNmYjFkNDViYjk2YzA4YjYucG5n)
接着填写相关的信息即可完成注册。
![注册界面-填写信息](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8zMjQ3NDI0LTFmMjI3NmFlNDI0MzUwYzkucG5n)
在完成注册后，切换到开发->开发设置,可以查看开发者ID。
![AppID](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8zMjQ3NDI0LTQ5ZTcxNGYzZGRmNzBmMjMucG5n)

### 2. 下载开发者工具，新建项目
进入[传送门](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)，下载安装最新版的开发者工具。使用开发者工具，开发者可以完成小程序的 API 和页面的开发调试、代码查看和编辑、小程序预览和发布等功能。

关于IDE使用方法的界面，可以详细参考[官方文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/devtools.html)

接着打开开发者工具，修改项目名称，填入上面说的AppID，后端服务选择小程序云开发。
![新建小程序项目](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8zMjQ3NDI0LWNjMmM2YmMwNmE0OGRlMjkucG5n)

新建项目后我们可以看到，IDE已经帮我们新建了一个包含云函数开发的小程序模板，还提供了一些功能测试界面。
此时我们并没有开通云开发，需要点击IDE左上角的“云开发”，然后选择开通云服务。

![IDE主界面](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8zMjQ3NDI0LTY0NmI5NzRkMGQ0N2JhZDcucG5n)

## 开发小程序

### 1. 关于项目文件结构的介绍

![项目结构](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8zMjQ3NDI0LWViYTk4MGQ1YmM3OWMxY2UucG5n)
项目分为两个子文件夹，一个为cloudfunctions，里面包含小程序的云函数，一个子文件夹包含一个云函数；另一个为miniprogram，是小程序的前端文件夹，没有固定的文件夹格式，完全可以通过对app.json进行修改定制自己的文件夹。具体文件的介绍可以参考[官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/structure.html)

### 2. 修改小程序信息
打开miniprogram文件夹下的app.json,其定义了小程序的基本信息。
下面是我的小程序的app.json，我将示例里无关的页面都删除了，添加了index主界面和detail详情页。

关于示例项目的修改：可以直接将pages目录下除index外的页面都删除，将style、images文件夹下的文件都删除。
```json
{
  "pages": [
    "pages/index/index",
    "pages/detail/index"
  ],
  "window": {
    "backgroundColor": "#F6F6F6",
    "backgroundTextStyle": "light",
    "navigationBarBackgroundColor": "#F6F6F6",
    "navigationBarTitleText": "SCI IF期刊影响因子查询2019",
    "navigationBarTextStyle": "black"
  },
  "sitemapLocation": "sitemap.json"
}
```

### 3. 新建云函数！
> 云函数最大的优势便是无需购买服务器，无需注册域名，并无需配置SSL证书，真正达到了开箱即用。
在cloudfunctions目录上又见新建nodejs云函数，即可创建一个新的云函数，其包含了两个文件：package.json、index.js

package.json为一个标准的npm包，index.js为云函数的主文件。下面是新建云函数的初始内容，可以看到其首先引入了```wx-server-sdk```，它为小程序提供了操作云数据库的能力，接着初始化云函数，export云函数内容。
```javascript
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}
```

需要说明的是：云函数包含几乎完整的nodejs环境，因此一些常见的nodejs库如：requests、chreeio等都可以通过package.json添加，使用。

### 4. 为云函数添加功能
本文的小程序为SCI期刊影响因子查询的小程序，逻辑较为简单，后端仅需要提供一个期刊查询接口，为前端提供相应期刊的影响因子即可。

1. 新建云函数```http_get```
2. 引入相关类库。在终端中打开云函数```http_get```的目录，接着安装依赖库。由于此函数利用了第三方的查询接口，因此需要使用http请求库```got```和http解析库```cheerio```。具体操作如下
```bash
cd /path/to/your/cloudfunctions
npm install //安装wx-cloud-server
npm install got --save
npm install cheerio --save
```
3. 为函数添加功能。此处主要是加载相关类库，解析html，然后将结果编码为json返回客户端。
```javascript
// 加载相关类库
const cloud = require('wx-server-sdk')
const got = require('got')
const querystring = require('querystring')
const cheerio = require('cheerio')
cloud.init()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  //sci影响因子查询接口
  const sci_url = 'some url'
  //获取期刊名称
  let sciname = event.sciname
  let querys = querystring.stringify({ q: sciname, sci: 1 });
  //请求数据
  let resp = await got(sci_url + String(querys))
  //解析html
  const $ = cheerio.load(resp.body)
  const lists = $(".tb1 tr")
  //判断是否存在查询期刊
  if (lists.children().length == 0) {
    return -1
  }else{
    let jounalLists = lists.map((i, item) => {
      return {
        //期刊编号
        no: $(item).children().eq(0).text(),
        //省略部分内容，解析html参数
        //影响因子解析
        if: $(item).children().eq(7).text(),
      }
    }).get()
    return jounalLists //返回解析结果
  }
}
```
4. 调试云函数。云函数的调试可以通过云端调试：IDE界面->云开发->云函数，选择相应的云函数即可进行调试。点击调试后即可返回调试结果，可以根据结果对函数进行修改。
![云函数调试](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8zMjQ3NDI0LWU0YzQwMjgwOGI5ZGM1YjAucG5n)
![云函数调试](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8zMjQ3NDI0LTIyMWQ2NWY5YjE2NDQxYjkucG5n)
同时也可以通过本地环境调试云函数：在cloudfunctions下相应函数文件夹点击“本地调试”即可进行调试，相比于云端调试，本地调试更加便捷，也无需每次调试前上传云函数到服务器。但需要注意的是：请在云函数目录下执行```npm install```完成相关类库安装，然后才能进行调试。
![云函数调试](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8zMjQ3NDI0LTY4NmMzYmFlYjdmYWNlNDAucG5n)

### 5. 添加小程序页面
小程序的每个页面都包含四个文件：```.js```、```.json```、```.wxml```、```wxss```。js负责程序逻辑、json配置页面参数、wxml定义页面结构、wxss定义页面样式。这就相当于将HTML页面拆分为```.html```、```.css```、```.js```。
由于小程序是运行在微信内的webview环境，因此其语法与html有所不同，可以参考官方文档：[传送门](https://developers.weixin.qq.com/miniprogram/dev/reference/)
，为了方便页面构建，本文引入了一个第三方类库：[Vant](https://youzan.github.io/vant-weapp)，其提供了精美的界面元素，开箱即用，详细使用方法可以参见vant官方文档。
最终小程序主界面如下所示：
![小程序界面](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8zMjQ3NDI0LWNkZmQ2YzRhNDQ0YTBiN2QucG5n)
其对应的代码如下：

页面结构
```html
<!--index.wxml-->
  <view class='head_img'>
    <van-cell-group custom-class="cell_group">
    <van-field
      custom-class="cell_filed"
      value="{{ sciname }}"
      placeholder="期刊名称/首字母/缩写/ISSN"
      border="{{ false }}"
      focus="true"
      bind:change="onValueChange"
    />
  </van-cell-group>
  </view>
<view class="container">
  <view class="btn-area">
  <van-button type="info" size="large" round="true" bind:click="onClickQuery" loading="{{isQuery}}">查询</van-button>
  </view>
  <view wx:if="{{sci.length>0}}">
    <van-cell-group title="共找到{{sci.length}}本期刊">
      <view wx:for="{{sci}}"wx:for-index="idx" wx:for-item="item" wx:key="idx">
          <van-cell title="{{item.sciname}}" 
          value="{{item.if}}"  border="false" 
          title-width="80%"
          is-link link-type="navigateTo"
          url="/pages/detail/index?id={{idx}}"/>
      </view>
    </van-cell-group>
  </view>
</view>
```

页面逻辑：
```javascript
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
  },
//省略部分代码
})
```
按照同样的方式，我又添加了详情页，对于每一本期刊的详细信息进行展示。

## 部署
### 1. 上传项目文件
首先对于每个云函数，都要右键，点击“上传并部署：云端安装依赖”（当然上传并部署所有文件也可以）。接着点击IDE右上角的上传，填写版本信息，即可完成上传。

登录到微信公众平台的管理界面，切换到版本管理，我们便可以看到已经提交的版本。
![小程序审核](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8zMjQ3NDI0LWI0NjQ5ZTAyMThjZGJmZjEucG5n)
### 2. 填写小程序信息
在管理界面首页写着小程序发布流程，我们需要先补充小程序的基本信息，如名称、图标、描述等，当小程序信息。微信官方一般会在7日之内完成审核，我新注册的小程序审核用了两天时间。
### 3. 提交审核
审核完成之后，即可提交审核。切换到版本管理界面，对刚刚上传的版本提交审核，注明版本信息即可。审核也需要几天的时间。

### 结语
由于已经有过一次开发经验，本次的注册和编码工作只用了一个下午，但程序审核确实十分的耗时，需要耐心的等待。

本程序也发布在github上了：[传送门](https://github.com/csuhan/sciquery)
