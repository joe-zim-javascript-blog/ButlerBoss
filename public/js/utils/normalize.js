define(
	[],
	function() {

		var normalizer = {
			hyphenate: function(original) {
				var altered =  original.replace(/\s/gi, "-");
				return altered;
			}
		};

		return normalizer;

	}
);