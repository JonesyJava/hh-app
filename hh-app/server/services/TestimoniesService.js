import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TestimoniesService {
  async findTestimonies(query = {}) {
    const testimonies = await dbContext.Testimony.find(query).populate('creator')
    return testimonies
  }

  async findTestimonyById(id) {
    const testimony = await dbContext.Testimony.findById(id)
    if (!testimony) {
      throw new BadRequest('Invalid Id')
    }
    return testimony
  }

  async editTestimony(id, body) {
    const testimony = await dbContext.Testimony.findOneAndUpdate(id, body, { new: true })
    if (!testimony) {
      throw new BadRequest('Error: Invalid ID for Testimony.')
    }
    return testimony
  }

  async deleteTestimony(id) {
    const testimony = await dbContext.Testimony.findByIdAndDelete(id)
    if (!testimony) {
      throw new BadRequest('Error: Testimony does not exist')
    }
    return 'Success: Testimony hsa been Deleted'
  }
}

export const testimoniesService = new TestimoniesService()
