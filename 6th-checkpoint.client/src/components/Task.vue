<template>
  <div class="col-md-4 mb-3">
    <div class="">
      <button class="btn-danger" @click="deleteTask">
        Delete
      </button>
    </div>
    <div>
      {{ taskProp.title }}
    </div>
    <form @submit.prevent="createComment">
      <div class="form-group cust-form">
        <label for="title">Comment</label>
        <input type="text"
               class="form-control"
               name="title"
               id="title"
               placeholder="Comment..."
               v-model="state.newComment.title"
        >
        <button class="btn btn-success" type="submit">
          + Comment
        </button>
      </div>
    </form>
    <div class="row">
      <Comment v-for="c in state.comments" :key="c.id" :comment-prop="c" />
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, computed } from 'vue'
import { commentsService } from '../services/CommentsService'
import { AppState } from '../AppState'
import { tasksService } from '../services/TasksService'
import Comment from './Comment.vue'
export default {
  name: 'Task',
  props: {
    taskProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      newComment: {},
      comments: computed(() => AppState.comments[props.taskProp.id])
    })
    onMounted(async() => {
      await commentsService.getComments(props.taskProp.id)
    })

    return {
      async createComment() {
        state.newComment.taskId = props.taskProp.id
        await commentsService.createComment(state.newComment)
      },
      state,
      async deleteTask() {
        try {
          await tasksService.deleteTask(props.taskProp)
        } catch (error) {
          console.error(error)
        }
      }
    }
  },
  components: { Comment }
}
</script>

<style lang="scss" scoped>

</style>
