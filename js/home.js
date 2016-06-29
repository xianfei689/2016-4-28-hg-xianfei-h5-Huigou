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
			initHandlebarsHelpers();
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
					$("#showPop").unbind().bind('click', function() {
						$("#popover").toggle();
					});

					$(".table-view").find("li").each(function(index, ele) {
						$(this).unbind().bind("click", function() {
							$("#iSlider-wrapper").hide();
							$("#popover").slideUp();
							load.start();
							home._init_homedesc_loadcont(index);
						});
					});


				};
			});

			/**
			 * [description]
			 * @AuthorHTL                                     xianfei
			 * @DateTime    2016-06-28T14:24:50+0800
			 * @description [查询模板]
			 * @param       {[type]}                 html1    [description]
			 * @param       {[type]}                 status1) {				if      (status1) {					Rose.ajax.getHtml("tpl/index-cont2.tpl", function(html2, status2) {						if (status2) {							Rose.ajax.getHtml("tpl/index-cont3.tpl", function(html3, status3) {								if (status3) {									Rose.ajax.getHtml("tpl/index-cont4.tpl", function(html4, status4) {										if (status4) {											Rose.ajax.getHtml("tpl/index-cont5.tpl", function(html5, status5) {												if (status5) {													Rose.ajax.getHtml("tpl/index-cont5.tpl", function(html6, status6) {														if (status6) {															$("#JS_STEP_1").show( [description]
			 * @return      {[type]}                          [description]
			 */
			Rose.ajax.getHtml("tpl/index-cont1.tpl", function(html1, status1) {
				if (status1) {
					Rose.ajax.getHtml("tpl/index-cont2.tpl", function(html2, status2) {
						if (status2) {
							Rose.ajax.getHtml("tpl/index-cont3.tpl", function(html3, status3) {
								if (status3) {
									Rose.ajax.getHtml("tpl/index-cont4.tpl", function(html4, status4) {
										if (status4) {
											Rose.ajax.getHtml("tpl/index-cont5.tpl", function(html5, status5) {
												if (status5) {
													Rose.ajax.getHtml("tpl/index-cont6.tpl", function(html6, status6) {
														if (status6) {
															var template1 = Handlebars.compile(html2);
															html2 = template1(6);

															var template2 = Handlebars.compile(html4);
															html4 = template2(7);

															var template3 = Handlebars.compile(html5);
															html5 = template3(8);


															$("#JS_STEP_1").show();
															var list = [{
																content: html1
															}, {
																content: html2
															}, {
																content: html3
															}, {
																content: html4
															}, {
																content: html5
															}, {
																content: html6
															}];

															var S = new iSlider({
																dom: document.getElementById('iSlider-wrapper'),
																data: list,
																isAutoplay: 0,
																isLooping: 1,
																isOverspread: 1,
																animateTime: 800,
																isVertical: true,
																onslide: function() {
																	if (!$("#popover").is(":hidden")) {
																		$("#popover").slideUp();
																	}

																}
															});

															load.done();

														};
													});

												};
											});

										};
									});

								};
							});

						};
					});

				};
			});



		},
		/**
		 * [_init_homedesc_loadcont description]
		 * @AuthorHTL                                  xianfei
		 * @DateTime    2016-06-29T09:46:03+0800
		 * @description  加载子页面的  方法
		 * @param       {[type]}                 index [description]
		 * @return      {[type]}                       [description]
		 */
		_init_homedesc_loadcont: function(index) {
			index == undefined ? (index = 0) : ('');

			//这个逻辑 判断模块元素是否加载过模板[如果加载过,那么只要进行显示隐藏控制;如果没有,那么加载]
			if ($(".Stepcont").eq(index).html() != "") {
				$(".Stepcont").hide().eq(index).show();
				$("body").css("overflow","auto");
				load.done();
			} else {
				var htmlStr = "tpl/homepage-desc-cont" + index + ".tpl";
				
				Rose.ajax.getHtml(htmlStr, function(html, status) {
					if (status) {
						var template1 = Handlebars.compile(html);
						$(".Stepcont").hide().eq(index).html(template1(index)).show();
						$("body").css("overflow","auto");
						load.done();
					};
				});
			}



		}

	};


	module.exports = home;
});



/*common  method start*/

function initHandlebarsHelpers() {
	/**
	 * [description]
	 * @AuthorHTL                                 xianfei
	 * @DateTime    2016-06-23T16:00:53+0800
	 * @description [description]   各个页面的标题  模板处理
	 * @param       {[type]}                 data [description]
	 * @param       {String}                 fn)  {		var       str [description]
	 * @return      {[type]}                      [description]
	 */
	Handlebars.registerHelper('getHomeTitle', function(data, fn) {
		// <img src="img/icon/green-line.png" class="section2-line "><p class="title-one ">产品优势</p><p class="title-two ">PRODUCT ADVANTAGE</p>
		var info = getTitleInfo(Number(data));
		var str = '<img src="img/home/green-line.png" class="section2-line "><p class="title-one">';
		str += info[0];
		str += '</p><p class="title-two ">';
		str += info[1] + '</p>';

		return new Handlebars.SafeString(str);
	});


}

/**
 * [getTitleInfo description]
 * @AuthorHTL                                 xianfei
 * @DateTime    2016-06-28T14:30:42+0800
 * @description  获取标题的公共方法
 * @param       {[type]}                 data [description]
 * @return      {[type]}                      [description]
 */
function getTitleInfo(data) {
	switch (data) {
		case 0:
			return ["新闻中心", "NEWS CENTER"];
			break;
		case 1:
			return ["关于我们", "ABOUT US"];
			break;
		case 2:
			return ["加入我们", "JOIN US"];
			break;
		case 3:
			return ["产品分类", "PRODUCT CATEGORIES"];
			break;
		case 4:
			return ["成功案例", "SUCCESSFUL CASES"];
			break;
		case 5:
			return ["详细介绍", "DETAILED INTRODUCTION"];
			break;
		case 6:
			return ["全方位的积分运营服务", "A FULL RANGE OF INTEGRAL OPERATI"];
			break;
		case 7:
			return ["产品优势", "PRODUCT ADVANTAGE"];
			break;
		case 8:
			return ["合作平台", "COOPERATION PLATFORM"];
			break;
		default:
	}
}
/*common  method end*/