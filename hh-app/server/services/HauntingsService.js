import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class HauntingsService {
  async findHauntings(query = {}) {
    const haunting = await dbContext.Haunting.find(query)
    return haunting
  }

  async findHauntingById(id) {
    const haunting = await dbContext.Haunting.findById(id)
    if (!haunting) {
      throw new BadRequest('Invalid Id')
    }
    return haunting
  }
}

export const hauntingsService = new HauntingsService()
