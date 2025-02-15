//✅ Indexes: Unique index on email for faster queries.
// ✅ Security: Passwords will be hashed before saving
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
    },
  email: { 
    type: String, 
    required: true, 
    unique: true 
    },
  passwordHash: { 
    type: String, 
    required: true 
    },
  profilePicture: { 
    type: String, default: "" 
    }, 
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
