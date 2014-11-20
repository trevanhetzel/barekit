var Dropdown = function () {
	this.init.apply(this, arguments);
};

Dropdown.defaults = {
	className: 'dropdown-nav',
	click: false,
	clickClass: 'click-setting',
	activeTrigger: 'dropdown-trigger--open',
	activeClass: 'dropdown--open'
};

Dropdown.prototype.init = function (el, options) {
	// Store a reference to the jQuery element
	this.$el = $(el);

	var $trigger = this.$el.find('li:has(ul)');

	// Set the options
	this.options = $.extend({}, Dropdown.defaults, options, this.$el.data('options'));

	// Add the class
	this.$el.addClass(this.options.className);

	if (this.options.click == true) {
		// Cancel out the CSS hover functionality
		$trigger.addClass(this.options.clickClass);
		$trigger.on('click.bk.dropdown', $.proxy(this.remove, this));

		//mouse click listener to close the dropdown if clicked outside
    self = this;
    $(document).on('click', function(e){
      $('.' + self.options.activeTrigger).each(function(){
        self.hide($(this), e);
      });
    });

    //keyboard listener to close the dropdown if esc is pressed
    $(document).keyup(function(e) {
      if(e.keyCode === 27){
        $('.' + self.options.activeTrigger).each(function(){
          self.hide($(this), 'undefined');
        });
      }
    });
	}
};

Dropdown.prototype.hide = function($el, e) {
  if( e === 'undefined' || ($(e.target).parents('ul.' + this.options.className)[0] !== $el.parents('ul.' + this.options.className)[0])){
    $el.removeClass(this.options.activeTrigger);
    $el.children('ul').removeClass(this.options.activeClass);
  }
};

Dropdown.prototype.remove = function (e) {
	var $this = $(e.currentTarget),
		$menu = $this.children('ul');

	e.preventDefault();

	$this.removeClass(this.options.className);

	this.doDropdown($this, $menu);
};

Dropdown.prototype.doDropdown = function ($this, $menu) {
	$this.toggleClass(this.options.activeTrigger);
	$menu.toggleClass(this.options.activeClass);
};

Dropdown.prototype.destroy = function () {
	this.$el.off('.dropdown');
};

Bk.Dropdown = Dropdown;

// Expose as a jQuery Plugin
$.fn.bkDropdown = function (options) {
	return this.each(function () {
		var $el = $(this);
		// Check if it is already set up
		if (!$el.data('bkDropdown')) {
			$el.data('bkDropdown', new Dropdown(this, options));
		}
	});
};

// Allow defaults to be accessed via a common jQuery pattern
$.fn.bkDropdown.defaults = Dropdown.defaults;

// Auto-initialize if set
jQuery(function ($) {
	if (Bk.autoInitialize) {
		$('.' + Dropdown.defaults.className).bkDropdown();
	}
});
