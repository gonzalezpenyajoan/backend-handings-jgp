import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["admin", "standard-user"],
        required: true
    }
});

const UserModel = model("User", UserSchema);
export default UserModel;