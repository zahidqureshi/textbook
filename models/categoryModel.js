'use strict';

var mongoose = require('mongoose');

var categoryModel = function(){
	var categorySchema = mongoose.Schema({
		title: String,
	});

	return mongoose.model('Category', categorySchema);
}

module.exports = new categoryModel();