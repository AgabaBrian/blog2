<template>
    <form @submit.prevent="submitPost">
      <input v-model="postData.title" placeholder="Title" required />
      <textarea v-model="postData.body" placeholder="Body" required></textarea>
      <button type="submit">Create Post</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        postData: { title: '', body: '' },
      };
    },
    methods: {
      async submitPost() {
        await this.$store.dispatch('posts/createPost', this.postData);
        this.postData = { title: '', body: '' };
      },
    },
  };
  </script>
  
  