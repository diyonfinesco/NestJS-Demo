import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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
  })
  email: string;

  @Prop({
    required: true
  })
  password: string;

  @Prop({ required: true, default: 'ADMIN' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);