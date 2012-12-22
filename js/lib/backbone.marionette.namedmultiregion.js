define(
	['marionette'],
	function(Marionette) {

		var NamedMultiRegion = Marionette.NamedMultiRegion = Marionette.Region.extend({
			currentViews: [],
			nameIndex: [],

			open: function(view) {
				this.ensureEl();
				this.$el.append(view.el);
			},

			close: function(names){
				names = this._normalizeNames(names);
				var views = this._getViewsByNames(names);

				_.each(views, this._closeView, this);

				this._removeViews(names, views);
				Marionette.triggerMethod.call(this, "close", views);

				return this;
			},

			show: function(name, view) {
				this._throwErrorsForBadArguments(name, view);

				view.render();
				this.open(view);

				Marionette.triggerMethod.call(view, "show");
				Marionette.triggerMethod.call(this, "show", view);

				this.currentViews.push(view);
				this.nameIndex.push(name);

				return this;
			},

			_closeView: function(view) {
				if (view.close) {
					view.close();
					view.remove(); // just in case close doesn't remove too
				}
				else {
					// If it doesn't have a `close` method, at least remove them from the DOM with Backbone.View's `remove`
					view.remove();
				}

				Marionette.triggerMethod.call(this, "close", view);
			},

			_removeViews: function(names, views) {
				this.nameIndex = _.difference(this.nameIndex, names);
				this.currentViews = _.difference(this.currentViews, views);
			},

			attachView: function(name, view) {
				this._throwErrorsForBadArguments(name, view);
				this.open(view);

				this.currentViews.push(view);
				this.nameIndex.push(name);

				return this;
			},

			_normalizeNames: function (names) {
				if (typeof names === 'string') {
					// Convert it to an array
					names = [names];
				}
				else if (! _.isArray(names)) {
					// If no names were sent in or it wasn't a string/array, just use all of the names that we have stored up
					names = this.nameIndex;
				}
				return names;
			},

			_getViewsByNames: function(names) {
				var views = [],
					self = this;

				_.each(names, function(name){
					var index = _.indexOf(self.nameIndex, name);
					if (index >= 0) {
						views.push(self.currentViews[index]);
					}
				});

				return views;
			},

			_throwErrorsForBadArguments: function(name, view) {
				if (typeof name !== "string" || typeof view !== "object") {
					throw new Error("Please provide a string name and a view object");
				}

				if (_.contains(this.nameIndex, name)) {
					throw new Error("The name provided already exists. Names in NamedMultiRegions must be unique.");
				}

				if (_.contains(this.currentViews, view)) {
					throw new Error("The View provided already exists. Views in NamedMultiRegions must be unique.");
				}
			}
		});

		return NamedMultiRegion;

	}
);