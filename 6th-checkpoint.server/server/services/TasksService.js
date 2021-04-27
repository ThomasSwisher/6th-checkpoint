import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TasksService {
  async getAll(id) {
    return await dbContext.Tasks.find({ creatorId: id })
  }

  async create(body) {
    return await dbContext.Tasks.create(body)
  }

  async delete(id) {
    const data = await dbContext.Tasks.findOneAndDelete({ _id: id })
    if (!data) {
      throw new BadRequest('Invalid ID')
    }
    return 'Successfully Deleted'
  }
}

export const tasksService = new TasksService()
