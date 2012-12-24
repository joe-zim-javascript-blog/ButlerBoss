define(
	['utils/socket', 'backbone'],
	function(Socket, Backbone) {

/* SETUP */
		var options = {
			ioHost: 'http://localhost',
			ioPort: '8080'
		};
/* END SETUP */

/* TESTS */
		describe("Socket Utility", function() {
			beforeEach(function(){

			});

			it('should work', function(){
				expect(1);
			});

			describe("#method", function() {
				it("should work", function() {
					expect(1);
				});
			});

		});
/* END TESTS */

});