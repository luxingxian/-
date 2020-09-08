$(function() {
	//长按弹出框
	$(".textCopy").on({
		touchstart: function(e) {
			var _this = $(this);
			timeOutEvent = setTimeout(function() {
				if (_this.parent().hasClass("replay")) {
					$(".tipBox .delete").show();
					$(".tipBox .edit").hide();
				} else {
					$(".tipBox .delete").hide();
					$(".tipBox .edit").show();
				}
				$(".tipBox").addClass("show");
				$(".tipBg").show();
				$("#copytextBtn").attr('data-clipboard-text', _this.text());
				$("#copylinkBtn").attr('data-clipboard-text', document.location.href);
				//此处为长按事件-----在此显示遮罩层及删除按钮
			}, 500);
		},
		touchmove: function() {
			clearTimeout(timeOutEvent);
			timeOutEvent = 0;
			e.preventDefault();
		},
		touchend: function(e) {
			var _this = $(this);
			clearTimeout(timeOutEvent);
			if (timeOutEvent != 0) {
				//此处为点击事件
				var href = _this.parents("a").attr("href");
				if (href) {
					window.location.replace(href);
				} else {
					return;
				}
			}
			return false;
		}
	});

	//取消复制文本弹窗
	$(".tipBox p.cancle,.tipBg").click(function() {
		$('.tipBox').removeClass("show");
		$(".tipBg").hide();
	})
	//复制文本
	var btn = document.getElementById('copytextBtn');
	var clipboard = new ClipboardJS(btn);
	clipboard.on('success', function(e) {
		console.log(e);
		$(".toastTip").html('复制成功').fadeIn().delay(1000).fadeOut();
	});
	clipboard.on('error', function(e) {
		$(".toastTip").html('复制失败，请手动复制').fadeIn().delay(1000).fadeOut();
	});
	//复制链接
	var btn = document.getElementById('copylinkBtn');
	var clipboard = new ClipboardJS(btn);
	clipboard.on('success', function(e) {
		console.log(e);
		$(".toastTip").html('复制成功').fadeIn().delay(1000).fadeOut();
	});
	clipboard.on('error', function(e) {
		$(".toastTip").html('复制失败，请手动复制').fadeIn().delay(1000).fadeOut();
	});
	
	
})
