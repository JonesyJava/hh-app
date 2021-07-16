import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TestimoniesService {
  async findTestimonies(query = {}) {
    const testimonies = await dbContext.Testimony.find(query)
    return testimonies
  }

  async findTestimonyById(id) {
    const testimony = await dbContext.Testimony.findById(id)
    if (!testimony) {
      throw new BadRequest('Invalid Id')
    }
    return testimony
  }
}

export const testimoniesService = new TestimoniesService()
