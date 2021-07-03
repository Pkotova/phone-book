const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    createdBy:{
        type: String,
        required: [true, 'Contact requires creator']
    }
});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;
