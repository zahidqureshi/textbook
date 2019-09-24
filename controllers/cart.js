'use strict';

var Book = require('../models/bookModel');
var Category = require('../models/categoryModel');

module.exports = function (router) {
    router.get('/', function (req, res) { 

    var cart = req.session.cart;
    var displayCart = {items:[], total:0, discounted_js:0}
    var total = 0;
    var discounted_js = 0;
    
    for(var item in cart){
        displayCart.items.push(cart[item]);
        total += (cart[item].qty * cart[item].price);
    }  
    displayCart.total = total;
    displayCart.discounted_js = total - 0.3*total;
    res.render('cart/index', {
        cart: displayCart
    });

    });

    router.post('/:id', function(req, res){
        req.session.cart = req.session.cart || {};
        var cart = req.session.cart;

        Book.findOne({_id:req.params.id}, function(err, book){
            if(err){
                console.log(err);
            }

            if(cart[req.params.id]){
                cart[req.params.id].qty++;
                cart[req.params.id].qtprice = cart[req.params.id].qty * cart[req.params.id].price;
            }else{
                cart[req.params.id] ={
                    item: book._id,
                    title:book.title,
                    price:book.price,
                    cover:book.cover,
                    qtprice: book.price,
                    qty:1
                }
            }

            res.redirect('/cart');
        });
    });

    router.get('/delete/:id', function(req, res){
        req.session.cart = req.session.cart || {};
        var cart = req.session.cart;

        if(cart[req.params.id]){
            delete cart[req.params.id];
            
        }

        res.location('/cart');
        res.redirect('/cart');
    }); 
}