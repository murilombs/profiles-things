const toObjectId = require('mongodb').ObjectId
const mongoose = require('mongoose')

const Profile = mongoose.model('Profiles')
const mongodb = require('../config/mongodb')

const collection = 'users'

/** function to get User by ID */
exports.getByID = (id, callback) =>  {
    mongodb.connect((err, db) => {
        db.collection(collection).findOne({_id: toObjectId(id)}, callback)
    })
}

/** function to save a new profile */
exports.create = (data, callback) => {
    const profile = new Profile(data);
    mongodb.connect((err, db) => {
        db.collection(collection).insertOne(profile, callback)
    })
}

/** function to update a profile info */
exports.updateProfileByID = (id, update, callback) => {
    mongodb.connect((err, db) => {
        db.collection(collection).updateOne({_id: toObjectId(id)}, { 
            $set: {
                name: update.name,
                profilePicture: update.profilePicture,
            }}, callback)
    })
}

exports.disconnect = () => {
    return mongodb.disconnect()
}