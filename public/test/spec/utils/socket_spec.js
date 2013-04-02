define(
	['utils/socket', 'backbone'],
	function(Socket, Backbone) {

/* SETUP */
		var Vent = function(){};
		_.extend(Vent.prototype, Backbone.Events);

		var options = {
			io: {
				port: '8080',
				'force new connection': true
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

				this.appSocket = new Socket(options);
			});

			afterEach(function() {
				this.appSocket.socket.disconnectSync();
			});

			it('is initialized', function(){
				expect(this.appSocket).not.toBeNull();
				expect(this.appSocket.vent).not.toBeNull();
				expect(this.appSocket.socket).not.toBeNull();
				expect(this.appSocket.socket.$events.connect).toBeTruthy();
				expect(this.appSocket.socket.$events.disconnect).toBeTruthy();
			});

			describe("#connect", function() {
				it("connects socket to Socket.IO server", function() {
					runs(function(){
						this.appSocket.connect();
					});

					waitsFor(function(){
						// Trust `isConnected` rather than checking Socket.IO's implementation
						// because if `isConnected` doesn't work, it'll show up in those tests
						// This is also the condition for the test to pass, so no `expect`
						return this.appSocket.isConnected();
					}, "The socket should connect", 750);
				});
			});

			describe("#disconnect", function() {
				it("disconnects socket from server", function() {
					runs(function() {
						this.appSocket.connect();
					});

					waitsFor(function(){
						// Trust `isConnected` rather than checking Socket.IO's implementation
						// because if `isConnected` doesn't work, it'll show up in those tests
						return this.appSocket.isConnected();
					}, "The socket should connect", 750);

					runs(function() {
						this.appSocket.disconnect();
					});

					waitsFor(function(){
						// Trust `isConnected` rather than checking Socket.IO's implementation
						// because if `isConnected` doesn't work, it'll show up in those tests
						// This is also the condition for the test to pass, so no `expect`
						return !this.appSocket.isConnected();
					}, "The socket should disconnect", 750);
				});
			});

			describe("#isConnected", function() {
				it("tells us we're disconnected before we connect", function() {
					expect(this.appSocket.isConnected()).toBeFalsy();
				});

				it("tells us we're connected after we connect", function() {
					runs(function() {
						this.appSocket.connect();
					});

					waitsFor(function(){
						// Look for internal implementation of `isConnected` since we're
						// testing to make sure `isConnected` matches it
						return this.appSocket.socket.connected;
					}, "The socket should connect", 750);

					runs(function() {
						expect(this.appSocket.isConnected()).toBeTruthy();
					});
				});

				it("tells us we're disconnected after we disconnect", function() {
					runs(function() {
						this.appSocket.connect();
					});

					waitsFor(function(){
						// Look for internal implementation of `isConnected` since we're
						// testing to make sure `isConnected` matches it
						return this.appSocket.socket.connected;
					}, "The socket should connect", 750);

					runs(function() {
						this.appSocket.disconnect();
					});

					waitsFor(function(){
						// Look for internal implementation of `isConnected` since we're
						// testing to make sure `isConnected` matches it
						return !this.appSocket.socket.connected;
					}, "The socket should disconnect", 750);

					runs(function() {
						expect(this.appSocket.isConnected()).toBeFalsy();
					});
				});
			});

			describe("#on", function() {
				var mock;

				beforeEach(function() {
					mock = {
						testFunc: function(){}
					};
					spyOn(mock, "testFunc");
				});

				it("adds events to the IO Socket", function() {
					this.appSocket.on('event', mock.testFunc, mock);

					expect(this.appSocket.socket.$events.event).not.toBeNull();
					expect(this.appSocket.socket.$events.event).not.toBeUndefined();
				});

				it("will call 'connect' event handlers when the socket connects", function() {
					runs(function() {
						this.appSocket.on('connect', mock.testFunc, mock);
						this.appSocket.connect();
					});

					waitsFor(function(){
						return this.appSocket.isConnected();
					}, "The socket should connect", 750);

					runs(function() {
						expect(mock.testFunc).wasCalled();
					});
				});

				it("will call 'connect' handler immediately when added if the socket is already connected", function() {
					runs(function() {
						this.appSocket.connect();
					});

					waitsFor(function(){
						return this.appSocket.isConnected();
					}, "The socket should connect", 750);

					runs(function() {
						this.appSocket.on('connect', mock.testFunc, mock);
						expect(mock.testFunc).wasCalled();
					});
				});

				it("will call 'disconnect' event handlers when the socket disconnects", function() {
					runs(function() {
						this.appSocket.on('disconnect', mock.testFunc, mock);
						this.appSocket.connect();
					});

					waitsFor(function(){
						return this.appSocket.isConnected();
					}, "The socket should connect", 750);

					runs(function() {
						this.appSocket.disconnect();
					});

					waitsFor(function(){
						return !this.appSocket.isConnected();
					}, "The socket should disconnect", 750);

					runs(function() {
						expect(mock.testFunc).wasCalled();
					});
				});
			});

			describe("#emit", function() {
				beforeEach(function() {
					spyOn(this.appSocket.socket, "emit").andCallThrough();
				});

				it("calls the real socket's emit with the same arguments plus a deferred resolver", function() {
					this.appSocket.emit('event', 'a test argument');

					expect(this.appSocket.socket.emit).wasCalledWith('event', 'a test argument', jasmine.any(Function));
				});
			});

			describe("#onConnect", function() {

				it("is called when the socket connects and triggers 'status:connected' on the vent", function() {
					// We can't spy on onConnect because it is already assigned to run on
					// 'connect' in the constructor, so the spy won't be run, the original will
					// be. So we just test to see if the effect of onConnect is carried out.
					runs(function() {
						this.appSocket.connect();
					});

					waitsFor(function(){
						return this.appSocket.isConnected();
					}, "The socket should connect", 750);

					runs(function() {
						expect(this.appSocket.vent.trigger).wasCalledWith('status:connected');
					});
				});
			});

			describe("#onDisconnect", function() {

				it("is called when the socket disconnects and triggers 'status:disconnected' on the vent", function() {
					// We can't spy on onDisconnect because it is already assigned to run on
					// 'disconnect' in the constructor, so the spy won't be run, the original will
					// be. So we just test to see if the effect of onDisconnect is carried out.
					runs(function() {
						this.appSocket.connect();
					});

					waitsFor(function(){
						return this.appSocket.isConnected();
					}, "The socket should connect", 750);

					runs(function() {
						this.appSocket.disconnect();
					});

					waitsFor(function(){
						return !this.appSocket.isConnected();
					}, "The socket should disconnect", 750);

					runs(function() {
						expect(this.appSocket.vent.trigger).wasCalledWith('status:disconnected');
					});
				});
			});
		});
/* END TESTS */

});