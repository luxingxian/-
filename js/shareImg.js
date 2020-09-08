// $(document).ready(function() {
	function toImg(imgDIv,id) {
		var w = imgDIv.width();
		var h = w/(1080/2337);  
		var times = 1080/w;
		var canvas = document.createElement("canvas");
		canvas.width = w * times;//要将 canvas 的宽高设置成容器宽高的times倍
		canvas.height = h * times;
		canvas.style.width = w  + "px";
		canvas.style.height = h  + "px";
		var context = canvas.getContext("2d"); //然后将画布缩放，将图像放大n倍画到画布上  
		context.scale(times, times);
		html2canvas(imgDIv, {
			canvas: canvas,
			onrendered: function(canvas) {
				var dataUrl = canvas.toDataURL();
				id.attr("src",dataUrl)
				id.css({
					"width": canvas.width / times + "px",
					"height": canvas.height / times + "px",
				})
			}
		});
	}
	
// })


function save() {
	// 图片导出为 png 格式
	var type = 'png';
	var imgData = document.getElementById("imgCon").src;
	var _fixType = function(type) {
		type = type.toLowerCase().replace(/jpg/i, 'jpeg');
		var r = type.match(/png|jpeg|bmp|gif/)[0];
		return 'image/' + r;
	};
	// 加工image data，替换mime type
	imgData = imgData.replace(_fixType(type), 'image/octet-stream');
	/**
	 * 在本地进行文件保存
	 * @param  {String} data     要保存到本地的图片数据
	 * @param  {String} filename 文件名
	 */
	var saveFile = function(data, filename) {
		var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
		save_link.href = data;
		save_link.download = filename;
		var event = document.createEvent('MouseEvents');
		event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		save_link.dispatchEvent(event);
	};
	// 下载后的问题名
	var filename = 'card_' + (new Date()).getTime() + '.' + type;
	// download
	saveFile(imgData, filename);
} 