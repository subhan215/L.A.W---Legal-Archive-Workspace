// ✅ Future Feature: Lawyers/students can discuss case precedents.

import mongoose from 'mongoose';

const DiscussionSchema = new mongoose.Schema({
  collectionId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Collection", 
    required: true },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true },
  comment: { 
    type: String, 
    required: true },
  createdAt: { 
    type: Date, 
    default: Date.now }
},{ timestamps: true });


export default mongoose.models.Discussion || mongoose.model("Discussion", DiscussionSchema);
