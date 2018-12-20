$( function () {
	$( '.nav_left' ).on( 'click', function () {
		location.href = '#closeWindow'
//		setTimeout( function () {
//			location.href = '#closeWindow'
//		}, 500 );
	} );

	$( '.nav_right' ).on( 'click', function () {
		window.location.reload();
	} );
} )

function GetString( name ) {
	//构造一个含有目标参数的正则表达式的对象
	var reg = new RegExp( "(^|&)" + name + "=([^&]*)(&|$)" );
	//匹配目标参数
	var url = window.location.search.substr( 1 ).match( reg );
	//返回参数值
	if ( url != null )
		return decodeURI( url[ 2 ] );
	return null;
}

/** 
 * 获取指定URL的参数值 
 * @param url  指定的URL地址 
 * @param name 参数名称 
 * @return 参数值 
 */
function getUrlParam( url, name ) {
	var pattern = new RegExp( "[?&]" + name + "\=([^&]+)", "g" );
	var matcher = pattern.exec( url );
	var items = null;
	if ( null != matcher ) {
		try {
			items = decodeURIComponent( decodeURIComponent( matcher[ 2 ] ) );
		} catch ( e ) {
			try {
				items = decodeURIComponent( matcher[ 2 ] );
			} catch ( e ) {
				items = matcher[ 2 ];
			}
		}
	}
	return items;
}

/* 封装ajax函数
 * @param {string}opt.type http连接的方式，包括POST和GET两种方式，默认使用GET
 * @param {string}opt.url 发送请求的url
 * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
 * @param {object}opt.data 发送的参数，格式为对象类型
 * @param {function}opt.success ajax发送并接收成功调用的回调函数
 */
function ajax( opt ) {　　
	opt = opt || {};
	var type = opt.type || 'GET';　　
	type = type.toUpperCase() || 'GET';　　
	var url = opt.url || '';　　
	var async = opt.async || true;　　
	var data = opt.data || null;　　
	var success = opt.success || function () {};　　
	var fail = opt.fail || function () {};　　

	var xmlHttp = null;　

	//第一步:创建异步对象　　
	if ( XMLHttpRequest ) { //非IE内核浏览器创建传输对象的方式，w3c标准下　　
		xmlHttp = new XMLHttpRequest();　　
	} else if ( ActiveXObject ) { //IE情况下,为ie内核创建传输对象的方式　
		xmlHttp = new ActiveXObject( "Microsoft.XMLHTTP" );　　

	}　

	//第二步:连接 和 发送   设置属性(请求头,请求行),
	if ( type === 'POST' ) {　　　　
		xmlHttp.open( type, url, async );　　
		//设置表单提交时的内容类型　　
		xmlHttp.setRequestHeader( 'Content-Type',
			'application/x-www-form-urlencoded;charset=utf-8' );　　　　
		xmlHttp.send( dataStr );　　
	} else if ( type == "GET" ) {　　　
		xmlHttp.open( type, url + '?' + dataStr, async );　　　　
		xmlHttp.send( null );　　
	}　　　

	// 格式化参数
	var params = [];　　
	for ( var key in data ) {　　　　
		params.push( key + '=' + data[ key ] );　　
	}　　
	var dataStr = params.join( '&' );　

	//第三步:接收
	if ( xmlHttp != null && xmlHttp != undefined ) {
		//处理请求的方法 
		if ( type != 'POST' && type != 'GET' ) {
			//			console.log( type );
		} else {
			//			console.log( "请求的方法，只能是POST或者GET" );
		}
		//处理请求的URL地址
		if ( url == null || url == undefined ) {
			//			console.log( "必须要有URL地址，否则找不到资源" );
		} else {
			//			console.log( url );
		}

		//注册状态改变事件
		xmlHttp.onreadystatechange = function () {
			//判断状态&请求是否成功并使用数据
			/**
			 * 
			 *readyState：请求的状态，返回的是状态码（0 - 4）：
			 *0（未初始化）open还没有调用　
			 *1（载入）已经调用了send（）正在发送请求
			 *2（载入完成）send方法已经完成  已经收到了全部的响应内容
			 *3（解析）正在解析响应内容、
			 *4（完成）响应内容解析完成  可以在客户端用
			 *
			 **/
			if ( xmlHttp.readyState == 4 ) {
				var value = xmlHttp.getResponseHeader( 'Content-Type' );
				var status = xmlHttp.status;
				var responseText = xmlHttp.responseText;
				var responseXML = xmlHttp.responseXML;

				if ( status >= 200 && status < 300 ) {
					//服务器数据正确返回时，其回调函数是否存在，若存在则用该回调方法处理服务器返回的数据
					if ( success == null || success == undefined ) {
						console.log( "没有设置处理数据正确返回的方法" );
						console.log( "返回的数据：" + responseText );
					} else {
						success && success( $.parseJSON( responseText ), xmlHttp.responseXML );
					}

				}
				else {
					//服务器数据返回失败时，其回调函数是否存在，若存在则用该回调方法处理服务器返回的错误数据
					if ( fail == null || fail == undefined ) {
						console.log( "没有设置处理数据返回失败的方法" );
						console.log( "http的响应码：" + status + "相应码的文本信息：" +
							xmlHttp.statusText );
					} else {
						fail( status, xmlHttp.statusText );
					}

				}
			}
		};

	} else {
		console.log( "XMLHttpRequest对象创建失败！" );
	}

}
// 使用示例
//ajax({
//	method: 'POST',// type ---> 请求方式
//	url: 'test.php',// url---->地址
//  async : true,   // async----> 同步：false，异步：true
//	data: {//传入信息
//		name1: 'value1',
//		name2: 'value2'
//	},
//	success: function(response) {//返回接受信息
//		// codes here
//	},
//});

/**
弹出iframe页面(iframe后面会添加灰色蒙版)
**/
function showIframe( url, w, h ) {
	//添加iframe
	var if_w = w;
	var if_h = h;
	//allowTransparency='true' 设置背景透明
	$( "<iframe width='" + if_w + "' height='" + if_h +
		"' class='YuFrame1' style='position:absolute;z-index:4;'  frameborder='no' marginheight='0' marginwidth='0' allowTransparency='true' allowfullscreen></iframe>"
	).prependTo( '.container' );
	//滚动条距顶部的距离
	var st = document.documentElement.scrollTop || document.body.scrollTop;
	//滚动条距左边的距离
	var sl = document.documentElement.scrollLeft || document.body.scrollLeft;
	var ch = document.documentElement.clientHeight; //屏幕的高度
	var cw = document.documentElement.clientWidth; //屏幕的宽度

	$( ".YuFrame1" ).attr( "src", url )

	//添加背景遮罩
	$(
		"<div class='YuFrame1Bg'/>"
	).prependTo( 'body' );
	var bgWidth = Math.max( $( "body" ).width(), cw );
	var bgHeight = Math.max( $( "body" ).height(), ch );
	$( ".YuFrame1Bg" ).css( {
		width: bgWidth,
		height: bgHeight
	} );

}