const { Schema, mongoose } = require("mongoose");

const postSchema = new Schema({
    id: { type: String, required: true },
    creator: {
        id: { type: String, required: true },
        displayName: { type: String, required: true },
        nickName: { type: String },
        avatarURL: { type: String },
    },
    status: { type: String, enum: ['PUBLISHED'], required: true },
    to: {
        name: { type: String },
    },
    from: {
        name: { type: String },
    },
    photo: {
        mainSrc: { type: String },
        thumbnailSrc: { type: String },
        alt: { type: String },
    },
    text: { type: String },
    createdOn: { type: String },
    updatedOn: { type: String },
    statistics: {
        id: { type: String },
        views: { type: Number, default: 0 },
        likes: { type: Number, default: 0 },
        dislikes: { type: Number, default: 0 },
        replies: { type: Number, default: 0 },
        repeats: { type: Number, default: 0 },
        saves: { type: Number, default: 0 },
        flags: { type: Number, default: 0 },
        state: { type: String, enum: ['NEITHER'], default: 'NEITHER' },
        hasReplied: { type: Boolean, default: false },
        hasRepeated: { type: Boolean, default: false },
        hasSaved: { type: Boolean, default: false },
        hasFlagged: { type: Boolean, default: false },
    },
    tags: [
        {
            slug: { type: String },
        },
    ],
    parent: {
        id: { type: String },
    },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;