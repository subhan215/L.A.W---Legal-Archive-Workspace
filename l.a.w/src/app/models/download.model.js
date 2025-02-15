// ✅ Purpose: Track who downloaded what for analytics.
// ✅ Access Control: Only logged-in users can download.


import mongoose from 'mongoose';


const DownloadSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  documentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true },
  downloadDate: { 
    type: Date, 
    default: Date.now }
},{ timestamps: true });

export default mongoose.models.Download || mongoose.model("Download", DownloadSchema);

