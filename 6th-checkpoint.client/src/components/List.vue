<template>
  <div class="car col-md-4 mb-3">
    <div class="card shadow">
      <div class="card-body">
        <h4 class="card-title">
          <button class="btn btn-danger" @click="deleteList(list.id)">
            Delete
          </button>
          {{ listProp.title }}
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { listsService } from '../services/ListsService'
import { useRoute } from 'vue-router'
export default {
  name: 'List',
  props: {
    listProp: {
      type: Object,
      required: true
    }
  },
  setup() {
    const route = useRoute()
    const state = reactive({
      newList: {},
      lists: computed(() => AppState)
    })
    onMounted(async() => {
      try {
        await listsService.getLists(route.params.id)
      } catch (error) {
      }
    })
    return {
      async createList() {
        await listsService.createList(state.newList)
      },
      state
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
