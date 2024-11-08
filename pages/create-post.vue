<template>
  <div class="max-w-4xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg">
    <h2 class="text-3xl font-semibold text-gray-800 mb-6 text-center">Create New Post</h2>
    
    <!-- Create Post Form -->
    <form @submit.prevent="createPost" class="space-y-6">
      <div>
        <label for="title" class="block text-lg font-semibold text-gray-800">Title</label>
        <input
          type="text"
          id="title"
          v-model="newPost.title"
          class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          placeholder="Enter post title"
          required
        />
      </div>
      
      <div>
        <label for="body" class="block text-lg font-semibold text-gray-800">Content</label>
        <textarea
          id="body"
          v-model="newPost.body"
          rows="5"
          class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          placeholder="Enter post body"
          required
        ></textarea>
      </div>
      
      <!-- Submit Button -->
      <div class="text-right">
        <button
          type="submit"
          class="bg-indigo-600 text-white py-2 px-6 rounded-md shadow-lg hover:bg-indigo-700 focus:outline-none"
        >
          Create Post
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newPost: {
        title: '',
        content: '',
        
      }
    };
  },
  methods: {
    async createPost() {
      try {
        // Send the new post data to the API
        const response = await this.$axios.post('https://junior-developer-assessment-blog.onrender.com/posts', this.newPost);
        
        // After the post is created, you can redirect the user to the dashboard or show a success message
        //await this.$axios.post('/posts',this.newPost);
        this.$toast.success("Post created successfully!");
        this.$router.push("/dashboard"); // Redirect to dashboard or wherever you want

      } catch (error) {
        console.error("Error creating post:", error.response || error);
        // Log error details for better debugging
        this.$toast.error('Failed to create post: ${error.response?.message || "Unknown error"}');
      }
    }
  }
};
</script>

<style scoped>
h2 {
  color: #374151;
}
button {
  transition: background-color 0.3s;
}
button:hover {
  transform: scale(1.05);
}
</style>

