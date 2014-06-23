jQuery(document).ready (function ($) {

	var Toggle = function () {
		this.init();
	};

	Toggle.prototype.init = function () {
		var self = this,
			$trigger = $('.toggle-trigger');

		$trigger.on('click', function (e) {
			var $this = $(this),
				options = $this.data('options');

			e.preventDefault();
			
			self.doToggle($this, options);
		});
	};

	Toggle.prototype.doToggle = function ($this, options) {
		var $target = $('#' + options.toggle);

		$target.toggleClass('toggle-shown');
	};

	new Toggle;

});