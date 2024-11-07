<template>
    <div>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <div v-for="post in posts" :key="post.id" class="post-card">
          <h2>{{ post.title }}</h2>
          <p>{{ post.body }}</p>
        </div>
        <div v-if="pagination.totalPages > 1">
          <button @click="goToPage(pagination.currentPage - 1)" :disabled="pagination.currentPage === 1">
            Previous
          </button>
          <button @click="goToPage(pagination.currentPage + 1)" :disabled="pagination.currentPage === pagination.totalPages">
            Next
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    async created() {
      await this.$store.dispatch('posts/fetchPosts')
    },
    computed: {
      posts() {
        return this.$store.state.posts.posts
      },
      loading() {
        return this.$store.state.posts.loading
      },
      pagination() {
        return this.$store.state.posts.pagination
      },
    },
    methods: {
      async goToPage(page) {
        if (page >= 1 && page <= this.pagination.totalPages) {
          await this.$store.dispatch('posts/setPagination', { ...this.pagination, currentPage: page })
          await this.$store.dispatch('posts/fetchPosts')
        }
      },
    },
  }
  </script>
  