import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const Haunting = new Schema(
  {
    location: {
      address: { type: String, required: true },
      lat: { type: Number, required: true },
      long: { type: Number, required: true }
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
Haunting.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
