$(function() {

	//出现浮动层
	$('.transaction-password').click(function() {
		$(".fl-shadow").show();
	})

	//关闭浮动
	$(".close").click(function() {
		$(".fl-shadow").hide();
		$(".pwd-box li").removeClass("pwd-invisible");
		$(".pwd-box li").attr("data", "");
		i = 0;
	});

	queryBackList();

})

var liHtml = '';

function queryBackList() {
	console.log($('.shadow-content ul li'));
	var ulLength = $('.shadow-content ul li').length;
	console.log(ulLength)
	if(ulLength == 2) {
		$('.shadow-content ul').css('padding-bottom', '3.5rem')
	}

	var backCardName = '建设银行';
	liHtml += '<li><div class="item-logo add-bc fl"></div><div class="item-value fl">' + backCardName + '</div><div class="item-operate fr"></div></li>'

	$('.shadow-content ul li').eq(0).after(liHtml);

	$('.shadow-content ul li').click(function() {
		console.log('你选择了' + $(this).find('.item-value').html());
		$(this).find('.item-operate').addClass('choice');
		$(this).siblings('li').find('.item-operate').removeClass('choice');
	})
}