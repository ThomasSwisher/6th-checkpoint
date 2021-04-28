import { AppState } from '../AppState'
import { api } from './AxiosService'

class ListsService {
  async createList(newList) {
    const res = await api.post('/api/lists', newList)
    AppState.lists.push(res.data)
  }

  async getLists(id) {
    const res = await api.get(`/api/boards/${id}/lists`)
    AppState.lists = res.data
  }

  async deleteList(id) {
    await api.delete('/api/lists/' + id)
    AppState.lists = AppState.lists.filter(b => b.id !== id)
  }
}

export const listsService = new ListsService()
