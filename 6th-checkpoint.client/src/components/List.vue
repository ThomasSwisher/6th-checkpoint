<template>
  <div class="car col-md-4 mb-3">
    <div class="card shadow">
      <div class="card-body">
        <h4 class="card-title">
          <!-- {{ list.title }} -->
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: {
    listProp: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
