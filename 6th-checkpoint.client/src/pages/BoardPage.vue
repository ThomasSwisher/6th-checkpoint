<template>
  <div class="form-group ml-3 mt-3">
    <!-- <form @submit.prevent="createBoard" v-if="state.user.isAuthenticated">
      <div class="form-group cust-form">
        <label for="title">Title</label>
        <input type="text"
               class="form-control"
               name="title"
               id="title"
               placeholder="Title..."
        >
        <button class="btn btn-success" type="submit">
          + Board
        </button>
      </div>
    </form> -->
  </div>
</template>

<script>
// import { computed, onMounted, reactive }
// import { boardsService } from '../services/BoardsService'
// import { AppState } from '../AppState'

// export default {
//   name: 'Home',
//   setup() {
//     const state = reactive({
//       boards: computed(() => AppState.boards)
//     })
//     onMounted(async() => {
//       try {
//         await boardsService.getBoards()
//       } catch (error) {
//         console.error(error)
//       }
//     })
//     return {
//       state
//     }
//   }
// }
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
</style>
