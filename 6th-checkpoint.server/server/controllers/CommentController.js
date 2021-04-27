import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsService'

export class CommentController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .post('', this.create)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      const data = await commentsService.getAll(req.userInfo.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const data = await commentsService.create(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const data = await commentsService.delete(req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
