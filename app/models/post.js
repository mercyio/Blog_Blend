const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const PostSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
  
    title:{
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },

    tags: {
    type: [String],
    // required: true    
    },

    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', PostSchema)