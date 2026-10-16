import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const blogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    excerpt: { type: String },
    image: { type: String },
    category: { type: String, default: 'General' },
    author: { type: String, default: 'Admin' },
    authorImage: { type: String },
    tags: [{ type: String }],
    comments: [commentSchema],
    createdAt: { type: Date, default: Date.now }
});

const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', blogPostSchema);
export default BlogPost;
