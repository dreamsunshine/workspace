//获得url参数
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r !== null) return unescape(r[2]);
	return null;
}

//请求数据地址
//var host = 'http://tt98.tunnel.qydev.com';
var host='http://121.41.33.76:8180/t98test/pages';
//ajax处理数据及回调
function getdata(url, indata, callback) {
	$.ajax({
		type: "get",
		url: url,
		data: indata,
		dataType: 'jsonp',
		success: function(data) {
			callback(data);
		},
		error: function(xhr, errorType, error) {
			console.log(error);
		}
	});
}
//处理图片垂直居中
function imgevent(obj, url, w, img) {
	var pw = img.width,
		ph = img.height;
	if (pw>ph) {
		obj.find('img').css('margin-top', (w - 4 - ph*w/pw) / 2 + 'px').attr('src', url);
	} else {
		obj.find('img').attr('src', url);
	}
}
function picmiddle(obj, url, w) {
	var img = new Image();
	img.src = url;
	if (img.complete) {
		imgevent(obj, url, w, img);
	} else {
		img.onload = function() {
			imgevent(obj, url, w, img);
		};
	}
}