(function (root, factory) {
  if (typeof exports === 'object') {

    var marionette = require('marionette');
    var babysitter = require('babysitter');
    var underscore = require('underscore');

    module.exports = factory(marionette, babysitter, underscore);

  } else if (typeof define === 'function' && define.amd) {

    define(['marionette', 'babysitter', 'underscore'], factory);

  }
}(this, function(Marionette, BabySitter, _) {

		var NamedMultiRegion = Marionette.NamedMultiRegion = Marionette.Region.extend({
			currentViews: [],
			nameIndex: [],
			viewStore: null,

			initialize: function() {
				this.viewStore = new BabySitter();
			},

			open: function(view) {
				this.ensureEl();
				this.$el.append(view.el);
			},

			close: function(names){
				var views = [];

				if (_.isString(names) || _.isArray(names)) { // Close specific views
					if (_.isString(names)) {
						names = [names];
					}

					_.each(names, function(name) {
						var view = this.viewStore.findByCustom(name);
						views.push(view);

						this._closeView(view);
						this._removeView(view);
					}, this);
				}
				else { // Close all of the views
					this.viewStore.each(function(view){
						views.push(view);
						this._closeView(view);
						this._removeView(view);
					}, this);
				}

				Marionette.triggerMethod.call(this, "close", views);

				return this;
			},

			show: function(name, view) {
				this._throwErrorsForBadArguments(name, view);

				view.render();
				this.open(view);

				Marionette.triggerMethod.call(view, "show");
				Marionette.triggerMethod.call(this, "show", view);

				this.viewStore.add(view, name);

				return this;
			},

			attachView: function(name, view) {
				this._throwErrorsForBadArguments(name, view);
				this.open(view);

				this.viewStore.add(view, name);
				return this;
			},

			_closeView: function(view) {
				if (_.isFunction(view.close)) {
					view.close();
				}

				if (_.isFunction(view.remove)) {
					view.remove();
				}

				Marionette.triggerMethod.call(this, "close", view);
			},

			_removeView: function(view) {
				this.viewStore.remove(view);
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
				if ( !_.isString(name) || !_.isObject(view)) {
					throw new Error("Please provide a string name and a view object");
				}
			}
		});

		return NamedMultiRegion;

	}
));