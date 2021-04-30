import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class CommentsService {
  async createComment(newComment) {
    await api.post('/api/comments', newComment)
    // AppState.comments[newComment.taskId].push(res.data)
    this.getComments(newComment.taskId)
  }

  async getComments(TaskId) {
    logger.log(AppState.comments)
    const res = await api.get(`/api/tasks/${TaskId}/comments`)
    AppState.comments[TaskId] = res.data
  }

  async deleteComment(comment) {
    await api.delete('/api/comments/' + comment.id)
    AppState.comments[comment.listId] = AppState.comments[comment.listId].filter(b => b.id !== comment.id)
  }
}

export const commentsService = new CommentsService()
