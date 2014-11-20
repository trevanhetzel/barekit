/*!
 * Barekit 0.7.0
 *
 * Copyright 2014 Trevan Hetzel. (http://trevan.coo)
 * Licensed under the MIT license.
 *
 * http://trevanhetzel.github.io/barekit/
 */
 ;(function($) {
var Bk;

window.Barekit = Bk = {
	autoInitialize: true
};

var Accordion = function () {
	this.init.apply(this, arguments);
};

Accordion.defaults = {
	className: 'accordion',
	multiExpand: false,
	panelSelector: 'dd',
	triggerSelector: 'dt',
	activeTrigger: 'accordion-trigger--open',
	activePanel: 'accordion-panel--open'
};

Accordion.prototype.init = function (el, options) {
	// Store a reference to the jQuery element
	this.$el = $(el);

	// Set the options
	this.options = $.extend({}, Accordion.defaults, options, this.$el.data('options'));

	// Add the class
	this.$el.addClass(this.options.className);

	this.$el.on('click.bk.accordion', $.proxy(this.onClick, this));
};

Accordion.prototype.onClick = function (e) {
  var $target = $(e.target);

  //prevent default behaviour on non-absolute links
  if ($target.is('a')) {
    var href = $target.attr("href");
    if ($target.attr("href") == "#") {
      e.preventDefault();
    }
  }

  //find the dt parent node
  while($target.length && !$target.is('dt')) {
    $target = $target.parent();
  }

  if ($target.length) {
    var $content = $target.next('dd');
    this.processOptions($target, $content);
  }
};

Accordion.prototype.processOptions = function ($target, $content) {
	var $panel = this.$el.find(this.options.panelSelector),
		$trigger = this.$el.find(this.options.triggerSelector),
		activeTrigger = this.options.activeTrigger,
		activePanel = this.options.activePanel;

	if (this.options.multiExpand === true) {
		// Trigger active class
		$target.toggleClass(activeTrigger);
		// Panel active class
		$content.toggleClass(activePanel);
	} else {
		// Remove all trigger active classes
		$trigger.removeClass(activeTrigger);
		// Trigger active class
		$target.addClass(activeTrigger);

		// Remove all panel active classes
		if (!$content.hasClass(activePanel)) {
			$panel.removeClass(activePanel);
		}
		// Panel active class
		$content.toggleClass(activePanel);
	}
};

Accordion.prototype.destroy = function () {
	this.$el.off('.accordion');
};

Bk.Accordion = Accordion;

// Expose as a jQuery Plugin
$.fn.bkAccordion = function (options) {
	return this.each(function () {
		var $el = $(this);
		// Check if it is already set up
		if (!$el.data('bkAccordion')) {
			$el.data('bkAccordion', new Accordion(this, options));
		}
	});
};

// Allow defaults to be accessed via a common jQuery pattern
$.fn.bkAccordion.defaults = Accordion.defaults;

// Auto-initialize if set
jQuery(function ($) {
	if (Bk.autoInitialize) {
		$('.' + Accordion.defaults.className).bkAccordion();
	}
});
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

var Modal = function () {
	this.init.apply(this, arguments);
};

Modal.defaults = {
	className: 'modal-trigger',
	modal: '.modal',
	close: '.modal-close',
	bg: 'modal-bg',
	openClass: 'modal-open'
};

Modal.prototype.init = function (el, options) {
	var self = this;

	// Store a reference to the jQuery element
	this.$el = $(el);

	// Set the options
	this.options = $.extend({}, Modal.defaults, options, this.$el.data('options'));

	// Add the class
	this.$el.addClass(this.options.className);

	$(document)
		.on('click.bk.modal', function (e) {
			self.closeModal();
		})
		.on('click.bk.modal', '.' + this.options.className, function (e) {
			e.stopPropagation();
			e.preventDefault();

			if ($(e.target).data("options").modalId === self.options.modalId) {
				self.onClick();
			}
		})
		.on('click.bk.modal', this.options.modal, function (e) {
			e.stopPropagation();
			e.preventDefault();
		})
		.on('keyup.bk.modal', function (e) {
			if (e.keyCode === 27) {
				self.closeModal();
			}
		});

	$(this.options.close).on('click.bk.modal', function () {
		self.closeModal();
	});
};

Modal.prototype.onClick = function (e) {

	var $dest = $('#' + this.options.modalId);

	this.openModal($dest);
};

Modal.prototype.openModal = function($dest) {
	// Add class to body for overlay
	$('body').addClass(this.options.bg);
	// Add open class to modal
	$dest.addClass(this.options.openClass);
};

Modal.prototype.closeModal = function () {
	// Remove class from body to remove overlay
	$('body').removeClass(this.options.bg);
	// Remove open class from modal
	$(this.options.modal).removeClass(this.options.openClass);
};

Modal.prototype.destroy = function () {
	$(document).off('.modal');
	$(this.options.close).off('.modal');
};

Bk.Modal = Modal;

// Expose as a jQuery Plugin
$.fn.bkModal = function (options) {
	return this.each(function () {
		var $el = $(this);
		// Check if it is already set up
		if (!$el.data('bkModal')) {
			$el.data('bkModal', new Modal(this, options));
		}
	});
};

// Allow defaults to be accessed via a common jQuery pattern
$.fn.bkModal.defaults = Modal.defaults;

// Auto-initialize if set
jQuery(function ($) {
	if (Bk.autoInitialize) {
		$('.' + Modal.defaults.className).bkModal();
	}
});

var OffCanvas = function () {
	this.init.apply(this, arguments);
};

OffCanvas.defaults = {
	className: 'off-canvas-contain',
	trigger: '[class^="off-canvas-trigger"]',
	leftOpenClass: 'off-canvas--open-left',
	rightOpenClass: 'off-canvas--open-right'
};

OffCanvas.prototype.init = function (el, options) {
	var self = this;
	
	// Store a reference to the jQuery element
	this.$el = $(el);

	// Set the options
	var options = this.options = $.extend({}, OffCanvas.defaults, options, this.$el.data('options'));

	// Add the class
	this.$el.addClass(options.className);

	$(document)
		.on('click.bk.offcanvas', function () {
			self.closeOffCanvas();
		})
		.on('click.bk.offcanvas', options.trigger, function (e) {
			var $this = $(this),
				$offCanvas = $this.parents('.off-canvas-contain');

			e.stopPropagation();
			e.preventDefault();

			if ($offCanvas.hasClass(options.leftOpenClass) || $offCanvas.hasClass(options.rightOpenClass)) {
				self.closeOffCanvas(options);
			} else {
				self.openOffCanvas(options, $this, $offCanvas);
			}
		})
		.on('click.bk.offcanvas', '.off-canvas-left', function (e) {
			e.stopPropagation();
		})
		.on('click.bk.offcanvas', '.off-canvas-right', function (e) {
			e.stopPropagation();
		});
};

OffCanvas.prototype.closeOffCanvas = function () {
	this.$el.removeClass('off-canvas--open-right').removeClass('off-canvas--open-left');
};

OffCanvas.prototype.openOffCanvas = function (options, $this, $offCanvas) {
	if ($this.hasClass('off-canvas-trigger-left')) {
		$offCanvas.addClass(options.leftOpenClass);
	} else if ($this.hasClass('off-canvas-trigger-right')) {
		$offCanvas.addClass(options.rightOpenClass);
	}
};

OffCanvas.prototype.destroy = function () {
	$(document).off(".offcanvas");
};

Bk.OffCanvas = OffCanvas;

// Expose as a jQuery Plugin
$.fn.bkOffCanvas = function (options) {
	return this.each(function () {
		var $el = $(this);
		// Check if it is already set up
		if (!$el.data('bkOffCanvas')) {
			$el.data('bkOffCanvas', new OffCanvas(this, options));
		}
	});
};

// Allow defaults to be accessed via a common jQuery pattern
$.fn.bkOffCanvas.defaults = OffCanvas.defaults;

// Auto-initialize if set
jQuery(function ($) {
	if (Bk.autoInitialize) {
		$('.' + OffCanvas.defaults.className).bkOffCanvas();
	}
});

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

	// Set the options
	this.options = $.extend({}, Tabs.defaults, options, this.$el.data('options'));

	// Add the class
	this.$el.addClass(this.options.className);

	this.$trigger = this.$el.find('li a');

	this.$trigger.on('click.bk.tabs', function (e) {
		var $this = $(this);

		e.preventDefault();
		
		self.doTabs($this);
	});
};

Tabs.prototype.doTabs = function ($this) {
	var $panelGroup = $this.parent().parent().next('.' + this.options.panelClass),
		$panel = $panelGroup.children('li'),
		triggerPos = $this.parent().index(),
		$matchingPanel = $panel.eq(triggerPos);

	// Remove all trigger active classes
	this.$trigger.parent().removeClass(this.options.activeTrigger);

	// Trigger active class
	$this.parent().addClass(this.options.activeTrigger);

	// Remove all panel active classes
	$panel.removeClass(this.options.activePanel);

	// Panel active class
	$matchingPanel.addClass(this.options.activePanel);
};

Tabs.prototype.destroy = function () {
	this.$trigger.off(".tabs");
};

Bk.Tabs = Tabs;

// Expose as a jQuery Plugin
$.fn.bkTabs = function (options) {
	return this.each(function () {
		var $el = $(this);
		// Check if it is already set up
		if (!$el.data('bkTabs')) {
			$el.data('bkTabs', new Tabs(this, options));
		}
	});
};

// Allow defaults to be accessed via a common jQuery pattern
$.fn.bkTabs.defaults = Tabs.defaults;

// Auto-initialize if set
jQuery(function ($) {
	if (Bk.autoInitialize) {
		$('.' + Tabs.defaults.className).bkTabs();
	}
});
var Toggle = function () {
	this.init.apply(this, arguments);
};

Toggle.defaults = {
	className: 'toggle-trigger',
	toggle: '',
	activeTriggerClass: 'toggle-trigger-shown',
	activeClass: 'toggle-shown',
	closeOnClick: false
};

Toggle.prototype.init = function (el, options) {
	var self = this;
	
	// Store a reference to the jQuery element
	this.$el = $(el);

	this.options = $.extend({}, Toggle.defaults, options, this.$el.data('options'));

	// Add the class
	this.$el.addClass(this.options.className);

	if (this.options.closeOnClick == true) {
		$(document).on('click', function (e) {
			$('#' + self.options.toggle).removeClass(self.options.activeClass);
		});

		$('#' + this.options.toggle).on('click', function (e) {
			e.stopPropagation();
		});
	}

	this.$el.on('click.bk.toggle', function (e) {
		var $this = $(this);

		e.preventDefault();
		e.stopPropagation();

		self.doToggle();
	});
};

Toggle.prototype.doToggle = function () {
	var self = this,
		$target = $('#' + this.options.toggle);

	// Toggle class on trigger element
	self.$el.toggleClass(this.options.activeTriggerClass);

	// Toggle class on element desired to be shown/hidden
	$target.toggleClass(this.options.activeClass);
};

Toggle.prototype.unToggle = function () {
	var self = this,
		$target = $('#' + this.options.toggle);

	$target.removeClass(this.options.activeClass);
};

Toggle.prototype.destroy = function () {
	this.$el.off(".toggle");
};

Bk.Toggle = Toggle;

// Expose as a jQuery Plugin
$.fn.bkToggle = function (options) {
	return this.each(function () {
		var $el = $(this);
		// Check if it is already set up
		if (!$el.data('bkToggle')) {
			$el.data('bkToggle', new Toggle(this, options));
		}
	});
};

// Allow defaults to be accessed via a common jQuery pattern
$.fn.bkToggle.defaults = Toggle.defaults;

// Auto-initialize if set
jQuery(function ($) {
	if (Bk.autoInitialize) {
		$('.' + Toggle.defaults.className).bkToggle();
	}
});
}(jQuery));