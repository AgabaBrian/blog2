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
        <label for="content" class="block text-lg font-semibold text-gray-800">Content</label>
        <textarea
          id="content"
          v-model="newPost.content"
          rows="5"
          class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          placeholder="Enter post content"
          required
        ></textarea>
      </div>

      <div>
        <label for="status" class="block text-lg font-semibold text-gray-800">Status</label>
        <select
          id="status"
          v-model="newPost.status"
          class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          required
        >
          <option disabled value="">Select status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <div>
        <label for="createdAt" class="block text-lg font-semibold text-gray-800">Created At</label>
        <input
          type="datetime-local"
          id="createdAt"
          v-model="newPost.createdAt"
          class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          placeholder="Enter created date"
          required
        />
      </div>

      <div>
        <label for="updatedAt" class="block text-lg font-semibold text-gray-800">Updated At</label>
        <input
          type="datetime-local"
          id="updatedAt"
          v-model="newPost.updatedAt"
          class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          placeholder="Enter updated date"
          required
        />
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
        status: '',
        createdAt: new Date().toISOString().slice(0, 16), // Defaults to current date and time
        updatedAt: new Date().toISOString().slice(0, 16),
      }
    };
  },
  methods: {
    async createPost() {
      try {
        // Prepare the post data, convert to ISO strings for createdAt and updatedAt
        const postData = {
          title: this.newPost.title,
          content: this.newPost.content,
          status: this.newPost.status,
          createdAt: new Date(this.newPost.createdAt).toISOString(),
          updatedAt: new Date(this.newPost.updatedAt).toISOString()
        };

        // Send the new post data to the API (adjusted URL to remove redundant /api)
        await this.$axios.post('/api/posts', postData);

        const token = localStorage.getItem('authToken');
        console.log("Token from localStorage:", token);

        // If no token, redirect to login
        if (!token) {
          this.$router.push('/login');
          return;
        }

        const config = {
          headers: {
            Authorization: 'Bearer ${token}'
          }
        };
        console.log("Config headers:", config.headers);

 // Send the new post data to the API (adjusted URL to remove redundant /api)
        await this.$axios.post('/api/posts', postData,config);

        // Show success message and redirect to the dashboard
        this.$toast.success("Post created successfully!");
        this.$router.push("/dashboard"); // Redirect to dashboard
      } catch (error) {
        console.error("Error creating post:", error.response || error);
        // Show error toast if creation fails
        this.$toast.error(`Failed to create post: ${error.response?.data?.message || "Unknown error"}`);
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
  transition: background-color 0.3s, transform 0.2s;
}
button:hover {
  transform: scale(1.05);
}
</style>
