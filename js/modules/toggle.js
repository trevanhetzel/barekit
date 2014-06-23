jQuery(function ($) {

	var $toggleTrigger = $('.toggle-trigger');

	var Toggle = function () {
		this.init();
	};

	Toggle.prototype.init = function () {
		var self = this;

		$toggleTrigger.on('click', function (e) {
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

	$toggleTrigger.length ? new Toggle : false;

});