import  mongoose from 'mongoose'
const Schema = mongoose.Schema;

const UserSchema = Schema({
    name: { type: String, required: true},
    password: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    phone: { type: String, required: true},
    age: { type: Number, required: true},
    gender: { type: String, required: true},
    hobby: { type: String, required: true},
    created: {
      type: Date,
      default: Date.now
    }
})

module.exports = mongoose.model('User', UserSchema)
