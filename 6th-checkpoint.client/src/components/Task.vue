<template>
  <div class="col mb-3">
    <div class="">
      <button class="btn-danger" @click="deleteTask">
        Delete
      </button>
    </div>
    <div>
      {{ taskProp.title }}
    </div>
    <div class="btn-group">
      <button type="button" class="btn btn-primary">
        Move Task
      </button>
      <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span class="sr-only">Toggle Dropdown</span>
      </button>
      <div class="dropdown-menu">
        <a class="dropdown-item"
           v-for="l in state.lists"
           :key="l.id"
           :list-prop="l"
           @click.prevent="changeList(l.id)"
        >{{ l.title }}</a>
      </div>
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
      lists: computed(() => AppState.lists),
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
      },
      async changeList(listId) {
        try {
          await tasksService.changeList(listId, props.taskProp)
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
