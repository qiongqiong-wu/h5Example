$(function() {
	getBottomNavigationBar();
});

//color  未选择时 底部导航文字的颜色
//selectedColor  选择时 底部导航文字的颜色
//borderStyle  底部导航边框的样色（注意 这里如果没有写入样式 会导致 导航框上边框会出现默认的浅灰色线条）
//selectedIconPath 选中时 图标路径
//iconPath 未选择时 图标路径
//pagePath 页面访问地址
//text  导航图标下方文字

var tabBars_url =
	'json/tabBar.json';
var tabBars = {};
var tabBar = {};
var color = '';
var selectedColor = '';
var borderStyle = '';
var iconPath = '';
var selectedIconPath = '';
var pagePath = '';
var txt = '';
var html = '';

var iconPathLists = [];
var selectedIconPathLists = [];

var listImg = [];

function getBottomNavigationBar() {
	$.ajax({
		url: tabBars_url,
		success: function(data) {
			tabBars = data.tabBar;
			tabBar = tabBars.list;

			color = tabBars.color;
			selectedColor = tabBars.selectedColor;
			borderStyle = tabBars.borderStyle;

			if(tabBar) {
				$.each(tabBar, function(item, index) {
					iconPath = index.iconPath;
					pagePath = index.pagePath;
					txt = index.txt;

					iconPathLists.push({
						iconPath: index.iconPath
					})

					selectedIconPathLists.push({
						selectedIconPath: index.selectedIconPath
					})

					html += '<li><img src=' + iconPath + '/>' +
						'<p>' + txt +
						'</p>' +
						'</li>';
				})
			} else {
				$('.content').html('暂无数据');
				$('.footer').hide();
			}

			$('ul').html(html);

			formatTab();
		},
		error: function(err) {
			$('.content').html('暂无数据');
			$('.footer').hide();
		}
	});

}

function formatTab() {
	//设置底部导航栏文字默认颜色及图片
	$('li').css({
		'border-right': '1px',
		'border-right-color': borderStyle,
		'border-right-style': 'solid'
	});
	$('li').last().css('border-right', '');
	$('li').find('p').css('color', color);
	$('li').first().find('p').css('color', selectedColor);
	$('li').first().find('img').attr('src', selectedIconPathLists[0].selectedIconPath);

	$.each(iconPathLists, function(key, value) {
		var img = value.iconPath;
		console.log(iconPathLists[0].iconPath)
		$('ul li').each(function(index) {})
	});

	$('li').eq(0).addClass('activ');

	$("ul  li").click(
		function() {
			/*li标签的顺序和div的顺序是对应的，获取索引*/
			var index = $(this).index();

			//头部标题
			$('.log-title').html($(this).find('p').html());
			//内容
			$('.content').html($(this).find('p').html());

			/*底部导航栏文字颜色*/
			$(this).find('p').css('color', selectedColor);
			$(this).siblings("li").find('p').css('color', color);

			listImg = $('ul li img');

			/*底部导航栏图标*/
			initimg(); //初始化img

			switchImg(index); //改变图片

		});
}

function initimg() {
	listImg.eq(0).attr("src", iconPathLists[0].iconPath);
	listImg.eq(1).attr("src", iconPathLists[1].iconPath);
	listImg.eq(2).attr("src", iconPathLists[2].iconPath);
	listImg.eq(3).attr("src", iconPathLists[3].iconPath);

	//	listImg.eq(index).attr("src", iconPathLists[index].iconPath);

}

function switchImg(index) {
	listImg.eq(index).attr("src", selectedIconPathLists[index].selectedIconPath);
}