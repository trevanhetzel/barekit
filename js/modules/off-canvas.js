(function (Bk, $) {

	var OffCanvas = function () {
		this.init.apply(this, arguments);
	};

	OffCanvas.defaults = {
		className: 'off-canvas-contain',
		trigger: '.off-canvas-trigger',
		offCanvasContent: '.off-canvas',
		openClass: 'off-canvas--open'
	};

	OffCanvas.prototype.init = function (el, options) {
		var self = this;
		
		// Store a reference to the jQuery element
		this.$el = $(el);

		// Add the class
		this.$el.addClass(OffCanvas.defaults.className);

		$(document)
			.on('click.bk.offcanvas', function () {
				self.closeOffCanvas();
			})
			.on('click.bk.offcanvas', OffCanvas.defaults.trigger, function (e) {
				var $this = $(this),
					$offCanvas = $this.parents('.off-canvas-contain');

				e.stopPropagation();
				e.preventDefault();

				if ($offCanvas.hasClass(OffCanvas.defaults.openClass)) {
					self.closeOffCanvas();
				} else {
					self.openOffCanvas($this, $offCanvas);
				}
			})
			.on('click.bk.offcanvas', OffCanvas.defaults.offCanvasContent, function (e) {
				e.stopPropagation();
			});
	};

	OffCanvas.prototype.closeOffCanvas = function () {
		this.$el.removeClass(OffCanvas.defaults.openClass);
	};

	OffCanvas.prototype.openOffCanvas = function ($this, $offCanvas) {
		$offCanvas.addClass(OffCanvas.defaults.openClass);
	};

	OffCanvas.prototype.destroy = function () {
		this.$el.off(OffCanvas.defaults.className);
	};

	Bk.OffCanvas = OffCanvas;

	// Expose as a jQuery Plugin
	$.fn.bnOffCanvas = function (options) {
		return this.each(function () {
			var $el = $(this);
			// Check if it is already set up
			if (!$el.data('bnOffCanvas')) {
				$el.data('bnOffCanvas', new OffCanvas(this, options));
			}
		});
	};

	// Allow defaults to be accessed via a common jQuery pattern
	$.fn.bnOffCanvas.defaults = OffCanvas.defaults;

	// Auto-initialize if set
	jQuery(function ($) {
		if (Bk.autoInitialize) {
			$('.' + OffCanvas.defaults.className).bnOffCanvas();
		}
	});

}( Barekit, jQuery ));