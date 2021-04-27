import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BoardsService {
  async getAll(id) {
    return await dbContext.Boards.find({ creatorId: id })
  }

  // async find(query = {}) {
  //   const values = await dbContext.Values.find(query)
  //   return values
  // }

  // async findById(id) {
  //   const value = await dbContext.Values.findById(id)
  //   if (!value) {
  //     throw new BadRequest('Invalid Id')
  //   }
  //   return value
  // }

  async create(body) {
    return await dbContext.Boards.create(body)
  }

  async delete(id) {
    const data = await dbContext.Boards.findOneAndDelete({ _id: id })
    if (!data) {
      throw new BadRequest('Invalid ID')
    }
    return 'Successfully Deleted'
  }
}

export const boardsService = new BoardsService()
