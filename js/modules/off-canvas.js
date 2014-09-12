(function (Bk, $) {

	var OffCanvas = function () {
		this.init.apply(this, arguments);
	};

	OffCanvas.defaults = {
		className: 'off-canvas-contain',
		trigger: '[class^="off-canvas-trigger"]',
		leftOpenClass: 'off-canvas--open-left',
		rightOpenClass: 'off-canvas--open-right'
	};

	OffCanvas.prototype.init = function (el, options) {
		var self = this;
		
		// Store a reference to the jQuery element
		this.$el = $(el);

		// Set the options
		var options = this.options = $.extend({}, OffCanvas.defaults, options, this.$el.data('options'));

		// Add the class
		this.$el.addClass(options.className);

		$(document)
			.on('click.bk.offcanvas', function () {
				self.closeOffCanvas();
			})
			.on('click.bk.offcanvas', options.trigger, function (e) {
				var $this = $(this),
					$offCanvas = $this.parents('.off-canvas-contain'),
					$position = $(e.target);

				e.stopPropagation();
				e.preventDefault();

				if ($offCanvas.hasClass(options.leftOpenClass) || $offCanvas.hasClass(options.rightOpenClass)) {
					self.closeOffCanvas(options, $position);
				} else {
					self.openOffCanvas(options, $this, $offCanvas, $position);
				}
			})
			.on('click.bk.offcanvas', '.off-canvas-left', function (e) {
				e.stopPropagation();
			})
			.on('click.bk.offcanvas', '.off-canvas-right', function (e) {
				e.stopPropagation();
			});
	};

	OffCanvas.prototype.closeOffCanvas = function ($position) {
		this.$el.removeClass('off-canvas--open-right').removeClass('off-canvas--open-left');
	};

	OffCanvas.prototype.openOffCanvas = function (options, $this, $offCanvas, $position) {
		if ($position.hasClass('off-canvas-trigger-left')) {
			$offCanvas.addClass(options.leftOpenClass);
		} else if ($position.hasClass('off-canvas-trigger-right')) {
			$offCanvas.addClass(options.rightOpenClass);
		}
	};

	OffCanvas.prototype.destroy = function () {
		$(document).off(".offcanvas");
	};

	Bk.OffCanvas = OffCanvas;

	// Expose as a jQuery Plugin
	$.fn.bkOffCanvas = function (options) {
		return this.each(function () {
			var $el = $(this);
			// Check if it is already set up
			if (!$el.data('bkOffCanvas')) {
				$el.data('bkOffCanvas', new OffCanvas(this, options));
			}
		});
	};

	// Allow defaults to be accessed via a common jQuery pattern
	$.fn.bkOffCanvas.defaults = OffCanvas.defaults;

	// Auto-initialize if set
	jQuery(function ($) {
		if (Bk.autoInitialize) {
			$('.' + OffCanvas.defaults.className).bkOffCanvas();
		}
	});

}( Barekit, jQuery ));