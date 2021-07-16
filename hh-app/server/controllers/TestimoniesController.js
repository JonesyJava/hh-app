import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { testimoniesService } from '../services/TestimoniesService'

export class TestimoniesController extends BaseController {
  constructor() {
    super('api/testimonies')
    this.router
    // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllTestimonies)
      .post('', this.createTestimony)
      .put('/:id', this.editTestimony)
      .delete('/:id', this.deleteTestimony)
  }

  async getAllTestimonies(req, res, next) {
    try {
      return res.send(['Test1', 'Test2'])
    } catch (error) {
      next(error)
    }
  }

  async createTestimony(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      res.send(req.body)
    } catch (error) {
      next(error)
    }
  }

  async editTestimony(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await testimoniesService.editTestimony(req.params.id, req.body))
    } catch (error) {
      next(error)
    }
  }

  async deleteTestimony(req, res, next) {
    try {
      req.body.cratorId = req.userInfo.id
      res.send(await testimoniesService.deleteTestimony(req.params.id))
    } catch (error) {
      next(error)
    }
  }
}
