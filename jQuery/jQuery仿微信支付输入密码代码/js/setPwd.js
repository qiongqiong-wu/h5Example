$(function() {
	//出现浮动层
	$(".btn-panyment").click(function() {
		$(".fl-shadow").show();
	});
	//关闭浮动
	$(".close").click(function() {
		$(".fl-shadow").hide();
		$(".pwd-box li").removeClass("pwd-invisible");
		$(".pwd-box li").attr("data", "");
		i = 0;
	});

	var i = 0;
	$(".numeric-keyboard li .zf-num").click(function() {
		if(i < 6) {
			$(".pwd-box li").eq(i).addClass("pwd-invisible");
			$(".pwd-box li").eq(i).attr("data", $(this).text());
			i++
			if(i == 6) {
				setTimeout(function() {
					var data = "";
					$(".pwd-box li").each(function() {
						data += $(this).attr("data");
					});
					alert("支付成功" + data);

					$(".fl-shadow").hide();
					$(".pwd-box li").removeClass("pwd-invisible");
					$(".pwd-box li").attr("data", "");
					i = 0;
				}, 100);
			};
		}
	});

	//删除
	$(".numeric-keyboard li .zf-del").click(function() {
		if(i > 0) {
			i--
			$(".pwd-box li").eq(i).removeClass("pwd-invisible");
			$(".pwd-box li").eq(i).attr("data", "");
		}
	});

});