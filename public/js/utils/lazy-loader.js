define(
	['underscore', 'jquery'],
	function(_, $) {

		/**
		 * LazyLoader is a generic class for helping us lazy load modules with
		 * RequireJS.
		 *
		 * Usage:
		 * First we create a new LazyLoader object. We pass in a 'type' which will be used
		 * as a path prefix:
		 * var getter = new LazyLoader('utils');
		 *
		 * Now if you wish to get a module from the 'utils' directory, you can use this
		 * getter just by passing in the file name:
		 * var promise = getter.get('communicator');
		 *
		 * That will retreive utils/communicator.js using RequireJS. `get` returns a promise,
		 * so you can use `then` to actually extract the module:
		 * var module;
		 * promise.then(function(retreivedModule){
		 *	module = retreivedModule;
		 * });
		 *
		 * You can also send in multiple strings to get multiple modules at once:
		 * getter.get('communicator', 'socket').then(function(Communicator, Socket) {
		 *  // Do stuff with both Communicator and Socket
		 * });
		 */
		var LazyLoader = function(type) {
			this.type = type;
		};

		_.extend(LazyLoader.prototype, {
			get: function() {
				var fileNames = Array.prototype.slice.call(arguments);
				var dfd = $.Deferred();
				var path = this.type + "/";

				fileNames = _.map(fileNames, function(fileName){
					return path + fileName;
				});

				require(fileNames, function() {
					dfd.resolve.apply(dfd, arguments);
				});

				return dfd.promise();
			}
		});

		return LazyLoader;

	}
);