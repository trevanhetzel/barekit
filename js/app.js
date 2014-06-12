define([
	"modules/accordion",
	"modules/carousel",
	"modules/dropdown",
	"modules/modal",
	"modules/off-canvas",
	"modules/tab",
	"modules/validation",
], function (
	Accordion, 
	Carousel,
	Dropdown,
	Modal,
	OffCanvas,
	Tab,
	Validation
) {

	var App = function () {
		this.initAccordion();
		this.initCarousel();
	};

	// Instantiate Accordion
	App.prototype.initAccordion = function () {
		var setupAccordion = new Accordion();
	};

	// Instantiate Carousel
	App.prototype.initCarousel = function () {
		var setupAccordion = new Carousel();
	};

	return App;

});
