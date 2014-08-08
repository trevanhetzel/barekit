(function (Bk, $) {

	var Tabs = function () {
		this.init.apply(this, arguments);
	};

	Tabs.defaults = {
		className: 'tabs',
		panelClass: 'tabs-panels',
		activeTrigger: 'tab-trigger--open',
		activePanel: 'tab-panel--open'
	};

	Tabs.prototype.init = function (el, options) {
		var self = this;
		
		// Store a reference to the jQuery element
		this.$el = $(el);

		// Set the options
		this.options = $.extend({}, Tabs.defaults, options, this.$el.data('options'));

		// Add the class
		this.$el.addClass(this.options.className);

		this.$trigger = this.$el.find('li a');

		this.$trigger.on('click.bk.tabs', function (e) {
			var $this = $(this);

			e.preventDefault();
			
			self.doTabs($this);
		});
	};

	Tabs.prototype.doTabs = function ($this) {
		var $panelGroup = $this.parent().parent().next('.' + this.options.panelClass),
			$panel = $panelGroup.children('li'),
			triggerPos = $this.parent().index(),
			$matchingPanel = $panel.eq(triggerPos);

		// Remove all trigger active classes
		this.$trigger.parent().removeClass(this.options.activeTrigger);

		// Trigger active class
		$this.parent().addClass(this.options.activeTrigger);

		// Remove all panel active classes
		$panel.removeClass(this.options.activePanel);

		// Panel active class
		$matchingPanel.addClass(this.options.activePanel);
	};

	Tabs.prototype.destroy = function () {
		this.$trigger.off(".tabs");
	};

	Bk.Tabs = Tabs;

	// Expose as a jQuery Plugin
	$.fn.bkTabs = function (options) {
		return this.each(function () {
			var $el = $(this);
			// Check if it is already set up
			if (!$el.data('bkTabs')) {
				$el.data('bkTabs', new Tabs(this, options));
			}
		});
	};

	// Allow defaults to be accessed via a common jQuery pattern
	$.fn.bkTabs.defaults = Tabs.defaults;

	// Auto-initialize if set
	jQuery(function ($) {
		if (Bk.autoInitialize) {
			$('.' + Tabs.defaults.className).bkTabs();
		}
	});

}( Barekit, jQuery ));