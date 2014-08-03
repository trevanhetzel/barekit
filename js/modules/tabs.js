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

		// Add the class
		this.$el.addClass(Tabs.defaults.className);

		var $trigger = this.$el.find('li a');

		$trigger.on('click.bk.tabs', function (e) {
			var $this = $(this);

			e.preventDefault();
			
			self.doTabs($this, $trigger);
		});
	};

	Tabs.prototype.doTabs = function ($this, $trigger) {
		var $panelGroup = $this.parent().parent().next('.' + Tabs.defaults.panelClass),
			$panel = $panelGroup.children('li'),
			triggerPos = $this.parent().index(),
			$matchingPanel = $panel.eq(triggerPos);

		// Remove all trigger active classes
		$trigger.parent().removeClass(Tabs.defaults.activeTrigger);

		// Trigger active class
		$this.parent().addClass(Tabs.defaults.activeTrigger);

		// Remove all panel active classes
		$panel.removeClass(Tabs.defaults.activePanel);

		// Panel active class
		$matchingPanel.addClass(Tabs.defaults.activePanel);
	};

	Tabs.prototype.destroy = function () {
		this.$el.off(Tabs.defaults.className);
	};

	Bk.Tabs = Tabs;

	// Expose as a jQuery Plugin
	$.fn.bnTabs = function (options) {
		return this.each(function () {
			var $el = $(this);
			// Check if it is already set up
			if (!$el.data('bnTabs')) {
				$el.data('bnTabs', new Tabs(this, options));
			}
		});
	};

	// Allow defaults to be accessed via a common jQuery pattern
	$.fn.bnTabs.defaults = Tabs.defaults;

	// Auto-initialize if set
	jQuery(function ($) {
		if (Bk.autoInitialize) {
			$('.' + Tabs.defaults.className).bnTabs();
		}
	});

}( Barekit, jQuery ));