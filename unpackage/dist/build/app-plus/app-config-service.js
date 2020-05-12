
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/home/index","pages/login/login","pages/login/forget","pages/login/register","pages/login/agreeMent","pages/buycar/index","pages/sale/index","pages/evaluate/index","pages/mine/index","pages/mine/aboutUs","pages/address/index","pages/mine/information","pages/mine/signRecord","pages/search/search","pages/question/index","pages/question/questionDetail","pages/carDetail/index","pages/carDetail/barGain","pages/news/index","pages/news/newDetail","pages/buying/index","pages/buying/detail","pages/buying/publish","pages/message/index","pages/message/sendMessage","pages/carSource/index"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"抵押车出售信息平台_抵押车网_抵押车直卖_抵押车买卖安全交易信息平台_久久泰抵押车网","navigationBarBackgroundColor":"#BB271D","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#686868","selectedColor":"#BB271D","borderStyle":"white","backgroundColor":"#ffffff","list":[{"pagePath":"pages/home/index","iconPath":"static/image/tabbar/home.png","selectedIconPath":"static/image/tabbar/home-selected.png","text":"首页"},{"pagePath":"pages/buycar/index","iconPath":"static/image/tabbar/buycar.png","selectedIconPath":"static/image/tabbar/buycar-selected.png","text":"买车"},{"pagePath":"pages/sale/index","iconPath":"static/image/tabbar/sale.png","selectedIconPath":"static/image/tabbar/sale-selected.png","text":"卖车"},{"pagePath":"pages/evaluate/index","iconPath":"static/image/tabbar/evaluate.png","selectedIconPath":"static/image/tabbar/evaluate-selected.png","text":"估价"},{"pagePath":"pages/mine/index","iconPath":"static/image/tabbar/mine.png","selectedIconPath":"static/image/tabbar/mine-selected.png","text":"我的"}]},"renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"mortgage-car","compilerVersion":"2.6.16","entryPagePath":"pages/home/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/home/index","meta":{"isQuit":true,"isTabBar":true},"window":{"titleNView":{"searchInput":{"backgroundColor":"#fff","borderRadius":"6px","placeholder":"搜索品牌货车型","disabled":true},"buttons":[{"text":"全国","float":"left","fontSize":"12px","width":"30px"}]}}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"会员登录"}},{"path":"/pages/login/forget","meta":{},"window":{"navigationBarTitleText":"找回密码"}},{"path":"/pages/login/register","meta":{},"window":{"navigationBarTitleText":"会员注册"}},{"path":"/pages/login/agreeMent","meta":{},"window":{"navigationBarTitleText":"注册协议"}},{"path":"/pages/buycar/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"买车"}},{"path":"/pages/sale/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"卖车"}},{"path":"/pages/evaluate/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"估价"}},{"path":"/pages/mine/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"会员中心"}},{"path":"/pages/mine/aboutUs","meta":{},"window":{"navigationBarTitleText":"关于我们"}},{"path":"/pages/address/index","meta":{},"window":{"navigationBarTitleText":"选择城市"}},{"path":"/pages/mine/information","meta":{},"window":{"navigationBarTitleText":"信息管理","titleNView":{"buttons":[{"text":"退出","float":"right","fontSize":"14px","width":"40px"}]}}},{"path":"/pages/mine/signRecord","meta":{},"window":{"navigationBarTitleText":"签到记录"}},{"path":"/pages/search/search","meta":{},"window":{"navigationBarTitleText":"车源搜索"}},{"path":"/pages/question/index","meta":{},"window":{"navigationBarTitleText":"问答"}},{"path":"/pages/question/questionDetail","meta":{},"window":{"navigationBarTitleText":"题目详情"}},{"path":"/pages/carDetail/index","meta":{},"window":{"navigationBarTitleText":"详情","titleNView":{"buttons":[{"type":"menu","float":"right"}]}}},{"path":"/pages/carDetail/barGain","meta":{},"window":{"navigationBarTitleText":"立即砍价"}},{"path":"/pages/news/index","meta":{},"window":{"navigationBarTitleText":"新闻"}},{"path":"/pages/news/newDetail","meta":{},"window":{"navigationBarTitleText":"新闻详情","titleNView":{"buttons":[{"type":"menu","float":"right"}]}}},{"path":"/pages/buying/index","meta":{},"window":{"navigationBarTitleText":"求购信息","titleNView":{"buttons":[{"text":"发布","float":"right","fontSize":"14px","width":"40px"}]}}},{"path":"/pages/buying/detail","meta":{},"window":{"navigationBarTitleText":"详情"}},{"path":"/pages/buying/publish","meta":{},"window":{"navigationBarTitleText":"求购发布","titleNView":{"buttons":[{"text":"取消","float":"right","fontSize":"14px","width":"40px"}]}}},{"path":"/pages/message/index","meta":{},"window":{"navigationBarTitleText":"站内信件","titleNView":{"buttons":[{"text":"发信","float":"right","fontSize":"14px","width":"40px"}]}}},{"path":"/pages/message/sendMessage","meta":{},"window":{"navigationBarTitleText":"发送信件","titleNView":{"buttons":[{"text":"取消","float":"right","fontSize":"14px","width":"40px"}]}}},{"path":"/pages/carSource/index","meta":{},"window":{"navigationBarTitleText":"车源管理","titleNView":{"buttons":[{"text":"发布","float":"right","fontSize":"14px","width":"40px"}]}}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});