/*
 * Utils
 */

var Utils = function(){
	
};

/**
 * @Public
 * @Static
 */
Utils.hyphenize = function(str){
	return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

module.exports = Utils;