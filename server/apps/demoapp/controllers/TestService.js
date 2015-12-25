var Library = require("../../../lib/Library.js");

/*
 * Construct
 */
var TestServer = function(){};
TestServer.prototype = new Library.RestController();

/**
 * Configure
 */
TestServer.prototype.configure = function(){
	this.options.url = "test-service";
	
	this.options.methods.sayHello = {
			path : "say-hello/abcd"
			
	};
	
	this.options.methods.goodBye = {
			
	};
};

/**
 * 
 */
TestServer.prototype.sayHello = function(){
	return { message: "Hello"};
};

TestServer.prototype.goodBye = function(){
	return { message: "Good Bye!"};
};

/*
 * 
 * 
 * 
 */
var testServer = new TestServer();
testServer.install();
module.exports = testServer;