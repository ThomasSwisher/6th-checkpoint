import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TasksService {
  async edit(body) {
    const data = await dbContext.Tasks.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async getAll(query) {
    return await dbContext.Tasks.find(query)
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
