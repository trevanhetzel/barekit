jQuery(document).ready (function ($) {

	var Tabs = function () {
		this.init();
	};

	Tabs.prototype.init = function () {
		var self = this,
			$tabs = $('.tabs'),
			$trigger = $('.tabs dt a');

		$tabs.on('click', function (e) {
			var $this = $(this)
				$target = $(e.target);

			if ($target.is('a')) {
				e.preventDefault();
				var $content = $target.parent().next('dd');

				self.doTabs($target, $content);
			}
		});
	};

	Tabs.prototype.doTabs = function ($target, $content) {
		var self = this,
			$panel = $('.tabs dd'),
			$trigger = $('.tabs dt a'),
			activeTrigger = 'tab-trigger--open',
			activePanel = 'tab-panel--open';

		// Remove all trigger active classes
		$trigger.parent().removeClass(activeTrigger);
		// Trigger active class
		$target.parent().addClass(activeTrigger);

		// Remove all panel active classes
		$panel.removeClass(activePanel);
		
		// Panel active class
		$content.toggleClass(activePanel);
	};

	new Tabs;

});