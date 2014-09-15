(function (Bk, $) {

	var Toggle = function () {
		this.init.apply(this, arguments);
	};

	Toggle.defaults = {
		className: 'toggle-trigger',
		toggle: '',
		activeTriggerClass: 'toggle-trigger-shown',
		activeClass: 'toggle-shown',
		closeOnClick: false
	};

	Toggle.prototype.init = function (el, options) {
		var self = this;
		
		// Store a reference to the jQuery element
		this.$el = $(el);

		this.options = $.extend({}, Toggle.defaults, options, this.$el.data('options'));

		// Add the class
		this.$el.addClass(this.options.className);

		if (this.options.closeOnClick == true) {
			$(document).on('click', function (e) {
				$('#' + self.options.toggle).removeClass(self.options.activeClass);
			});

			$('#' + this.options.toggle).on('click', function (e) {
				e.stopPropagation();
			});
		}

		this.$el.on('click.bk.toggle', function (e) {
			var $this = $(this);

			e.preventDefault();
			e.stopPropagation();

			self.doToggle();
		});
	};

	Toggle.prototype.doToggle = function () {
		var self = this,
			$target = $('#' + this.options.toggle);

		// Toggle class on trigger element
		self.$el.toggleClass(this.options.activeTriggerClass);

		// Toggle class on element desired to be shown/hidden
		$target.toggleClass(this.options.activeClass);
	};

	Toggle.prototype.unToggle = function () {
		var self = this,
			$target = $('#' + this.options.toggle);

		$target.removeClass(this.options.activeClass);
	}

	Toggle.prototype.destroy = function () {
		this.$el.off(".toggle");
	};

	Bk.Toggle = Toggle;

	// Expose as a jQuery Plugin
	$.fn.bkToggle = function (options) {
		return this.each(function () {
			var $el = $(this);
			// Check if it is already set up
			if (!$el.data('bkToggle')) {
				$el.data('bkToggle', new Toggle(this, options));
			}
		});
	};

	// Allow defaults to be accessed via a common jQuery pattern
	$.fn.bkToggle.defaults = Toggle.defaults;

	// Auto-initialize if set
	jQuery(function ($) {
		if (Bk.autoInitialize) {
			$('.' + Toggle.defaults.className).bkToggle();
		}
	});

}( Barekit, jQuery ));