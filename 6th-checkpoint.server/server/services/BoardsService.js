import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BoardsService {
  async getAll(query) {
    return await dbContext.Boards.find(query)
  }

  async create(body) {
    return await dbContext.Boards.create(body)
  }

  async deleteBoard(id) {
    const data = await dbContext.Boards.findOneAndDelete({ _id: id })
    if (!data) {
      throw new BadRequest('Invalid ID')
    }
    return 'Successfully Deleted'
  }
}

export const boardsService = new BoardsService()
