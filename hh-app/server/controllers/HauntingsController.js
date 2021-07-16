import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class HauntingsController extends BaseController {
  constructor() {
    super('api/hauntings')
    this.router
      .get('', this.getAllHauntings)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }

  async getAllHauntings(req, res, next) {
    try {
      return res.send(['Haunting1', 'Haunting2'])
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
