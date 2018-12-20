$(function() {
	$('.shadow-content li').click(function() {
		$(this).addClass('active').siblings('li').removeClass('active');
		if($(this).index() == 0) {
			$('.select-month').hide();
		}

		if($(this).index() == 1) {
			$('.select-month').show();
		}
	})
	makeYear();
	makeMonth();

	$('.shadow-content .select-year li').click(function() {
		$(this).addClass('select').siblings('li').removeClass('select');
		console.log('年份:' + $(this).html())
		$('.ss').html($(this).html())
	})

	$('.shadow-content .select-month li').click(function() {
		$(this).addClass('select').siblings('li').removeClass('select');
		var m = $(this).html().substr(0, $(this).html().length - 1);
		$('.ss').html(m + '/' +$('.ss').html())
		$(".fl-shadow").hide();
	})

	//关闭浮动
	$(".cancel").click(function() {
		$(".fl-shadow").hide();
	});
})

var yearHtml = '';
var monthHtml = '';

function makeYear() {
	var endYear = new Date().getFullYear(); // 获取当前年份
	for(var i = 1993; i <= endYear; i++) {
		yearHtml += '<li class="year">' + i + '</li>'
		$('.select-year').html(yearHtml);
	}
}

function makeMonth() {
	for(var i = 1; i <= 12; i++) {
		monthHtml += '<li class="month">' + i + '月' + '</li>'
		$('.select-month').html(monthHtml);
	}
}