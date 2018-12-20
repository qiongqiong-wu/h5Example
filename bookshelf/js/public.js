$(function() {
	$('.left').on('click', function() {
		history.back();
	});
});

function GetString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) {
		return r[2];
	}
	return null;
}

//判断是否为数组
function isArray(myArray) {
	return myArray.constructor.toString().indexOf("Array") > -1;
}