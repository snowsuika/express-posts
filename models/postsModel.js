const mongoose = require('mongoose');
const postsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, '姓名為必填'],
        },
        tags: [
            {
                type: String,
                required: [true, '貼文標籤為必填'],
            },
        ],
        type: {
            type: String,
            enum: ['group', 'person'],
            required: [true, '貼文類型為必填'],
        },
        image: {
            type: String,
            default: '',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        content: {
            type: String,
            required: [true, 'Content 為必填'],
        },
        likes: {
            type: Number,
            default: 0,
        },
        comments: {
            type: Number,
            default: 0,
        },
    },
    { versionKey: false }
);

const posts = mongoose.model('posts', postsSchema);

module.exports = posts;
