<template>
  <div class="container-fluid">
    <div class="form-group ml-3 mt-3">
      <form @submit.prevent="createList">
        <div class="form-group cust-form">
          <label for="title">Title</label>
          <input type="text"
                 class="form-control"
                 name="title"
                 id="title"
                 placeholder="Title..."
                 v-model="state.newList.title"
          >
          <button class="btn btn-success" type="submit">
            + List
          </button>
        </div>
      </form>
    </div>
    <div class="row">
      <List v-for="l in state.lists" :key="l.id" :list-prop="l" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { listsService } from '../services/ListsService'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'

export default {
  name: 'Board',
  setup() {
    const route = useRoute()
    const state = reactive({
      newList: {},
      lists: computed(() => AppState.lists)
    })
    onMounted(async() => {
      try {
        await listsService.getLists(route.params.id)
      } catch (error) {
        console.error(error)
      }
    })

    return {
      async createList() {
        state.newList.boardId = route.params.id
        await listsService.createList(state.newList)
        state.newList = {}
      },
      state
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
</style>
