import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { hauntingsService } from '../services/HauntingsService'
import { IteratorNext } from 'es-abstract'
import { testimoniesService } from '../services/TestimoniesService'

export class HauntingsController extends BaseController {
  constructor() {
    super('api/hauntings')
    this.router
    // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllHauntings)
      .get('/:id', this.getHauntingById)
      .get('/:id', this.getTestsByHauntingId)
      .put('/:id', this.editHaunting)
      .post('', this.createHaunting)
      .delete('/:id', this.deleteHaunting)
  }

  async getAllHauntings(req, res, next) {
    try {
      const data = await hauntingsService.findHauntings(req.query)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getHauntingById(req, res, next) {
    try {
      return res.send(await hauntingsService.findHauntingById(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async getTestsByHauntingId(req, res, next) {
    try {
      const data = await testimoniesService.findTestimonies({ testimonyId: req.params.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async createHaunting(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const haunting = (await hauntingsService.createHaunting(req.body))
      res.send(await hauntingsService.findHauntingById(haunting._id))
    } catch (error) {
      next(error)
    }
  }

  async editHaunting(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await hauntingsService.editHaunting(req.params.id, req.userInfo.id, req.body))
    } catch (error) {
      next(error)
    }
  }

  async deleteHaunting(req, res, next) {
    try {
      const query = {
        id: req.params.id,
        creatorId: req.userInfo.id
      }
      res.send(await hauntingsService.deleteHaunting(query))
    } catch (error) {
      next(error)
    }
  }
}
