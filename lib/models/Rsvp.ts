import mongoose, { Schema, Document } from 'mongoose'

export interface IRsvp extends Document {
  name: string
  email: string
  phone?: string
  ticketType: 'general' | 'press' | 'influencer' | 'vip'
  dietaryRequirements?: string
  company?: string
  createdAt: Date
}

const RsvpSchema = new Schema<IRsvp>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    ticketType: {
      type: String,
      enum: ['general', 'press', 'influencer', 'vip'],
      default: 'general',
    },
    dietaryRequirements: String,
    company: String,
  },
  {
    timestamps: true, 
  }
)


export default mongoose.models.Rsvp ||
  mongoose.model<IRsvp>('Rsvp', RsvpSchema)