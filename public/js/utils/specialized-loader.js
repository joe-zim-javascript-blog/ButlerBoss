define(
	['underscore', 'utils/lazy-loader'],
	function(_, LazyLoader) {

		/**
		 * SpecializedLoader is a LazyLoader that is instantiated with a partial
		 * path, so that it only pulls modules from that path. In this way it
		 * becomes 'specialized' in the types of modules that exist at that path.
		 *
		 * After it is instantiated, it is used exactly the same way that LazyLoader
		 * is used, except that the paths that you send to `get` will be prefixed
		 * with the path that is sent to the constructor.
		 */
		var SpecializedLoader = function(prefix, suffix) {
			this.prefix = prefix;
			this.suffix = suffix;
		};

		_.extend(SpecializedLoader.prototype, {
			get: function() {
				var fileNames = Array.prototype.slice.call(arguments);
				var prefix = this.prefix ? this.prefix + "/" : "";
				var suffix = this.suffix ? "/" + this.suffix : "";

				fileNames = _.map(fileNames, function(fileName){
					return prefix + fileName + suffix;
				});

				return LazyLoader.get.apply(LazyLoader, fileNames);
			}
		});

		return SpecializedLoader;

	}
);