jQuery(function ($) {

	var $dropdown = $('.dropdown-nav');

	var Dropdown = function () {
		this.init();
	};

	Dropdown.prototype.init = function () {
		var self = this,
			options = $dropdown.data('options'),
			$trigger = $dropdown.find('li:has(ul) > a');

		if (options) {
			if (options.click == true) {
				// Cancel out the CSS hover functionality
				$trigger
					.on('mouseover', function () {
						var $this = $(this);

						$this.parent().addClass('click-setting');
					})
					.on('click', function (e) {
						var $this = $(this),
							$menu = $this.siblings('ul');

						e.preventDefault();

						$this.parent().removeClass('click-setting');

						self.doDropdown($this, $trigger, $menu);
					});
			}
		}
	};

	Dropdown.prototype.doDropdown = function ($this, $trigger, $menu) {
		$trigger.parent().toggleClass('dropdown-trigger--open');
		$menu.toggleClass('dropdown--open');
		$this.parent().addClass('click-setting');
	};
	
	$dropdown.length ? new Dropdown : false;

});