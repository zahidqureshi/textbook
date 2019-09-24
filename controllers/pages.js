'use strict';

var Book = require('../models/bookModel');


module.exports = function (router) {
    router.get('/about', function (req, res) { 
        res.render('pages/about');  
    });  

    router.get('/contact', function (req, res) { 
        res.render('pages/contact');  
    });
    router.get('/shop', function (req, res) { 
        Book.find({}, function(err, books){
        	if(err){
        		console.log(err);
        	}
        	var model = {
        		books:books
        	}
        	res.render('pages/shop', model);
        }); 
    });
};


