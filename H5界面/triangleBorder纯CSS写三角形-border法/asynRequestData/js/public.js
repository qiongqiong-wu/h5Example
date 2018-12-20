$( function () {
	$( '.nav_left' ).on( 'click', function () {
		history.back();
	} );
} );

$( window ).load( function () {
	$( ".loading" ).addClass( "loader-chanage" );
	$( ".loading" ).fadeOut( 300 )
} );

function getString( name ) {
	var reg = new RegExp( "(^|&)" + name + "=([^&]*)(&|$)" );
	var r = window.location.search.substr( 1 ).match( reg );
	if ( r != null ) {
		return unescape( url[ 2 ] );
	}
	return null;
}

function Toast( info ) {
	$( '.toast' ).show().children( "span" ).html( info );
	setTimeout( function () {
		$( '.toast' ).hide().children( "span" ).html( info );
	}, 2000 );
}

/* 封装ajax函数
 * @param {string}url 发送请求的url
 * @param {object}param 发送的参数，格式为对象类型
 *@param  {string}opt.type http连接的方式，包括POST和GET两种方式，默认使用GET
 * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
 * @param {function}callback ajax发送并接收成功调用的回调函数
 * @param {function}error ajax发送并接收失败调用的回调函数
 */
var imgUpload = {
	//ajax请求数据
	method: function ( murl, mdata, method, success ) {
		$.ajax( {
			type: method,
			url: murl,
			dataType: "json",
			data: mdata,
			timeout: 20000,
			success: function ( data ) {
				success ? success( data ) : function () {};
			},
			error: function ( data ) {
				console.log( data );
				alert( "请求失败" );
			},
		} );
	}
}

//调用
//imgUpload.method("url", "", "get", function(data) {
//	if(data.code == 0) {
//		alert(data);
//	} else {
//		alert("请求失败");
//	}

/* 封装ajax函数
 * @param {string}opt.type http连接的方式，包括POST和GET两种方式，默认使用GET
 * @param {string}opt.url 发送请求的url
 * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
 * @param {object}opt.data 发送的参数，格式为对象类型
 * @param {function}opt.success ajax发送并接收成功调用的回调函数
 */
function asyncAjax( obj ) {
	var xmlHttp; //保存xmlHttpRequest对象
	var headers = obj.headers || {
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
	};
	var type = obj.requestType; //保存请求方式
	var cache = obj.cache || false; //get时是否使用缓存,默认否
	var success = obj.success; //数据请求成功的回调方法
	var error = obj.error; //发生错误的回调方法
	var async = obj.async || false; //是否异步，默认否
	var data = []; //存储用户发来的数据
	var url = obj.url; //用户请求地址

	createXmlHttp(); //执行xmlHttp创建函数

	//创建xmlHttp失败
	if ( !xmlHttp ) {
		console.log( "创建xmlHttp对象失败啦！您的浏览器不支持xmlHttpRequest对象" );
	}

	try {
		//定义状态监听函数
		xmlHttp.onreadystatechange = function () {
			switch ( xmlHttp.readyState ) {
				case 1:
					console.log( "open() 方法已调用，但是 send() 方法未调用。请求还没有被发送。" );
					break;
				case 2:
					console.log( "Send() 方法已调用，HTTP 请求已发送到 Web 服务器。未接收到响应。" );
					break;
				case 3:
					console.log( "所有响应头部都已经接收到。响应体开始接收但未完成。" );
					break;
				case 4:
					if ( xmlHttp.status == 200 ) {
						console.log( "HTTP 响应已经完全接收。" );
						// xhr 判断数据是json格式还是xml格式
						var value = xmlHttp.getResponseHeader( 'Content-Type' );
						// 如果有 xml
						if ( value.indexOf( 'xml' ) != -1 ) {
							option.success( xmlHttp.responseXML );
						} else if ( value.indexOf( 'json' ) != -1 ) {
							// 如果是json数字据 那么 帮忙 把转换的操作也做了
							success( JSON.parse( xmlHttp.responseText ) ); //调用回调函数
						} else {
							success( xmlHttp.responseText );
						}
					}
					break;
				default:
					error( xmlHttp.statusText );
					break;
			}
		};

		//把用户传来的数据转换成字符串
		for ( var i in obj.data ) {
			data.push( i + '=' + obj.data[ i ] );
		}
		data = data.join( '&' );

		if ( type.toUpperCase() == 'GET' ) { //如果是get请求
			if ( cache == false ) { //如果get请求不使用缓存
				xmlHttp.open( 'get', url + '?' + data + '&random=' + Math.random(), async );
				xmlHttp.send( 'null' );
			} else { //如果get请求使用缓存
				xmlHttp.open( 'get', url + '?' + data, async );
				xmlHttp.send( 'null' );
			}
		} else if ( type.toUpperCase() == 'POST' ) //如果是post请求
		{
			xmlHttp.open( 'post', url, async );
			xmlHttp.setRequestHeader( "Content-Type",
				"application/x-www-form-urlencoded" );
			xmlHttp.send( data );
		} else {
			throw new Error( '您的请求方法有误！' );
		}
	} catch ( error ) {
		console.log( "出错啦：" + error.message );
	}

	//创建xmlHttpRequest对象函数
	function createXmlHttp() {
		if ( window.ActiveXObject ) {
			try {
				xmlHttp = new ActiveXObject( "Msxml2.XMLHTTP" );
			} catch ( e ) {
				xmlHttp = new ActiveXObject( "Microsoft.XMLHTTP" );
			}

		} else if ( window.XMLHttpRequest ) {
			try {
				xmlHttp = new XMLHttpRequest();
			} catch ( e ) {
				xmlHttp = false;
			}
		}
	}

}
// 使用示例
// get方法使用例子：
// 　 　myAjax({
//       requestType: 'get',
//       url: '/getFunc',
//       async: true,
//       cache: false,
//       data: { name: "lin", age: "20"},
//       success: function (data) {
//           alert(data);
//       },
//       error: function (statusText) {
//          alert("请求失败了，以下是具体信息：\n" + statusText);
//       }
//      });
// 
//     post方法使用例子：
//     myAjax({
//      requestType: 'post',
//      url: '/postFunc',
//      async: true,
//      data: {name:"shuai", age: 10},
//      success: function (data) {
//          console.log(data);
//      },
//      error: function (statusText) {
//          alert("请求失败了，以下是具体信息：\n" + statusText);
//      }
//     });

