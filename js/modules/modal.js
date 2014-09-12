(function (Bk, $) {

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

}( Barekit, jQuery ));
