<template>
  <div class="car col-md-4 mb-3">
    <div class="card shadow">
      <div class="card-body">
        <h4 class="card-title">
          <button class="btn btn-danger" @click="deleteTask(taskProp.id)">
            Delete
          </button>
          {{ taskProp.title }}
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { tasksService } from '../services/TasksService'
import { useRoute } from 'vue-router'
export default {
  name: 'Task',
  props: {
    taskProp: {
      type: Object,
      required: true
    }
  },
  setup() {
    const route = useRoute()
    const state = reactive({
      newTask: {},
      tasks: computed(() => AppState)
    })
    onMounted(async() => {
      try {
        await tasksService.getTasks(route.params.id)
      } catch (error) {
      }
    })
    return {
      async createTask() {
        await tasksService.createTask(state.newTask)
      },
      state,
      async deleteTask(id) {
        try {
          await tasksService.deleteTask(id)
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
