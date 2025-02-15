// ✅ Embedded documents: Each collection contains multiple legal documents.
// ✅ Indexes: Searchable by title, tags, and category.
// ✅ Visibility options: Public collections are visible to all users.

import mongoose from 'mongoose';

const CollectionSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
    },
  title: { 
    type: String, 
    required: true 
    },
  description: { 
    type: String
     },
  category: { 
    type: String, 
    enum: ["Criminal", "Civil", "Corporate", "Family", "Intellectual Property"], 
    required: true 
    },
  tags: [
    { 
        type: String 
    }
    ], // Searchable tags
  visibility: { 
    type: String, 
    enum: ["public", "private"], 
    default: "private" },
    documents: [
    {
      documentId: { type: mongoose.Schema.Types.ObjectId },
      title: { type: String, required: true },
      fileUrl: { type: String, required: true }, // Cloudinary link
      summary: { type: String }, // AI-generated (optional)
      uploadDate: { type: Date, default: Date.now }
    }
  ],
},{ timestamps: true });

export default mongoose.models.Collection || mongoose.model("Collection", CollectionSchema);
