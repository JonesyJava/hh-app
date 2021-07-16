import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class HauntingsService {
  async findHauntings(query = {}) {
    const haunting = await dbContext.Haunting.find(query).populate('creator')
    return haunting
  }

  async findHauntingById(id) {
    const haunting = await dbContext.Haunting.findById(id).populate('creator')
    if (!haunting) {
      throw new BadRequest('Invalid Id')
    }
    return haunting
  }

  async createHaunting(data) {
    return await dbContext.Haunting.create(data)
  }

  async editHaunting(update, req) {
    return await dbContext.Haunting.findOneAndUpdate({ _id: update.id, creatorId: req.userInfo.id }, update, { new: true }).populate('creator')
  }

  async deleteHaunting(req) {
    const haunting = await dbContext.Haunting.findOneAndDelete({ _id: req.params.id, creatorId: req.params.id })
    if (!haunting) {
      throw new BadRequest('Error: You are not the Creator of this Haunting Location.')
    }
    return 'Deleted'
  }
}

export const hauntingsService = new HauntingsService()
