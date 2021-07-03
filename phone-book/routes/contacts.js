const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const session = require('express-session');
const Contact = require("../models/Contact");

router.post('/add-new', (req, res) => {
    const createdBy = req.user.name;
    const contact = req.body['contact'];
    const phone = req.body['phone'];
    const newContact = new Contact({
        name: contact,
        phone: phone,
        createdBy: createdBy
    })
    newContact.save()
        .then(data => {
           console.log("nice a");
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Contact."
        });
    });
    res.redirect('/')
})
router.get('/delete-contact/:id', function (req, res) {
    console.log("DELETE review")
    Contact.findByIdAndRemove(req.params.id).then((review) => {
        res.redirect('/');
    }).catch((err) => {
        console.log(err.message);
    })
})
router.post('/update-contact/:id', function (req, res) {
  console.log(req.params.id + ' ' + req.body['newcontact'] + ' ' + req.body['newphone']);
    var filter = { _id: req.params.id };
    var update = { name: req.body['newcontact'], phone: req.body['newphone'] };
    Contact.findByIdAndUpdate(filter, update,
        function(err) {
            if (err) {
                res.send(err);
                return;
            }
            res.redirect('/');
        });
})

module.exports = router;
