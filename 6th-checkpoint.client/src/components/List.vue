<template>
  <div class=" col-md-4 mb-3">
    <div class="card shadow">
      <div class="card-body">
        <h4 class="card-title">
          <button class="btn btn-danger" @click="deleteList(listProp.id)">
            Delete
          </button>
          {{ listProp.title }}
        </h4>
        <form @submit.prevent="createTask">
          <div class="form-group cust-form">
            <label for="title"></label>
            <input type="text"
                   class="form-control"
                   name="title"
                   id="title"
                   placeholder="Name Task..."
                   v-model="state.newTask.title"
            >
            <button class="btn btn-success" type="submit">
              + Task
            </button>
          </div>
        </form>
        <div class="row flex-direction-column justify-content-around">
          <Task v-for="t in state.tasks" :key="t.id" :task-prop="t" />
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
      newTask: {},
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
      async createTask() {
        state.newTask.listId = props.listProp.id
        await tasksService.createTask(state.newTask)
        state.newTask = {}
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
.btn-success {
  width: 90px;
  margin-right: 20px;
}

.form-group {
  display: flex;
  flex-direction: row-reverse;
}

.btn-danger {
  width: 76px;
  margin-right: 17px;
}

</style>
