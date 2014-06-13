jQuery(document).ready (function ($) {

	// Cache jQuery objects/set variables
	var $modal = $('.modal'),
		$trigger = $('.modal-trigger'),
		$document = $(document),
		$body = $('body'),
		$dest = '',
		$close = $('.modal-close');

	var Modal = function () {
		this.init();
	};

	// Handle click events
	Modal.prototype.init = function () {
		var self = this;

		$trigger.on('click', function (e) {
			e.preventDefault();
			var $this = $(this),
				options = $this.data('options');

			$dest = $('#' + options.modalId);

			self.openModal($body, $dest);
			
		});

		$document
			// Close modal on any document click...
			.on('click', function () {
				self.closeModal();
			})
			// ...except if click is on trigger...
			.on('click', '.modal-trigger', function (e) {
				e.stopPropagation();
			})
			// ...or the open modal itself
			.on('click', '.modal', function (e) {
				e.stopPropagation();
			});

		$close.on('click', function () {
			self.closeModal();
		});
	};

	// Open modal
	Modal.prototype.openModal = function () {
		var self = this;
		// Add class to body for overlay
		$body.addClass('modal-bg');
		// Add open class to modal
		$dest.addClass('modal-open');
	};

	// Close modal
	Modal.prototype.closeModal = function () {
		// Remove class from body to remove overlay
		$body.removeClass('modal-bg');
		// Remove open class from modal
		$modal.removeClass('modal-open');
	};

	// Create new Modal object
	new Modal;

});