import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ListsService {
  async getAll(query) {
    return await dbContext.Lists.find(query)
  }

  async create(body) {
    return await dbContext.Lists.create(body)
  }

  async delete(id) {
    const data = await dbContext.Lists.findOneAndDelete({ _id: id })
    if (!data) {
      throw new BadRequest('Invalid ID')
    }
    return 'Successfully Deleted'
  }
}

export const listsService = new ListsService()
