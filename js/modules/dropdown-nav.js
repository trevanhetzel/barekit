(function (Bk, $) {

	var Dropdown = function () {
		this.init.apply(this, arguments);
	};

	Dropdown.defaults = {
		className: 'dropdown-nav',
		click: true,
		clickClass: 'click-setting',
		activeTrigger: 'dropdown-trigger--open',
		activeClass: 'dropdown--open'
	};

	Dropdown.prototype.init = function (el, options) {
		// Store a reference to the jQuery element
		this.$el = $(el);

		var $trigger = this.$el.find('li:has(ul) > a');

		// Set the options
		this.options = $.extend({}, Dropdown.defaults, options, this.$el.data('options'));

		// Add the class
		this.$el.addClass(this.options.className);

		if (this.options.click == true) {
			// Cancel out the CSS hover functionality
			$trigger.on('mouseover.bk.dropdown', $.proxy(this.add, this));
			$trigger.on('click.bk.dropdown', $.proxy(this.remove, this));
		}
	};

	Dropdown.prototype.add = function (e) {
		var $this = $(e.target);

		$this.parent().addClass(this.options.clickClass);
	};

	Dropdown.prototype.remove = function (e) {
		var $this = $(e.target),
			$menu = $this.siblings('ul');

		e.preventDefault();

		$this.parent().removeClass(this.options.className);

		this.doDropdown($this, $menu);
	};

	Dropdown.prototype.doDropdown = function ($this, $menu) {
		$this.parent().toggleClass(this.options.activeTrigger);
		$menu.toggleClass(this.options.activeClass);
		$this.parent().addClass(this.options.clickClass);
	};

	Dropdown.prototype.destroy = function () {
		this.$el.off('.dropdown');
	};

	Bk.Dropdown = Dropdown;

	// Expose as a jQuery Plugin
	$.fn.bkDropdown = function (options) {
		return this.each(function () {
			var $el = $(this);
			// Check if it is already set up
			if (!$el.data('bkDropdown')) {
				$el.data('bkDropdown', new Dropdown(this, options));
			}
		});
	};

	// Allow defaults to be accessed via a common jQuery pattern
	$.fn.bkDropdown.defaults = Dropdown.defaults;

	// Auto-initialize if set
	jQuery(function ($) {
		if (Bk.autoInitialize) {
			$('.' + Dropdown.defaults.className).bkDropdown();
		}
	});

}( Barekit, jQuery ));