/*
 * type              请求的方式  默认为get
 * url               发送请求的地址
 * param             发送请求的参数
 * isShowLoader      是否显示loader动画  默认为false
 * dataType          返回JSON数据  默认为JSON格式数据
 * callBack          请求的回调函数
 */
( function () {
	function AjaxRequest( opts ) {
		this.type = opts.type || "get";
		this.url = opts.url;
		this.param = opts.param || {};
		this.headers = opts.headers || {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		};
		this.isShowLoader = opts.isShowLoader || false;
		this.dataType = opts.dataType || "json";
		this.callBack = opts.callBack;
		this.init();
	}

	AjaxRequest.prototype = {
		//初始化
		init: function () {
			this.sendRequest();
		},
		//渲染loader
		showLoader: function () {
			if ( this.isShowLoader ) {
				var loader =
					'<div class="ajaxLoader"><div class="loader">加载中...</div></div>';
				$( "body" ).append( loader );
			}
		},
		//隐藏loader
		hideLoader: function () {
			if ( this.isShowLoader ) {
				$( ".ajaxLoader" ).remove();
			}
		},
		//发送请求
		sendRequest: function () {
			var self = this;
			$.ajax( {
				type: this.type,
				url: this.url,
				data: this.param,
				headers: this.headers,
				dataType: this.dataType,
				beforeSend: this.showLoader(),
				success: function ( data ) {
					self.hideLoader();
					if ( data != null && data != "" ) {
						if ( self.callBack ) {
							if ( Object.prototype.toString.call( self.callBack ) ===
								"[object Function]" ) { //Object.prototype.toString.call方法--精确判断对象的类型
								self.callBack( data );
							} else {
								console.log( "加载失败" );
							}
						}
					}
				},
				error: function ( data ) {
					console.log( data );
				}
			} );
		}
	};

	window.AjaxRequest = AjaxRequest;
} )();
// 使用示例
//new AjaxRequest({
//	type: "get",
//	url: url,
//	param: "",
// headers: "",
//	isShowLoader: true,
//	dataType: "",
//	callBack: function(res) {
//		console.log(res);
//	}
//});

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
};

/*
 * 判断object是否空，未定义或null
 * @param object 
 * @return
 */
function isNull( obj ) {
	if ( obj == "" || typeof ( obj ) == "undefined" || obj == null ) {
		return true;
	} else {
		return false;
	}
};

/*
 * 正则验证
 * @param s 验证字符串
 * @param type 验证类型 money,china,mobile等 
 * @return
 */
