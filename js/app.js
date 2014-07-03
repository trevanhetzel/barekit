jQuery(function ($) {
	// Sticky subnav
	var $window = $(window),
		$subNav = $('.subnav'),
		$features = $('.subnav-features'),
		$setup = $('.subnav-setup'),
		$usage = $('.subnav-usage'),
		$header = $('.header'),
		$icon = $('.hero-icon'),
		scrollTop = null,
		startPoint = null,
		offset = null;

	$window.on('scroll', function () {
		scrollTop = $window.scrollTop();
		startPoint = $('#jsScrollStart').position().top,
		offset = scrollTop - startPoint;

		// Push header off the page when it reaches subnav
		if (scrollTop >= startPoint) {
			$header.css('top', - offset);
		} else if (scrollTop <= startPoint) {
			$header.css('top', '0');
		}

		// Make subnav sticky once user has scrolled to it
		if (scrollTop >= (startPoint + 105)) {
			$subNav.addClass('subnav--sticky');
		} else if (scrollTop <= (startPoint + 105)) {
			$subNav.removeClass('subnav--sticky');
			$features.removeClass('subnav--active');
		}

		// Active subnav class for Features
		if (scrollTop >= $('#jsScrollStart').position().top + 105) {
			$features.addClass('subnav--active');
			$usage.removeClass('subnav--active');
			$setup.removeClass('subnav--active');
		}

		// Active subnav class for Setup
		if (scrollTop >= $('#jsSetup').position().top + 50) {
			$features.removeClass('subnav--active');
			$usage.removeClass('subnav--active');
			$setup.addClass('subnav--active');
		}

		// Active subnav class for Usage
		if (scrollTop >= $('#jsUsage').position().top) {
			$setup.removeClass('subnav--active');
			$usage.addClass('subnav--active');
		}

		// Scroll up icon
		if (scrollTop >= (startPoint - 100)) {
			$icon.css('top', - (offset + 100)).addClass('neeeeked');
		} else if (scrollTop <= (startPoint - 100)) {
			$icon.css('top', '0').removeClass('neeeeked');
		}
	})
});