import { AppState } from '../AppState'

import { api } from './AxiosService'

class TasksService {
  async createTask(newTask) {
    const res = await api.post('/api/tasks', newTask)
    AppState.tasks[newTask.listId].push(res.data)
  }

  async getTasks(listId) {
    const res = await api.get(`/api/lists/${listId}/tasks`)
    AppState.tasks[listId] = res.data
  }

  async deleteTask(task) {
    await api.delete('/api/tasks/' + task.id)
    AppState.tasks[task.listId] = AppState.tasks[task.listId].filter(b => b.id !== task.id)
  }
}

export const tasksService = new TasksService()
