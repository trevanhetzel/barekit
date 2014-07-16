jQuery(function ($) {

	$.fn.bnToggle = function (options) {

		var $toggleTrigger = $(this);

		var Toggle = function () {
			this.init();
		};

		Toggle.prototype.init = function () {
			var self = this;

			$toggleTrigger.on('click', function (e) {
				var $this = $(this);

				options = $.extend($this.data('options'), options || {});

				e.preventDefault();
				
				self.doToggle($this, options);
			});
		};

		Toggle.prototype.doToggle = function ($this, options) {
			var $target = $('#' + options.toggle);

			$target.toggleClass('toggle-shown');
		};

		$toggleTrigger.length ? new Toggle : false;
	};

	$('.toggle-trigger').bnToggle();

});