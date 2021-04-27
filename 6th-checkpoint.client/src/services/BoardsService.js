import { AppState } from '../AppState'
import { api } from './AxiosService'

class BoardsService {
  async createBoard(newBoard) {
    const res = await api.post('/api/boards', newBoard)
    AppState.boards.push(res.data)
  }
}

export const boardsService = new BoardsService()
