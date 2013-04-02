define(
	['jquery'],
	function($) {

		/**
		 * LazyLoader is a generic object for helping us lazy load modules with
		 * RequireJS.
		 *
		 * Usage:
		 * Simply call `get`, passing in an arbitrary number of string paths to 
		 * RequireJS modules. `get` will return a promise, which you can use to
		 * get access to the loaded modules when they are ready.
		 *
		 * LazyLoader.get('path/to/module1', 'module2').then(function(Mod1, Mod2){
		 *     // Use Mod1 and Mod2 however you like.
		 * });
		 */
		var LazyLoader = {
			get: function() {
				var fileNames = Array.prototype.slice.call(arguments);
				var dfd = $.Deferred();/*
				var path = this.type + "/";

				fileNames = _.map(fileNames, function(fileName){
					return path + fileName;
				});*/

				require(fileNames, function() {
					dfd.resolve.apply(dfd, arguments);
				});

				return dfd.promise();
			}
		};

		return LazyLoader;

	}
);