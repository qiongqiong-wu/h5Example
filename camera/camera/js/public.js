$( function () {
	$( '.nav_left' ).on( 'click', function () {
		location.href = 'goback';
//		history.go(-1);
//		setTimeout( function () {
//			location.href = '#closeWindow';
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

function Toast( info ) {
	$( '.toast' ).show().children( "span" ).html( info );
	setTimeout( function () {
		$( '.toast' ).hide().children( "span" ).html( info );
	}, 2000 );
}

//判断图片格式

function checkImg( info ) {
	if ( info && info !== '.PNG' && info !== '.JPG' &&
		info !== '.JPEG' && info !==
		'.GIF' ) {
		info = '../images/icon_unloaded.png'
	} else {
		console.log( '图片格式为：' + info );
	}
}

Number.prototype.formatMoney = function ( places, symbol, thousand, decimal ) {
	places = !isNaN( places = Math.abs( places ) ) ? places : 2;
	symbol = symbol !== undefined ? symbol : "";
	thousand = thousand || ",";
	decimal = decimal || ".";
	var number = this,
		negative = number < 0 ? "-" : "",
		i = parseInt( number = Math.abs( +number || 0 ).toFixed( places ), 10 ) + "",
		j = ( j = i.length ) > 3 ? j % 3 : 0;
	return symbol + negative + ( j ? i.substr( 0, j ) + thousand : "" ) + i.substr(
		j ).replace( /(\d{3})(?=\d)/g, thousand );
};

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

function ajaxData( options ) {
	var xhr = null;
	var params = formsParams( options.data );
	//创建对象
	if ( window.XMLHttpRequest ) {
		xhr = new XMLHttpRequest()
	} else {
		xhr = new ActiveXObject( "Microsoft.XMLHTTP" );
	}
	// 连接
	if ( options.type == "GET" ) {
		xhr.open( options.type, options.url + "?" + params, options.async );
		xhr.send( null )
	} else if ( options.type == "POST" ) {
		xhr.open( options.type, options.url, options.async );
		xhr.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
		xhr.send( params );
	}
	xhr.onreadystatechange = function () {
		if ( xhr.readyState == 4 && xhr.status == 200 ) {
			options.success( xhr.responseText );
		}
	}

	function formsParams( data ) {
		var arr = [];
		for ( var prop in data ) {
			arr.push( prop + "=" + data[ prop ] );
		}
		return arr.join( "&" );
	}

}