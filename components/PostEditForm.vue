<template>
  <form @submit.prevent="updatePost">
    <input v-model="postData.title" placeholder="Title" required />
    <textarea v-model="postData.body" placeholder="Body" required></textarea>
    <button type="submit">Update Post</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      postData: { title: '', body: '' },
    };
  },
  async created() {
    const post = await this.$axios.get(`https://junior-developer-assessment-blog.onrender.com/posts/${this.$route.params.id}`);
    this.postData = post.data;
  },
  methods: {
    async updatePost() {
      await this.$store.dispatch('posts/updatePost', { postId: this.$route.params.id, updatedData: this.postData });
    },
  },
};
</script>

