(function (Bk, $) {

  var OffCanvas = function () {
    this.init.apply(this, arguments);
  };

  OffCanvas.defaults = {
    className: 'off-canvas-contain',
    trigger: '.off-canvas-trigger',
    offCanvasContent: '.off-canvas',
    openClass: 'off-canvas--open'
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

        if ($offCanvas.hasClass(options.openClass)) {
          self.closeOffCanvas();
        } else {
          self.openOffCanvas($this, $offCanvas);
        }
      })
      .on('click.bk.offcanvas', options.offCanvasContent, function (e) {
        e.stopPropagation();
      });
  };

  OffCanvas.prototype.closeOffCanvas = function () {
    this.$el.removeClass(this.options.openClass);
  };

  OffCanvas.prototype.openOffCanvas = function ($this, $offCanvas) {
    $offCanvas.addClass(this.options.openClass);
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

}(Barekit, jQuery));
