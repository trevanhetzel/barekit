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
		// this.initAccordion();
	};

	// Instantiate Accordion
	App.prototype.initAccordion = function () {
		var setupAccordion = new Accordion();
	};

	return App;

});
