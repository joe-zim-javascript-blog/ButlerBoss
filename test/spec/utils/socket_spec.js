define(
	['utils/socket', 'backbone'],
	function(Socket, Backbone) {

/* SETUP */
		var Vent = function(){};
		_.extend(Vent.prototype, Backbone.Events);

		var options = {
			appUrl: 'http://localhost',
			io: {
				port: '8080',
				forceNewConnection: true,

			}
		};
/* END SETUP */

/* TESTS */
		describe("Socket Utility", function() {
			beforeEach(function(){
				this.vent = new Vent();
				spyOn(this.vent, "on").andCallThrough();
				spyOn(this.vent, "trigger").andCallThrough();

				options.vent = this.vent;

				this.socket = new Socket(options);
			});

			afterEach(function() {
				this.socket.socket.disconnectSync();
			});

			it('is initialized', function(){
				expect(this.socket).not.toBeNull();
				expect(this.socket.vent).not.toBeNull();
				expect(this.socket.socket).not.toBeNull();
				expect(this.socket.socket.$events.connect).toBeTruthy();
				expect(this.socket.socket.$events.disconnect).toBeTruthy();
			});

			describe("#connect", function() {
				it("connects socket to Socket.IO server", function() {
					runs(function(){
						this.socket.connect();
					});

					waitsFor(function(){
						// Trust `isConnected` rather than checking Socket.IO's implementation
						// because if `isConnected` doesn't work, it'll show up in those tests
						// This is also the condition for the test to pass, so no `expect`
						return this.socket.isConnected();
					}, "The socket should connect", 500);
				});
			});

			describe("#disconnect", function() {
				it("disconnects socket from server", function() {
					runs(function() {
						this.socket.connect();
					});

					waitsFor(function(){
						// Trust `isConnected` rather than checking Socket.IO's implementation
						// because if `isConnected` doesn't work, it'll show up in those tests
						return this.socket.isConnected();
					}, "The socket should connect", 500);

					runs(function() {
						this.socket.disconnect();
					});

					waitsFor(function(){
						// Trust `isConnected` rather than checking Socket.IO's implementation
						// because if `isConnected` doesn't work, it'll show up in those tests
						// This is also the condition for the test to pass, so no `expect`
						return !this.socket.isConnected();
					}, "The socket should disconnect", 500);
				});
			});

			describe("#isConnected", function() {
				it("tells us we're disconnected before we connect", function() {
					expect(this.socket.isConnected()).toBeFalsy();
				});

				it("tells us we're connected after we connect", function() {
					runs(function() {
						this.socket.connect();
					});

					waitsFor(function(){
						// Look for internal implementation of `isConnected` since we're
						// testing to make sure `isConnected` matches it
						return this.socket.socket.connected;
					}, "The socket should connect", 500);

					runs(function() {
						expect(this.socket.isConnected()).toBeTruthy();
					});
				});

				it("tells us we're disconnected after we disconnect", function() {
					runs(function() {
						this.socket.connect();
					});

					waitsFor(function(){
						// Look for internal implementation of `isConnected` since we're
						// testing to make sure `isConnected` matches it
						return this.socket.socket.connected;
					}, "The socket should connect", 500);

					runs(function() {
						this.socket.disconnect();
					});

					waitsFor(function(){
						// Look for internal implementation of `isConnected` since we're
						// testing to make sure `isConnected` matches it
						return !this.socket.socket.connected;
					}, "The socket should disconnect", 500);

					runs(function() {
						expect(this.socket.isConnected()).toBeFalsy();
					});
				});
			});

			describe("#on", function() {
				beforeEach(function() {
					this.mock = {
						testFunc: function(){}
					};

					spyOn(this.mock, "testFunc");
				});
			});
		});
/* END TESTS */

});