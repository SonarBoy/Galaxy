var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var userModel = require('../model/User');

var email = require('../../email-Util');
var passport = require('passport');


module.exports.getUserList = (request,response,next) =>
{

    /*
        Model.find()
        + The filter are cast to their respective SchemaTypes before the command is sent.

            - filter: Object

            - projection: Object optional fields to return see
                Query.prototype.select() = Specifies which document fields to include or exclude.
                "-" flag will exclude document fields.
                "+" flag will include document fields.


            - options: Object optional see
                Query.prototype.setOptions() = Sets query options.
                - tailable
                - sort
                - limit
                - skip
                - maxscan
                - batchSize
                - comment
                - snapshot
                - readPreference
                - hint

            - callback: Function
    */


    userModel.User.find((error,userList) =>{

        if(error){
            return console.error(error);
        }else{
            response.json({success:true,msg:"User Found",userList: userList});
        }

    });
}

module.exports.getAddUser = (request,response,next) =>
{
    /*
        .json() method of the Body mixin takes a Response stream and reads it to completion.
        returns a promise that resolves with the result of parsing the body text as JSON.

        Promise = represents the eventual completion (or failure) of an asynchronous operation
        and its resulting value.
    */

    response.json({success:true,msg:"Successfully Displayed Add Page"});
}

module.exports.postAddUser = (request,response,next) =>
{
    var newUser = new userModel.User({
        username: request.body.username,
        email:request.body.email,
        displayName: request.body.displayName
    });

    userModel.User.register(
        newUser,
        request.body.password,
        (error) => {

            if(error){
                console.log('Error: Inserting new user.' + newUser);
                console.log(error);

                if(error.name == "UserExistsError"){
                    console.log('Registration Error: User already exists.');
                }

                return error;
            }else{
                response.json({success:true,msg:"Successfully added new contact!"});
            }
        }
    )
}

module.exports.getEditUser = (request,response,next) =>
{

}

module.exports.postEditUser = (request,response,next) =>
{

}

module.exports.getDeleteUser = (request,response,next) =>
{

}

module.exports.forgotPasswordGet = (request,response,next) =>
{

}