define(
	['utils/communicator', 'backbone'],
	function(Communicator, Backbone) {

/* SETUP */
		var VentMock = function(){};
		_.extend(VentMock.prototype, Backbone.Events);

		var SocketMock = function(){};
		_.extend(SocketMock.prototype, Backbone.Events, {
			emit: function() {}
		});

/* END SETUP */

/* TESTS */
		describe("Communicator Model", function() {
			beforeEach(function(){
				this.vent = new VentMock();
				spyOn(this.vent, 'on').andCallThrough();
				spyOn(this.vent, 'trigger').andCallThrough();

				this.socket = new SocketMock();
				spyOn(this.socket, 'on').andCallThrough();
				spyOn(this.socket, 'emit').andCallThrough();

				this.communicator = new Communicator({
					vent: this.vent,
					socket: this.socket
				});
			});

			it('should be initiated with socket and vent', function(){
				expect(this.communicator.vent).toBe(this.vent);
				expect(this.communicator.socket).toBe(this.socket);

				expect(this.socket.on).toHaveBeenCalled();
			});

			describe("#getStatus", function() {
				it("should emit 'getStatus'", function() {
					this.communicator.getStatus();
					expect(this.socket.emit).wasCalledWith('getStatus', jasmine.any(Function));
				});

				it("should be called when the socket connects", function() {
					this.socket.trigger('connect');
					expect(this.socket.emit).wasCalledWith('getStatus', jasmine.any(Function));
				});
			});

			describe("#start", function() {
				it("should emit 'start'", function() {
					var mockServer = {
						get: function() {
							return 1;
						}
					};
					this.communicator.start(mockServer);
					expect(this.socket.emit).wasCalledWith('start', 1, jasmine.any(Function));
				});
			});

			describe("#stop", function() {
				it("should emit stop", function() {
					var mockServer = {
						get: function() {
							return 1;
						}
					};
					this.communicator.stop(mockServer);
					expect(this.socket.emit).wasCalledWith('stop', 1, jasmine.any(Function));
				});
			});

			describe("#issueCommand", function() {
				it("should emit 'command'", function() {
					var mockServer = {
						get: function() {
							return 1;
						}
					};
					this.communicator.issueCommand(mockServer, 'testCommand');
					expect(this.socket.emit).wasCalledWith('command', 1, 'testCommand', jasmine.any(Function));
				});
			});

			describe("#onConsole", function() {
				it("should trigger 'status:console'", function() {
					var mockObject = {};
					var text = "text";

					this.communicator.onConsole(mockObject, text);
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

					this.communicator.onStatus(mockObject);
					expect(this.vent.trigger).wasCalledWith('status:received', mockObject);
				});

				it("should be called when socket emits 'status'", function() {
					var mockObject = {};

					this.socket.trigger('status', mockObject);
					expect(this.vent.trigger).wasCalledWith('status:received', mockObject);
				});
			});

		});
/* END TESTS */

});