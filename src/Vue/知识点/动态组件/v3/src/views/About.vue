<template>
  <div>
    <h1>This is an about page{{ a }}</h1>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const a = ref({ a: 1, b: 2 })
    console.log(a)
    console.log((a.a = 2))
    setTimeout(() => {
      a.value.a = 100
    }, 3000)
    return {
      a,
    }
  },
}
</script>
