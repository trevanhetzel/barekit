(function (Bk, $) {

	var Accordion = function () {
		this.init.apply(this, arguments);
	};

	Accordion.defaults = {
		className: 'accordion',
		multiExpand: false,
		panelSelector: 'dd',
		triggerSelector: 'dt a',
		activeTrigger: 'accordion-trigger--open',
		activePanel: 'accordion-panel--open'
	};

	Accordion.prototype.init = function (el, options) {
		// Store a reference to the jQuery element
		this.$el = $(el);

		// Set the options
		this.options = $.extend({}, Accordion.defaults, options, this.$el.data('options'));

		// Add the class
		this.$el.addClass(this.options.className);

		this.$el.on('click.bk.accordion', $.proxy(this.onClick, this));
	};

	Accordion.prototype.onClick = function (e) {
		var $target = $(e.target);

		if ($target.is('a')) {
			e.preventDefault();
			var $content = $target.parent().next('dd');

			this.processOptions($target, $content);
		}
	};

	Accordion.prototype.processOptions = function ($target, $content) {
		var $panel = this.$el.find(this.options.panelSelector),
			$trigger = this.$el.find(this.options.triggerSelector),
			activeTrigger = this.options.activeTrigger,
			activePanel = this.options.activePanel;

		if (this.options.multiExpand === true) {
			// Trigger active class
			$target.parent().toggleClass(activeTrigger);
			// Panel active class
			$content.toggleClass(activePanel);
		} else {
			// Remove all trigger active classes
			$trigger.parent().removeClass(activeTrigger);
			// Trigger active class
			$target.parent().addClass(activeTrigger);

			// Remove all panel active classes
			if (!$content.hasClass(activePanel)) {
				$panel.removeClass(activePanel);
			}
			// Panel active class
			$content.toggleClass(activePanel);
		}
	};

	Accordion.prototype.destroy = function () {
		this.$el.off('.accordion');
	};

	Bk.Accordion = Accordion;

	// Expose as a jQuery Plugin
	$.fn.bkAccordion = function (options) {
		return this.each(function () {
			var $el = $(this);
			// Check if it is already set up
			if (!$el.data('bkAccordion')) {
				$el.data('bkAccordion', new Accordion(this, options));
			}
		});
	};

	// Allow defaults to be accessed via a common jQuery pattern
	$.fn.bkAccordion.defaults = Accordion.defaults;

	// Auto-initialize if set
	jQuery(function ($) {
		if (Bk.autoInitialize) {
			$('.' + Accordion.defaults.className).bkAccordion();
		}
	});

}( Barekit, jQuery ));