$(function() {
	var itemIndex = 0;
	var tab1LoadEnd = false;
	var tab2LoadEnd = false;
	// tab
	$('.tab .item').on('click', function() {
		var $this = $(this);
		itemIndex = $this.index();
		$this.addClass('cur').siblings('.item').removeClass('cur');
		$('.lists').eq(itemIndex).show().siblings('.lists').hide();

		// 如果选中菜单一
		if(itemIndex == '0') {
			// 如果数据没有加载完
			if(!tab1LoadEnd) {
				// 解锁
				dropload.unlock();
				dropload.noData(false);
			} else {
				// 锁定
				dropload.lock('down');
				dropload.noData();
			}
			// 如果选中菜单二
		} else if(itemIndex == '1') {
			if(!tab2LoadEnd) {
				// 解锁
				dropload.unlock();
				dropload.noData(false);
			} else {
				// 锁定
				dropload.lock('down');
				dropload.noData();
			}
		}
		// 重置
		dropload.resetload();
	});

	var counter = 0;
	// 每页展示4个
	var num = 4;
	var pageStart = 0,
		pageEnd = 0;

	// dropload
	var dropload = $('.content').dropload({
		scrollArea: window,
		loadDownFn: function(me) {
			// 加载菜单一的数据
			if(itemIndex == '0') {
				$.ajax({
					type: 'GET',
					url: 'json/more.json',
					dataType: 'json',
					success: function(data) {
						var result = '';
						counter++;
						pageEnd = num * counter;
						pageStart = pageEnd - num;

						if(pageStart <= data.lists.length) {
							for(var i = pageStart; i < pageEnd; i++) {
								result += '<a class="item opacity" href="' + data.lists[i].link + '">' +
									'<img src="' + data.lists[i].pic + '" alt="">' +
									'<h3>' + data.lists[i].title + '</h3>' +
									'<span class="date">' + data.lists[i].date + '</span>' +
									'</a>';
								if((i + 1) >= data.lists.length) {
									// 数据加载完
									tab1LoadEnd = true;
									// 锁定
									me.lock();
									// 无数据
									me.noData();
									break;
								}
							}
							// 为了测试，延迟1秒加载
							setTimeout(function() {
								$('.lists').eq(0).append(result);
								// 每次数据加载完，必须重置
								me.resetload();
							}, 1000);
						}
					},
					error: function(xhr, type) {
						alert('Ajax error!');
						// 即使加载出错，也得重置
						me.resetload();
					}
				});
				// 加载菜单二的数据
			} else if(itemIndex == '1') {
				$.ajax({
					type: 'GET',
					url: 'json/update.json',
					dataType: 'json',
					success: function(data) {
						var result = '';
						for(var i = 0; i < data.lists.length; i++) {
							result += '<a class="item opacity" href="' + data.lists[i].link + '">' +
								'<img src="' + data.lists[i].pic + '" alt="">' +
								'<h3>' + data.lists[i].title + '</h3>' +
								'<span class="date">' + data.lists[i].date + '</span>' +
								'</a>';
						}
						// 为了测试，延迟1秒加载
						setTimeout(function() {
							$('.lists').eq(1).append(result);
							// 每次数据加载完，必须重置
							me.resetload();
						}, 1000);
					},
					error: function(xhr, type) {
						alert('Ajax error!');
						// 即使加载出错，也得重置
						me.resetload();
					}
				});
			}
		}
	});
});