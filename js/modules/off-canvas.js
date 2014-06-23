jQuery(document).ready (function ($) {

	var offCanvas = function () {
		this.init();
	};

	offCanvas.prototype.init = function () {
		var self = this
			$document = $(document),
			trigger = '.off-canvas-trigger';

		$document
			.on('click', function () {
				self.closeOffCanvas();
			})
			.on('click', trigger, function (e) {
				var $this = $(this),
					$offCanvas = $this.parent().parent();

				e.stopPropagation();
				e.preventDefault();

				self.openOffCanvas($this, $offCanvas);
			})
			.on('click', '.off-canvas', function (e) {
				e.stopPropagation();
			})
			.on('click', '.off-canvas-content', function (e) {
				e.stopPropagation();
			});
	};

	offCanvas.prototype.closeOffCanvas = function () {
		$('.off-canvas-contain').removeClass('off-canvas--open');
	};

	offCanvas.prototype.openOffCanvas = function ($this, $offCanvas) {
		$offCanvas.toggleClass('off-canvas--open');
	};

	new offCanvas;

});