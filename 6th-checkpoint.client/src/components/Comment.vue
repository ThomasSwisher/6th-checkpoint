<template>
  <div class="mb-3">
    <div class="">
      <button class="btn-danger" @click="deleteComment">
        Delete
      </button>
    </div>
    <div>
      {{ commentProp.title }}
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { commentsService } from '../services/CommentsService'
export default {
  name: 'Comment',
  props: {
    commentProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      newComment: {},
      comments: computed(() => AppState.comments[props.commentProp.id])
    })

    return {
      async createComment() {
        await commentsService.createComment(state.newComment)
      },
      state,
      async deleteComment() {
        try {
          await commentsService.deleteComment(props.commentProp)
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