function checkData( s, type ) {
	var objbool = false;
	var objexp = "";
	switch ( type ) {
		case 'money': //金额格式,格式定义为带小数的正数，小数点后最多三位
			objexp = "^[0-9]+[\.][0-9]{0,3}$";
			break;
		case 'numletter_': //英文字母和数字和下划线组成 
			objexp = "^[0-9a-zA-Z\_]+$";
			break;
		case 'numletter': //英文字母和数字组成
			objexp = "^[0-9a-zA-Z]+$";
			break;
		case 'numletterchina': //汉字、字母、数字组成 
			objexp = "^[0-9a-zA-Z\u4e00-\u9fa5]+$";
			break;
		case 'email': //邮件地址格式 
			objexp = "^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$";
			break;
		case 'tel': //固话格式 
			objexp =
				/^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/;
			break;
		case 'mobile': //手机号码 
			objexp = "^(13[0-9]|15[0-9]|18[0-9])([0-9]{8})$";
			break;
		case 'decimal': //浮点数 
			objexp = "^[0-9]+([.][0-9]+)?$";
			break;
		case 'url': //网址 
			objexp = "(http://|https://){0,1}[\w\/\.\?\&\=]+";
			break;
		case 'date': //日期 YYYY-MM-DD格式
			objexp = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
			break;
		case 'int': //整数 
			objexp = "^[0-9]*[1-9][0-9]*$";
			break;
		case 'int+': //正整数包含0
			objexp = "^\\d+$";
			break;
		case 'int-': //负整数包含0
			objexp = "^((-\\d+)|(0+))$";
			break;
		case 'china': //中文 
			objexp = /^[\u0391-\uFFE5]+$/;
			break;
	}
	var re = new RegExp( objexp );
	if ( re.test( s ) ) {
		return true;
	} else {
		return false;
	}
};

function createNewpage( container, newSrc ) {
	var self = this;

	var iframe = document.createElement( "iframe" );
	iframe.src = newSrc;
	iframe.id = "serviceBody";
	iframe.style.width = "100%";
	iframe.style.height = "100%";
	container.appendChild( iframe );

	if ( window.navigator.userAgent.indexOf( 'IE' ) == -1 ) { //非IE的浏览器
		iframe.onload = setIframe;
	} else {
		iframe.onreadystatechange = function () { //IE浏览器
			if ( iframe.readyState == 'complete' ) { //判断状态
				setIframe();
			}
		}
	}

}

/**
弹出iframe页面(iframe后面会添加灰色蒙版)
**/
function showIframe( url, w, h ) {
	//添加iframe
	var if_w = w;
	var if_h = h;
	//allowTransparency='true' 设置背景透明
	$( "<iframe width='" + if_w + "' height='" + if_h +
		"' class='iframe' name='iframe' style='position:absolute;z-index:4;'  frameborder='no' marginheight='0' marginwidth='0' allowTransparency='true'></iframe>"
	).prependTo( 'body' );
	var st = document.documentElement.scrollTop || document.body.scrollTop; //滚动条距顶部的距离
	var sl = document.documentElement.scrollLeft || document.body.scrollLeft; //滚动条距左边的距离
	var ch = document.documentElement.clientHeight; //屏幕的高度
	var cw = document.documentElement.clientWidth; //屏幕的宽度
	var objH = $( ".iframe" ).height(); //浮动对象的高度
	var objW = $( ".iframe" ).width(); //浮动对象的宽度
	var objT = Number( st ) + ( Number( ch ) - Number( objH ) ) / 2;
	var objL = Number( sl ) + ( Number( cw ) - Number( objW ) ) / 2;
	$( ".iframe" ).css( 'left', objL );
	$( ".iframe" ).attr( "src", url );

	//添加背景遮罩
	$(
		"<div class='iframe-bg' style='background-color: Gray;display:block;z-index:3;position:absolute;left:0px;top:0px;filter:Alpha(Opacity=30);/* IE */-moz-opacity:0.4;/* Moz + FF */opacity: 0.4; '/>"
	).prependTo( 'body' );
	var bgWidth = Math.max( $( "body" ).width(), cw );
	var bgHeight = Math.max( $( "body" ).height(), ch );
	$( ".iframe-bg" ).css( {
		width: bgWidth,
		height: bgHeight
	} );

	//点击背景遮罩移除iframe和背景
	$( ".iframe-bg" ).click( function () {
		$( ".iframe" ).remove();
		$( ".iframe-bg" ).remove();
	} );
}