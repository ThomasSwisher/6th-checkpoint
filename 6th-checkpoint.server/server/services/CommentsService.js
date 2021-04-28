import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentsService {
  async getAll(query) {
    return await dbContext.Comments.find(query)
  }

  async create(body) {
    return await dbContext.Comments.create(body)
  }

  async delete(id) {
    const data = await dbContext.Comments.findOneAndDelete({ _id: id })
    if (!data) {
      throw new BadRequest('Invalid ID')
    }
    return 'Successfully Deleted'
  }
}

export const commentsService = new CommentsService()
