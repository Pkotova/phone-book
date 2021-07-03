const express = require('express');
const Contact = require("../models/Contact");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    return Contact.find( {createdBy: req.user.name},function( err, contact ) {
        if( !err ) {
            res.render('dashboard', {
                contact: contact,
                user: req.user
            });
        } else {
            return console.log( err );
        }
    });
});

module.exports = router;
