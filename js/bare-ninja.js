require.config({
	paths: {
		"jquery": "../bower_components/jquery/dist/jquery.min",
		"modernizir": "../bower_components/modernizir/modernizr",
		"app": "app"
	},
	shim: {
		"modernizir": {
			"exports": "modernizir"
		}
	}
});

define(["app"], function (App) {

	// Start the application
	var startApp = new App();

});