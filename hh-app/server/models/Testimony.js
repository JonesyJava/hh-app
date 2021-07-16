import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const Testimony = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    likes: [{ type: String, ref: 'Account' }]
  },
  { timestamps: true, toJSON: { virtuals: true } }

)
Testimony.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
