<template>
  <div class="container-fluid">
    <div class="form-group ml-3 mt-3">
      <form @submit.prevent="createBoard">
        <div class="form-group cust-form">
          <label for="title">Title</label>
          <input type="text"
                 class="form-control"
                 name="title"
                 id="title"
                 placeholder="Title..."
                 v-model="state.newBoard.title"
          >
          <button class="btn btn-success" type="submit">
            + Board
          </button>
        </div>
      </form>
    </div>
    <div class="row">
      <div class="col-12" v-for="board in state.boards" :key="board.id">
        <router-link :to="{name: 'BoardPage', params: {id: board.id}}">
          {{ board.title }}
        </router-link>
        <span @click="deleteBoard(board.id)" class="delete">--</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { boardsService } from '../services/BoardsService'
import { AppState } from '../AppState'

export default {
  name: 'Boards',
  setup() {
    const state = reactive({
      newBoard: {},
      boards: computed(() => AppState.boards)
    })
    onMounted(async() => {
      try {
        await boardsService.getBoards()
      } catch (error) {
        console.error(error)
      }
    })

    return {
      async createBoard() {
        await boardsService.createBoard(state.newBoard)
        state.newBoard = {}
      },
      state,
      async deleteBoard(id) {
        try {
          await boardsService.deleteBoard(id)
        } catch (error) {
          console.error(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
.cust-form {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 500px;
}
.delete {
  cursor: pointer;
}
</style>
