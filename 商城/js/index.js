// JavaScript Document
//头条
var c, _ = Function;
with( o = document.getElementById( "divgundong" ) ) {
		innerHTML += innerHTML;
		onmouseover = _( "c=1" );
		onmouseout = _( "c=0" );
	}
	( F = _( "if(#%30||!c)#++,#%=o.scrollHeight>>1;setTimeout(F,#%30?10:2400);"
		.replace( /#/g, "o.scrollTop" ) ) )();

$( function () {

	//计算内容上下padding
	reContPadding( {
		main: ".contaniner",
		header: "#header",
		footer: "#footer"
	} );

	function reContPadding( o ) {
		var main = o.main || ".contaniner",
			header = o.header || null,
			footer = o.footer || null;
		var cont_pt = $( header ).outerHeight( true ),
			cont_pb = $( footer ).outerHeight( true );
		//		$(main).css({paddingTop:cont_pt,paddingBottom:cont_pb});
		$( main ).css( {
			paddingTop: 0,
			paddingBottom: cont_pb
		} );
	}

	//	下拉刷新数据
	var $statu = $( '.loading-warp .text' );
	var pullRefresh = $( '.warp' ).pPullRefresh( {
		$el: $( '.warp' ),
		$loadingEl: $( '.loading-warp' ),
		sendData: null,
		url: '',
		callbacks: {
			pullStart: function () {
				$statu.text( '松开开始刷新' );
			},
			start: function () {
				$statu.text( '数据刷新中···' );
			},
			success: function ( response ) {
				$statu.text( '数据刷新成功！' );
			},
			end: function () {
				$statu.text( '下拉刷新结束' );
			},
			error: function () {
				$statu.text( '找不到请求地址,数据刷新失败' );
			}
		}
	} );
	// pullRefresh.setDestroy(true);

	var banner = new Swiper( '.banner', {
		autoplay: 3000,
		pagination: '.swiper-pagination',
		paginationClickable: true,
		lazyLoading: true,
		loop: true
	} );
	$( '.top-sch-box .fdj,.top-sch-box .sch-txt,.pop-schwrap .btn-back-left' )
		.on( 'click', function () {
			$( 'html,body' ).toggleClass( 'holding' );
			$( '.pop-schwrap' ).toggleClass( 'on' );
			if ( $( '.pop-schwrap' ).hasClass( 'on' ) ) {;
				$( '.pop-schwrap .sch-input' ).focus();
			}
		} );
	$( 'html,body' ).on( "mousewheel DOMMouseScroll", function ( e ) {
		var delta = ( e.originalEvent.wheelDelta && ( e.originalEvent.wheelDelta >
				0 ? 1 : -1 ) ) || // chrome & ie
			( e.originalEvent.detail && ( e.originalEvent.detail > 0 ? -1 : 1 ) ); // firefox
		if ( delta > 0 ) {
			// 向上滚
			$( "#header" ).show();
		} else if ( delta < 0 ) {
			// 向下滚
			$( "#header" ).hide();
		}
	} );

} );