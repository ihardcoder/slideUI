function slide(container, ops) {
	this.container = container;
	this.ops = ops;
	this.speed = 1000;
	this.step = 3000;
	this.images = [];
	this.sum = 0;
	this.init();
}
// initial parameters
slide.prototype.init = function() {
	this.speed = this.ops && this.ops.speed;
	this.step = this.ops && this.ops.step;
	if (this.step <= this.speed) {
		this.error("0");
		// reformat if timers are not fit
		this.step = this.speed + 500;
	}
	this.images = this.ops && this.ops.imgs;
	this.sum = this.images.length != 0 && this.images.length;
	this.appendItem();
}
// insert sliders and controller
slide.prototype.appendItem = function() {
	var _this = this;
	// insert slider items
	var box = $("<ul></ul>");
	for (var i = 0; i < this.sum; i++) {
		box.append($("<li><img src='" + _this.images[i] + "'></li>"));
	}
	box.find("li:first").addClass('current');
	// insert controller
	var controller = $("<div class='controller'></div>");
	var prev = $("<button class='slide-prev'>Prev</button>");
	var next = $("<button class='slide-next'>Next</button>");
	controller.append(prev).append(next);
	_this.container.append(box).append(controller);
	_this.bind();
}
// bind events
slide.prototype.bind = function() {
	var _this =this;
	var $controller = $(".controller");
	$controller.on("click", ".slide-prev", function() {
		var cur = $(".current"),
			prev = _this.prevSlide($(".current"), _this.sum);
		cur.animate({
			left: "100%"
		}, 500, function() {
			$(this).removeClass("current");
		});
		prev.css({
			left: "-100%"
		}).animate({
			left: "0"
		}, 500, function() {
			$(this).addClass("current");
		});
	})
		.on("click", ".slide-next", function() {
			var cur = $(".current"),
				next = _this.nextSlide($(".current"), _this.sum);
			cur.animate({
				left: "-100%"
			}, 500, function() {
				$(this).removeClass("current");
			});
			next.css({
				left: "100%"
			}).animate({
				left: "0"
			}, 500, function() {
				$(this).addClass("current");
			});
		});
	setInterval(function() {
		var next = _this.nextSlide($(".current"), _this.sum);
		$(".current").animate({
			left: "-100%"
		}, 1000, function() {
			$(this).removeClass("current");
		});
		next.css({
			left: "100%"
		}).animate({
			left: "0"
		}, 999, function() {
			$(this).addClass("current");
		});
	}, 2000);
}

slide.prototype.nextSlide = function(el, sum) {
	var $el = $(el),
		$box = $el.parent();

	if ($el.index() >= sum - 1) {
		return $box.find("li:first");
	} else {
		return $el.next();
	}

}
slide.prototype.prevSlide = function(el, sum) {
	var $el = $(el),
		$box = $el.parent();

	if ($el.index() === 0) {
		return $box.find("li:last");
	} else {
		return $el.prev();
	}
}
slide.prototype.error = function(type) {
	switch (type) {
		case "0":
			console.log("Timers are not fit");
			break;
	}
}