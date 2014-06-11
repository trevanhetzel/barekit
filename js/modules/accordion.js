define([
		"jquery"
	],
	function ($) {

		var Accordion = function () {
			this.init();
		};

		Accordion.prototype.init = function () {
			var self = this,
				$accordion = $('.bn-accordion'),
				$trigger = $('.bn-accordion dt a');

			$accordion.on('click', function (e) {
				var $this = $(this),
					options = $this.data('options')[0],
					$target = $(e.target);

				if ($target.is('a')) {
					$content = $target.parent().next('dd');
					self.processOptions($target, $content, options);
				}
			});
		};

		Accordion.prototype.processOptions = function ($target, $content, options) {
			var self = this;
			console.log(options.multiExpand);

			self.toggle($target, $content);
		};

		Accordion.prototype.toggle = function ($target, $content) {
			$content.toggleClass('bn-accordion--open');
		};

		return Accordion;

	});