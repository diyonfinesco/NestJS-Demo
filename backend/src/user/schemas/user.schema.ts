import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ROLE, Token } from 'src/common/interfaces';
import validator from 'validator'

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    lowercase: true,
    trim: true,
    maxlength: 15,
    required: true
  })
  firstName: string;

  @Prop({
    lowercase: true,
    trim: true,
    maxlength: 20,
    required: true,
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