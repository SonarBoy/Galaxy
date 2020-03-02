var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

/* mongoose.Schema 
- Each schema maps to a MongoDB collection and defines the shape
  of the documents within that collection.
*/
var UserSchema = mongoose.Schema({
    username:{
        type: String,
        default: '',
        trim: true,
        required: 'Username is required.'
    },
    //password will be encrypted by passport local mongoose.
    email:{
        type: String,
        default: '',
        trim: true,
        required: 'Email is required.'
    },
    displayName:{
        type: String,
        default: '',
        trim: true,
        required: 'Display name is required.'
    },
    created:{
        type: Date,
        default: Date.now
    },
    update:{
        type: Date,
        default: Date.now
    },
},{
    collection: "PassportUsers"
});

//Configure options for the User Schema
var options = ({
    missingPasswordError: "Wrong / Missing Password"
});


/*
    Schemas are pluggable that is they allow for applying pre-packaged 
    capabilities to extend their functionality.

    Mongoose.prototype.plugin()
    Parameters

        fn «Function» plugin callback
        [opts] «Object» optional options

    Returns:

        «Mongoose» this

    Declares a global plugin executed on all Schemas.
    Equivalent to calling .plugin(fn) on each Schema you create.
*/ 
UserSchema.plugin(passportLocalMongoose,options);


module.exports.User = mongoose.model('Users',UserSchema);