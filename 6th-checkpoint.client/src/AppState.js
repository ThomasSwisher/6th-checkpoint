import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  newBoard: null,
  boards: [],
  newList: null,
  lists: [],
  newTask: null,
  tasks: {},
  newComment: null,
  comments: {}
})
