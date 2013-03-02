define(
	['lib/backbone.marionette.namedmultiregion', 'backbone'],
	function(Region, Backbone) {

/* SETUP */
		function clearSandbox() {
			document.getElementById('sandbox').innerHTML = '';
		}

		var View = Backbone.View.extend({
			tagName: 'p',

			render: function() {
				this.$el.html('hello from '+this.cid);
			}
		});
/* END SETUP */

/* TESTS */
		describe("Named Multi Region", function() {
			var region = new Region({el:'#sandbox'});
			var view1 = new View();
			var view2 = new View();

			beforeEach(function(){
				region.reset();
			});

			afterEach(function() {
				clearSandbox();
			});

			describe('#show', function() {

				beforeEach(function(){
					region.show('view1', view1);
					region.show('view2', view2);
				});

				it('should add views', function(){
					expect(region.viewStore.contains(view1)).toBe(true);
					expect(region.viewStore.contains(view2)).toBe(true);
					expect(region.viewStore.length).toBe(2);
				});

				it('should add names', function(){
					expect(region.viewStore.findByCustom('view1')).toBe(view1);
					expect(region.viewStore.findByCustom('view2')).toBe(view2);
				});

				it('should render the views', function(){
					var el = region.$el;

					expect(el.children().length).toBe(2);
					expect(el.children('p').length).toBe(2);
				});

				it('should throw an error if the arguments aren\'t correct', function(){
					var noName = function() {
						region.show(new View());
					};

					var noView = function() {
						region.show('view');
					};

					var noArgs = function() {
						region.show();
					};

					var wrongOrder = function() {
						region.show(new View(), 'view');
					};

					expect(noName).toThrow();
					expect(noView).toThrow();
					expect(noArgs).toThrow();
					expect(wrongOrder).toThrow();
				});

			});

			describe('#close', function() {

				beforeEach(function(){
					region.show('view1', view1);
					region.show('view2', view2);
				});

				it('should remove a view if a view name is provided', function(){
					region.close('view1');

					expect(region.viewStore.length).toBe(1);
					expect(region.viewStore.contains(view1)).toBe(false);
				});

				it('should unrender a view if a view name is provided', function(){
					region.close('view1');
					var el = region.$el;

					expect(el.children().length).toBe(1);
				});

				it('should remove 2 views if an array of 2 view names is provided', function(){
					region.close(['view1','view2']);

					expect(region.currentViews.length).toBe(0);
					expect(region.currentViews).not.toContain(view1);
					expect(region.currentViews).not.toContain(view2);
				});

				it('should remove 2 view names if an array of 2 view names is provided', function(){
					region.close(['view1','view2']);

					expect(region.nameIndex.length).toBe(0);
					expect(region.nameIndex).not.toContain('view1');
					expect(region.nameIndex).not.toContain('view2');
				});

				it('should unrender 2 views if an array of 2 view names is provided', function(){
					region.close(['view1','view2']);
					var el = region.$el;

					expect(el.children().length).toBe(0);
				});

				it('should remove all views if no argument is provided', function(){
					region.close();

					expect(region.currentViews.length).toBe(0);
					expect(region.currentViews).not.toContain(view1);
					expect(region.currentViews).not.toContain(view2);
				});

				it('should remove all view names if no argument is provided', function(){
					region.close();

					expect(region.nameIndex.length).toBe(0);
					expect(region.nameIndex).not.toContain('view1');
					expect(region.nameIndex).not.toContain('view2');
				});

				it('should unrender all views if no argument is provided', function(){
					region.close();
					var el = region.$el;

					expect(el.children().length).toBe(0);
				});

			});

			describe('#attachView', function() {

				it('should add a view', function(){
					region.attachView('view1', view1);

					expect(region.viewStore.contains(view1)).toBe(true);
					expect(region.viewStore.length).toBe(1);

					region.attachView('view2', view2);

					expect(region.viewStore.contains(view2)).toBe(true);
					expect(region.viewStore.length).toBe(2);
				});

				it('should add names', function(){
					region.attachView('view1', view1);
					region.attachView('view2', view2);

					expect(region.viewStore.findByCustom('view1')).toBe(view1);
					expect(region.viewStore.findByCustom('view2')).toBe(view2);
				});

				it('should not render the view', function(){
					var view = new View();
					spyOn(view, 'render');

					region.attachView('view3', view);

					expect(view.render).not.toHaveBeenCalled();
				});

				it('should throw an error if the arguments aren\'t correct', function(){
					var noName = function() {
						region.attachView(new View());
					};

					var noView = function() {
						region.attachView('view');
					};

					var noArgs = function() {
						region.attachView();
					};

					var wrongOrder = function() {
						region.attachView(new View(), 'view');
					};

					expect(noName).toThrow();
					expect(noView).toThrow();
					expect(noArgs).toThrow();
					expect(wrongOrder).toThrow();
				});

			});

		});
/* END TESTS */

});