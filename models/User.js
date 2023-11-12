import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    roles: {
      type: Array,
      default: false,
    },
    lastTokenSent: {
      type: String,
      default: false,
    },
    resetPasswordToken: {
      type: String,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model('User', UserSchema);
