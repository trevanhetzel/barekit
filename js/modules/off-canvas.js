jQuery(function ($) {

	$.fn.bnOffCanvas = function (options) {

		var $offCanvasContain = $(this),
			$document = $(document),
			trigger = '.off-canvas-trigger',
			offCanvas = '.off-canvas',
			openClass= 'off-canvas--open';

		var offCanvas = function () {
			this.init();
		};

		offCanvas.prototype.init = function () {

			var self = this;

			$document
				.on('click', function () {
					self.closeOffCanvas();
				});

			$offCanvasContain
				.on('click', trigger, function (e) {
					var $this = $(this),
						$offCanvas = $this.parents('.off-canvas-contain');

					e.stopPropagation();
					e.preventDefault();

					self.openOffCanvas($this, $offCanvas);
				});

			$offCanvasContain
				.on('click', offCanvas, function (e) {
					e.stopPropagation();
				});
		};

		offCanvas.prototype.closeOffCanvas = function () {
			$offCanvasContain.removeClass(openClass);
		};

		offCanvas.prototype.openOffCanvas = function ($this, $offCanvas) {
			$offCanvas.addClass(openClass);
		};

		$offCanvasContain.length ? new offCanvas : false;

	};

	$('.off-canvas-contain').bnOffCanvas();

});