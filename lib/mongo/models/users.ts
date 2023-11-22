import mongoose from 'mongoose';

interface IUser {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String }
});

const User = mongoose.models.users || mongoose.model('users',userSchema)

export default User;