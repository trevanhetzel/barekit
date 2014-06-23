jQuery(function ($) {

	var $tabs = $('.tabs');

	var Tabs = function () {
		this.init();
	};

	Tabs.prototype.init = function () {
		var self = this,
			$trigger = $('.tabs li a');

		$trigger.on('click', function (e) {
			var $this = $(this);

			e.preventDefault();
			
			self.doTabs($this, $trigger);
		});
	};

	Tabs.prototype.doTabs = function ($this, $trigger) {
		var $panelGroup = $this.parent().parent().next('.tabs-panels'),
			$panel = $panelGroup.children('li'),
			triggerPos = $this.parent().index(),
			$matchingPanel = $panel.eq(triggerPos),
			activeTrigger = 'tab-trigger--open',
			activePanel = 'tab-panel--open';

		// Remove all trigger active classes
		$trigger.parent().removeClass(activeTrigger);

		// Trigger active class
		$this.parent().addClass(activeTrigger);

		// Remove all panel active classes
		$panel.removeClass(activePanel);

		// Panel active class
		$matchingPanel.addClass(activePanel);
	};

	$tabs.length ? new Tabs : false;

});