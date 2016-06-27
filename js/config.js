
/**
 * [description]      seaJS 引用JS 配置路径
 * @AuthorHTL                                                xianfei
 * @DateTime  2016-06-23T08:34:33+0800
 */
var  basepath = "/hg_phone_xianfei_v2.1/";
var timeStamp = '$1?ver=' + new Date().getTime();
seajs.config({
  'map': [
		[ /^(.*\.(?:css|js))(.*)$/i,  timeStamp ]
  ],
  base: basepath,
  // 设置路径，方便跨目录调用
  paths: {
    //'phoneUI': '../../../../frame/lib/webui/1.0.0/phone/js'
  },
  // 设置别名，方便调用
  alias:  {
	 'rose': 'frame/lib/Rose/1.0.0/Rose.src'
  }
});