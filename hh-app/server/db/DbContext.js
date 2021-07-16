import mongoose from 'mongoose'
import { Haunting } from '../models/Haunting'
import { Testimony } from '../models/Testimony'
import { AccountSchema } from '../models/Account'

class DbContext {
  Haunting = mongoose.model('Haunting', Haunting);
  Account = mongoose.model('Account', AccountSchema);

  Testimony = mongoose.model('Testimony', Testimony);
}

export const dbContext = new DbContext()
