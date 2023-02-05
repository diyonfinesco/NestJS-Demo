import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ROLE } from 'src/common/enums';
import { Token } from 'src/common/types';
import validator from 'validator'
import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: [true, 'first name is required!'],
    maxlength: 15,
    trim: true,
  })
  firstName: string;

  @Prop({
    lowercase: true,
    trim: true,
    maxlength: 20,
    required: [true, 'last name is required!'],
  })
  lastName: string;

  @Prop({
    unique: true,
    lowercase: true,
    trim: true,
    validate(value: string) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid!");
      }
    },
  })
  email: string;

  @Prop({
    required: true,
    validate(value: string) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('password cannot contain "password"');
      }
    },
  })
  password: string;

  @Prop({
    default: ROLE.CUSTOMER,
    enum: ROLE,
    required: true
  })
  role: string;

  @Prop({
    required: true
  })
  tokens: Token[]
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.createdAt;
  delete userObject.updatedAt;
  delete userObject.__v;

  return userObject;
};

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  next();
});