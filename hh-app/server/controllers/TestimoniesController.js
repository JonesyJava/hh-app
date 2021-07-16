import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class TestimoniesController extends BaseController {
  constructor() {
    super('api/testimonies')
    this.router
      .get('', this.getAllTestimonies)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }

  async getAllTestimonies(req, res, next) {
    try {
      return res.send(['Test1', 'Test2'])
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      res.send(req.body)
    } catch (error) {
      next(error)
    }
  }
}
