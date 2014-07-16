jQuery(function ($) {

	$.fn.bnAccordion = function (options) {

		var $accordion = $(this);	

		var Accordion = function () {
			this.init();
		};

		Accordion.prototype.init = function () {
			var self = this,
				$trigger = $('.accordion dt a');

			$accordion.on('click', function (e) {
				var $this = $(this),
					$target = $(e.target);

				options = $.extend(options || {}, $this.data('options'));

				if ($target.is('a')) {
					e.preventDefault();
					var $content = $target.parent().next('dd');

					self.processOptions($target, $content, options);
				}
			});
		};

		Accordion.prototype.processOptions = function ($target, $content, options) {
			var self = this,
				$panel = $('.accordion dd'),
				$trigger = $('.accordion dt a'),
				activeTrigger = 'accordion-trigger--open',
				activePanel = 'accordion-panel--open';

			if (options && options.multiExpand == true) {
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

		$accordion.length ? new Accordion : false;

	};

	$('.accordion').bnAccordion();

});