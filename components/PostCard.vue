<template>
  <div class="post-card">
    <h2>{{ post.title }}</h2>
    <p>{{ post.body }}</p>
    <button @click="$emit('edit', post.id)">Edit</button>
    <button @click="$emit('delete', post.id)">Delete</button>
  </div>
</template>

<script>
export default {
  props: {
    post: Object,
  },
};
</script>

