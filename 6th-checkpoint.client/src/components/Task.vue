<template>
  <div class="col-md-4 mb-3">
    <div class="shadow">
      <button class="btn btn-danger" @click="deleteTask(taskProp.id)">
        Delete
      </button>
    </div>
    <div>
      {{ taskProp.title }}
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { tasksService } from '../services/TasksService'
export default {
  name: 'Task',
  props: {
    taskProp: {
      type: Object,
      required: true
    }
  },
  setup() {
    const state = reactive({
      newTask: {}
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
