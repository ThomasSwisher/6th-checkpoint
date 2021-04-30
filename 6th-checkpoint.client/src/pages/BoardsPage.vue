<template>
  <div class="container-fluid">
    <div class="row form-group ml-3 mt-3">
      <form @submit.prevent="createBoard">
        <div class="form-group cust-form">
          <label for="title">Create Board</label>
          <input type="text"
                 class="form-control"
                 name="title"
                 id="title"
                 placeholder="Name Board..."
                 v-model="state.newBoard.title"
          >
          <button class="btn btn-success" type="submit">
            + Board
          </button>
        </div>
      </form>
    </div>
    <div class="">
      <div class="col-12 custom" v-for="board in state.boards" :key="board.id">
        <router-link :to="{name: 'BoardPage', params: {id: board.id}}">
          {{ board.title }}
        </router-link>
        <button @click="deleteBoard(board.id)" class="btn custom-btn btn-danger delete">
          Delete
        </button>
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

label {
  margin-right: 20px;
}

.btn-success {
  width: 125px;
  margin-left: 20px;
}

a {
 color: #0087ce;
}

.custom-btn  {
  padding: 0px 5px 0px 5px;
  margin-left: 15px;
}

.custom {
  margin-bottom: 10px;
}
</style>
