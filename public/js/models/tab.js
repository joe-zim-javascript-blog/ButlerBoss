define(
	['backbone'],
	function(Backbone) {

		var Tab = Backbone.Model.extend({
			defaults: {
				name: ''
			},

			initialize: function() {
				if (! this.get('name')) {
					this.set('name', this.cid);
				}
			}
		});

		return Tab;

	}
);