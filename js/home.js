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
					$("#showPop").unbind().bind('touchstart', function() {
						$("#popover").toggle();
					});

					$(".table-view").find("li").each(function(index, ele) {
						$(this).unbind().bind("touchstart", function() {
							$("#iSlider-wrapper").hide();
							$("#pullrefresh").hide();
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
															load.done();
															//加入css动画


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
																	//bounceInLeft animated infinite

																},
																onslideend: function(idx) {
																	/*alert(1111);*/
																},
																onslidechange: function(idx) {
																	$("#login2").find(".lg2_cont").hide();
																	$("#login4").find(".lg4bg").hide();
																	$("#login5").find(".lg5an1").hide();
																	setTimeout(_load_animate_cavans(idx), 1000);
																}
															});
															/*var $animate = $('#login1').find(".ani_ct1");
															$animate.addClass('bounceInLeft animated');
															setTimeout(function() {
																$animate.removeClass('bounceInLeft animated');
															}, 1000);*/
															setTimeout(_load_animate_cavans(0), 1000);


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
			$("#pullrefresh").hide();
			$("#back").show();

			$("#back").css("visibility", "visible").unbind().bind("touchstart", function() {
				$(".Stepcont").hide().eq(index).hide();
				$("#pullrefresh").hide();
				$("#iSlider-wrapper").show();
				$("#back").hide();

			});

			// zhou         _load_insidePage_animate_cavans()
			//这个逻辑 判断模块元素是否加载过模板[如果加载过,那么只要进行显示隐藏控制;如果没有,那么加载]
			if ($(".Stepcont").eq(index).html() != "") {
				$(".Stepcont").hide().eq(index).show();
				$("body").css("overflow", "auto");
				load.done();
				_load_insidePage_animate_cavans(index);
			} else {
				//上拉加载模板特殊模块
				if (index == 0) {
					$(".Stepcont").hide();
					$("#pullrefresh").show();
					Rose.ajax.getJson("json/news.json", '', function(json, status) {
						var intr = false;
						var newsLen = json.news.length;
						var count = 0;
						mui.init({
							pullRefresh: {
								container: '#pullrefresh',
								up: {
									contentrefresh: '正在加载...',
									callback: pullupRefresh
								}
							}
						});

						var count = 0;
						var change = 0;

						/**
						 * 上拉加载具体业务实现
						 */
						function pullupRefresh() {
							setTimeout(function() {
								var table = document.body.querySelector('.mui-table-view');
								var cells = document.body.querySelectorAll('.mui-table-view-cell');
								if (!change) {
									change++;
									$(table).append('<div class="titile"><img src="img/home/green-line.png" class="section2-line "><p class="title-one">新闻中心</p><p class="title-two ">NEWS CENTER</p></div><div id="pullImg"><img src="img/home/up.png" class="up-img"><p class="lg1_ct5">上拉更精彩</p></div>');
								}
								for (var i = cells.length, len = i + 3; i < len; i++) {

									if (count < newsLen) {
										var html = '<div class="new_ct"><div class="new_left"><img src="img/homedesc/com/ro.png" class="new_img"><img src="img/homedesc/com/vline.png" class="new_img1">' + '<span class="new_year">' + json.news[count].month + '</span>' + '<span class="new_day">' + json.news[count].day + '</span></div><div class="new_right">' + '<p class="news_t">' + json.news[count].titile + '</p>' + '<p class="news_day">' + json.news[count].from + '</p>' + '<p class="news">' + json.news[count].cont + '</p>' + '<a class="readAll" href="' + json.news[count].url + '">阅读全文</a></div></div>';
										$(table).append(html);
										intr = false;
										if (count == newsLen - 1)
											intr = true;

									} else {
										intr = true;
									}
									count++;
								}

								if (intr)
									$("#pullImg").hide();
								mui('#pullrefresh').pullRefresh().endPullupToRefresh((intr)); //参数为true代表没有更多数据了。	
								if (change==1) {
									_load_insidePage_animate_cavans(index);
									change++;
								}
							}, 1500);
						}
						if (mui.os.plus) {
							mui.plusReady(function() {
								setTimeout(function() {
									mui('#pullrefresh').pullRefresh().pullupLoading();
								}, 1000);

							});
						} else {
							mui.ready(function() {
								mui('#pullrefresh').pullRefresh().pullupLoading();
							});
						}
						$("#pullrefresh").show();
						
						load.done();

					});



				} else {

					var htmlStr = "tpl/homepage-desc-cont" + index + ".tpl";

					Rose.ajax.getHtml(htmlStr, function(html, status) {
						if (status) {
							var template1 = Handlebars.compile(html);
							$(".Stepcont").hide().eq(index).html(template1(index)).show();
							$("body").css("overflow", "auto");
							_load_insidePage_animate_cavans(index);
							load.done();
						};
					});
				}

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

/**
 * [_load_animate_cavans description]
 * @AuthorHTL                                xianfei
 * @DateTime    2016-07-01T14:34:25+0800
 * @description [description]	  滑动首页的时候定义动画效果
 * @param       {[type]}                 idx [description]
 * @return      {[type]}                     [description]
 */
function _load_animate_cavans(idx) {

	switch (Number(idx)) {
		case 0:
			{
				var $footer = $("#login1").find(".footer_up");
				var $animate = $('#login1').find(".ani_ct1");
				$footer.addClass('bounceInUp animated infinite');
				setTimeout(function() {
					$footer.removeClass('bounceInUp animated infinite');
				}, 1000000);
				$animate.addClass('bounceInLeft animated');
				setTimeout(function() {
					$animate.removeClass('bounceInLeft animated');
				}, 2000);
				break;
			};

		case 1:
			{
				var $cont = $("#login2").find(".titile");
				var $footer = $('#login2').find(".footer_up");
				var $img = $("#login2").find(".lg2_ani_ct1");
				$cont.addClass('bounceInLeft animated');
				setTimeout(function() {
					$cont.removeClass('bounceInLeft animated');
				}, 1000);
				$footer.addClass('bounceInUp animated infinite');
				setTimeout(function() {
					$footer.removeClass('bounceInUp animated infinite');
				}, 1000000);
				setTimeout(function() {
					$("#login2").find(".lg2_cont").show();
					$img.addClass('rotateIn animated');
					setTimeout(function() {
						$img.removeClass('rotateIn animated');
					}, 1000);
				}, 500);

				break;
			};
		case 2:
			{
				var $head = $("#login3").find(".lg3_ani_ct1");
				$head.addClass('rotateInUpRight animated');
				setTimeout(function() {
					$head.removeClass('rotateInUpRight animated');
				}, 1000);

				var $footer = $('#login3').find(".footer_up");
				$footer.addClass('bounceInUp animated infinite');
				setTimeout(function() {
					$footer.removeClass('bounceInUp animated infinite');
				}, 1000000);
				break;
			};
		case 3:
			{
				var $head = $('#login4').find(".titile");
				$head.addClass('bounceInLeft animated');
				setTimeout(function() {
					$head.removeClass('bounceInLeft animated');
				}, 1000);

				var $footer = $('#login4').find(".footer_up");
				$footer.addClass('bounceInUp animated infinite');
				setTimeout(function() {
					$footer.removeClass('bounceInUp animated infinite');
				}, 1000000);
				setTimeout(function() {
					var $img = $('#login4').find(".lg4bg").show();
					$img.addClass('bounceInDown animated');
					setTimeout(function() {
						$img.removeClass('bounceInDown animated');
					}, 1000);
				}, 500);
				break;
			};
		case 4:
			{
				var $head = $('#login5').find(".titile");
				$head.addClass('bounceInLeft animated');
				setTimeout(function() {
					$head.removeClass('bounceInLeft animated');
				}, 1000);
				var $footer = $('#login5').find(".footer_up");
				$footer.addClass('bounceInUp animated infinite');
				setTimeout(function() {
					$footer.removeClass('bounceInUp animated infinite');
				}, 1000000);
				setTimeout(function() {
					var $img = $("#login5").find(".lg5an1").show();
					$img.addClass('flip animated');
					setTimeout(function() {
						$img.removeClass('flip animated');
					}, 1000);
				}, 500);
				break;
			};
		default:
			{
				break;
			};
	}



}

/**
 * [_load_insidePage_animate_cavans description]
 * @AuthorHTL                                  xianfei
 * @DateTime    2016-07-04T10:03:00+0800
 * @description [ 切换hg内页的时候定义动画效果]   
 * @param       {[type]}                 index [description]
 * @return      {[type]}                       [description]
 */
function _load_insidePage_animate_cavans(idx) {
	switch (Number(idx)) {
		case 0:
			{
				var $head = $('#pullrefresh').find(".titile");
				$head.addClass('bounceInLeft animated');
				setTimeout(function() {
					$head.removeClass('bounceInLeft animated');
				}, 1000);

				var $footer = $("#pullImg");
				$footer.addClass('bounceInUp animated infinite');
				setTimeout(function() {
					$footer.removeClass('bounceInUp animated infinite');
				}, 1000000);

				var $cont = $("#pullrefresh").find(".new_ct");
				$cont.addClass('lightSpeedIn animated');
				setTimeout(function() {
					$cont.removeClass('lightSpeedIn animated');
				}, 1000);

				break;
			};

		case 1:
			{
				var $head = $('#STEP_1').find(".step1_ani");
				$head.addClass('bounceInLeft animated');
				setTimeout(function() {
					$head.removeClass('bounceInLeft animated');
				}, 1000);
				
				var $img = $("#STEP_1").find(".container");
				$img.addClass('rubberBand animated');
				setTimeout(function() {
					$img.removeClass('rubberBand animated');
				}, 1000);
				console.log(111111);
				break;
			};
		case 2:
			{
				console.log(222222);
				break;
			};
		case 3:
			{
				console.log(3333);


				break;
			};
		case 4:
			{
				console.log(444444);
				break;
			};
		default:
			{
				console.log(5555);
				break;
			};
	}

}