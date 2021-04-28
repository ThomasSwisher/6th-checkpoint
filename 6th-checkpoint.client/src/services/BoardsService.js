import { AppState } from '../AppState'
import { api } from './AxiosService'

class BoardsService {
  async createBoard(newBoard) {
    const res = await api.post('/api/boards', newBoard)
    AppState.boards.push(res.data)
  }

  async getBoards() {
    const res = await api.get('/api/boards')
    AppState.boards = res.data
  }

  async deleteBoard(id) {
    await api.delete('/api/boards/' + id)
    AppState.boards = AppState.boards.filter(b => b.id !== id)
  }
}

export const boardsService = new BoardsService()
