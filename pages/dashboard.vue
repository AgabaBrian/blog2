<template>
    <div class="container mx-auto p-6">
      <!-- Heading Section -->
      <header class="flex items-center justify-between mb-6">
        <h2 class="text-4xl font-bold text-gray-800">Blog Dashboard</h2>
        <div class="space-x-4 flex">
          <!-- Logout Button -->
          <button @click="logout" class="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all duration-300 ease-in-out shadow-md">
            Logout
          </button>
          <!-- New Post Button -->
          <button @click="createNewPost" class="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all duration-300 ease-in-out shadow-md ml-4">
            New Post
          </button>
        </div>
      </header>
  
      <!-- Action Buttons (Edit on left, Delete on right) -->
      <div class="flex justify-between items-center mt-4">
        <button @click="editPost" class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-md text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 20h9"></path>
            <path d="M18 16L22 12l-4-4-4 4z"></path>
            <path d="M14 8l4 4"></path>
          </svg>
          Edit
        </button>
        <button @click="deletePost" class="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-all duration-300 ease-in-out shadow-md text-sm">
          Delete
        </button>
      </div>
  
      <!-- Instruction Paragraph -->
      <section class="mt-4">
        <p class="text-lg text-gray-600">
          Learn the basics of Nuxt.js and how to create your first application.
        </p>
      </section>
  
      <!-- Blog Content -->
      <section class="space-y-8 mt-6">
        <div v-for="post in posts" :key="post.id">
          <PostCard :post="post" />
        </div>
      </section>
  
      <!-- Pagination Controls -->
      <section class="flex items-center justify-between mt-8">
        <button 
          :disabled="pagination.currentPage === 1" 
          @click="changePage(pagination.currentPage - 1)" 
          class="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-300 transition-all duration-300 ease-in-out shadow-md">
          Previous
        </button>
  
        <span class="text-lg text-gray-600">
          Page {{ pagination.currentPage }} of {{ pagination.totalPages }}
        </span>
  
        <button 
          :disabled="pagination.currentPage === pagination.totalPages" 
          @click="changePage(pagination.currentPage + 1)" 
          class="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-300 transition-all duration-300 ease-in-out shadow-md">
          Next
        </button>
      </section>
    </div>
  </template>
  
  <script>
  import PostCard from '~/components/PostCard.vue';
  
  export default {
    components: {
      PostCard,
    },
    computed: {
      posts() {
        return this.$store.state.posts.posts;
      },
      loading() {
        return this.$store.state.posts.loading;
      },
      pagination() {
        return this.$store.state.posts.pagination;
      },
    },
    async created() {
      await this.fetchPosts();
    },
    methods: {
      async fetchPosts() {
        await this.$store.dispatch('posts/fetchPosts', this.pagination.currentPage);
      },
      changePage(newPage) {
        if (newPage >= 1 && newPage <= this.pagination.totalPages) {
          this.$store.commit('setPagination', { ...this.pagination, currentPage: newPage });
          this.fetchPosts();
        }
      },
      logout() {
        console.log('Logged out');
      },
      editPost() {
        console.log('Edit post');
      },
      deletePost() {
        console.log('Delete post');
      },
      createNewPost() {
        console.log('Create new post');
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    position: relative;
    background-color: #e5e7eb; /* Darkened the background */
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Added more subtle shadow */
  }
  
  h2 {
    color: #2d3748;
  }
  
  button {
    transition: all 0.3s ease;
  }
  
  button:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.5);
  }
  
  section {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .space-x-4 {
    display: flex;
  }
  
  .space-x-4 button {
    margin-right: 16px; /* Added space between buttons */
  }
  
  .mt-4 {
    margin-top: 1rem; /* Added margin for separation */
  }
  
  .text-lg {
    color: #4b5563;
  }
  </style>
  