(function (Bk, $) {

	var Toggle = function () {
		this.init.apply(this, arguments);
	};

	Toggle.defaults = {
		className: 'toggle-trigger',
		toggle: '',
		activeClass: 'toggle-shown'
	};

	Toggle.prototype.init = function (el, options) {
		var self = this;
		
		// Store a reference to the jQuery element
		this.$el = $(el);

		this.options = $.extend({}, Toggle.defaults, options, this.$el.data('options'));

		// Add the class
		this.$el.addClass(this.options.className);

		this.$el.on('click.bk.toggle', function (e) {
			var $this = $(this);

			e.preventDefault();
			
			self.doToggle();
		});
	};

	Toggle.prototype.doToggle = function () {
		var $target = $('#' + this.options.toggle);

		$target.toggleClass(this.options.activeClass);
	};

	Toggle.prototype.destroy = function () {
		this.$el.off(".toggle");
	};

	Bk.Toggle = Toggle;

	// Expose as a jQuery Plugin
	$.fn.bnToggle = function (options) {
		return this.each(function () {
			var $el = $(this);
			// Check if it is already set up
			if (!$el.data('bnToggle')) {
				$el.data('bnToggle', new Toggle(this, options));
			}
		});
	};

	// Allow defaults to be accessed via a common jQuery pattern
	$.fn.bnToggle.defaults = Toggle.defaults;

	// Auto-initialize if set
	jQuery(function ($) {
		if (Bk.autoInitialize) {
			$('.' + Toggle.defaults.className).bnToggle();
		}
	});

}( Barekit, jQuery ));