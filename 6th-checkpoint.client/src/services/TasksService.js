import { AppState } from '../AppState'
import { api } from './AxiosService'

class TasksService {
  async createTask(newTask) {
    const res = await api.post('/api/tasks', newTask)
    AppState.tasks.push(res.data)
  }

  async getTasks(listId) {
    const res = await api.get(`/api/lists/${listId}/tasks`)
    AppState.tasks[listId] = res.data
    console.log(res.data)
  }

  async deleteTask(id) {
    await api.delete('/api/tasks/' + id)
    AppState.tasks = AppState.tasks.filter(b => b.id !== id)
  }
}

export const tasksService = new TasksService()
