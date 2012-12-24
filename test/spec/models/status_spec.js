define(
	['models/status', 'backbone'],
	function(Status, Backbone) {

/* SETUP */
		var VentMock = function(){};
		_.extend(VentMock.prototype, Backbone.Events);

		var SocketMock = function(){};
		_.extend(SocketMock.prototype, Backbone.Events, {
			emit: function() {}
		});

/* END SETUP */

/* TESTS */
		describe("Status Model", function() {
			beforeEach(function(){
				this.vent = new VentMock();
				spyOn(this.vent, 'on').andCallThrough();
				spyOn(this.vent, 'trigger').andCallThrough();

				this.socket = new SocketMock();
				spyOn(this.socket, 'on').andCallThrough();
				spyOn(this.socket, 'emit').andCallThrough();

				this.status = new Status({
					vent: this.vent,
					socket: this.socket
				});
			});

			it('should be initiated with socket and vent', function(){
				expect(this.status.vent).toBe(this.vent);
				expect(this.status.socket).toBe(this.socket);

				expect(this.vent.on).toHaveBeenCalled();
				expect(this.socket.on).toHaveBeenCalled();
			});

			describe("#getStatus", function() {
				it("should emit 'getStatus'", function() {
					this.status.getStatus();
					expect(this.socket.emit).wasCalledWith('getStatus');					
				});

				it("should be called when the socket connects", function() {
					this.socket.trigger('connect');
					expect(this.socket.emit).wasCalledWith('getStatus');
				});

				it("should be called when vent triggers 'status:get'", function() {
					this.vent.trigger('status:get');
					expect(this.socket.emit).wasCalledWith('getStatus');
				});
			});

			describe("#start", function() {
				it("should emit 'start'", function() {
					var mockServer = {
						get: function() {
							return 1;
						}
					};
					this.status.start(mockServer);
					expect(this.socket.emit).wasCalledWith('start', 1);
				});

				it("should be called when vent triggers 'server:start'", function() {
					var mockServer = {
						get: function() {
							return 1;
						}
					};
					this.vent.trigger('server:start', mockServer);
					expect(this.socket.emit).wasCalledWith('start', 1);
				});
			});

			describe("#stop", function() {
				it("should emit stop", function() {
					var mockServer = {
						get: function() {
							return 1;
						}
					};
					this.status.stop(mockServer);
					expect(this.socket.emit).wasCalledWith('stop', 1);
				});

				it("should be called when vent triggers 'server:stop", function() {
					var mockServer = {
						get: function() {
							return 1;
						}
					};
					this.vent.trigger('server:stop', mockServer);
					expect(this.socket.emit).wasCalledWith('stop', 1);
				});
			});

			describe("#issueCommand", function() {
				it("should emit 'command'", function() {
					var mockServer = {
						get: function() {
							return 1;
						}
					};
					this.status.issueCommand(mockServer, 'testCommand');
					expect(this.socket.emit).wasCalledWith('command', 1, 'testCommand');
				});

				it("should be called when vent triggers 'server:command'", function() {
					var mockServer = {
						get: function() {
							return 1;
						}
					};
					this.vent.trigger('server:command', mockServer, 'testCommand');
					expect(this.socket.emit).wasCalledWith('command', 1, 'testCommand');
				});
			});

			describe("#onConsole", function() {
				it("should trigger 'status:console'", function() {
					var mockObject = {};
					var text = "text";

					this.status.onConsole(mockObject, text);
					expect(this.vent.trigger).wasCalledWith('status:console', mockObject, text);
				});

				it("should be called when socket emits 'console'", function() {
					var mockObject = {};
					var text = "text";

					this.socket.trigger('console', mockObject, text);
					expect(this.vent.trigger).wasCalledWith('status:console', mockObject, text);
				});
			});

			describe("#onStatus", function() {
				it("should trigger 'status:received'", function() {
					var mockObject = {};

					this.status.onStatus(mockObject);
					expect(this.vent.trigger).wasCalledWith('status:received', mockObject);
				});

				it("should be called when socket emits 'status'", function() {
					var mockObject = {};

					this.socket.trigger('status', mockObject);
					expect(this.vent.trigger).wasCalledWith('status:received', mockObject);
				});
			});

			describe("#onFail", function() {
				it("should trigger 'status:fail'", function() {
					var mockErr = {};

					this.status.onFail(mockErr);
					expect(this.vent.trigger).wasCalledWith('status:fail', mockErr);
				});

				it("should be called when socket emits 'fail'", function() {
					var mockErr = {};

					this.socket.trigger('fail', mockErr);
					expect(this.vent.trigger).wasCalledWith('status:fail', mockErr);
				});
			});

		});
/* END TESTS */

});