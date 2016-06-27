;
/**
 * [description]
 * @AuthorHTL                                                xianfei
 * @DateTime  2016-06-23T08:34:33+0800
 * @param     {[type]}                 require               [description]
 * @param     {[type]}                 exports               [description]
 * @param     {Object}                 module)               {		var       homedesc                                          [description]
 * @param     {[type]}                 _init_homedesc_login: function()    {			console.log(1212121);		}	};	module.exports [description]
 * @return    {[type]}                                       [description]
 */
define(function(require, exports, module) {


	var home = {
		init: function() {
			//初始化HandleBar是帮助类
			//initHandlebarsHelpers();
			//homedesc  主要加载js
			home._init_homedesc_login();
		},
		_init_homedesc_login: function() {
			load = new AILoad({
				callback: function() {},
				model: true
			});
			load.setContent("正在拼命加载中...");
			load.start();

			Rose.ajax.getHtml("tpl/head.tpl", function(html, status) {
				if (status) {
					var template = Handlebars.compile(html);
					$("#JS_STEP_1").html(template());
					load.done();

					$("#topPopover").unbind().bind("click",function(){
						$("#topPopover").show();
					});

				};
			});



		},


	};


	module.exports = home;
});



/*common  method start*/


/*common  method end*/