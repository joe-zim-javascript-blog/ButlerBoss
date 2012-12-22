define(
	['app'],
	function(App) {

		var MainController = {

			index: function() {
				console.log("MainController: index");
			},

			editServer: function(id) {
				console.log("MainController: edit");
			},

			addServer: function() {
				console.log("MainController: add");
			}

		};

		return MainController;

	}
);