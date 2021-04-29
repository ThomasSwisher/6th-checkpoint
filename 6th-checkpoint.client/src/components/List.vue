<template>
  <div class="car col-md-4 mb-3">
    <div class="card shadow">
      <div class="card-body">
        <h4 class="card-title">
          <button class="btn btn-danger" @click="deleteList(listProp.id)">
            Delete
          </button>
          {{ listProp.title }}
        </h4>
        <div>
          <ul>
            <li>
              <Task v-for="t in state.tasks" :key="t.id" :task-prop="t" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { listsService } from '../services/ListsService'
import { useRoute } from 'vue-router'
import { tasksService } from '../services/TasksService'
export default {
  name: 'List',
  props: {
    listProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      newList: {},
      tasks: computed(() => AppState.tasks[props.listProp.id])
    })
    onMounted(async() => {
      try {
        await listsService.getLists(route.params.id)
        await tasksService.getTasks(props.listProp.id)
      } catch (error) {
      }
    })
    return {
      async createList() {
        await listsService.createList(state.newList)
      },
      state,
      async deleteList(id) {
        try {
          await listsService.deleteList(id)
        } catch (error) {
          console.error(error)
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
