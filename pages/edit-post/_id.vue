<template>
    <div class="max-w-4xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg">
      <h2 class="text-3xl font-semibold text-gray-800 mb-6 text-center">Edit Post</h2>
      
      <form @submit.prevent="updatePost" class="space-y-6">
        <div>
          <label for="title" class="block text-lg font-semibold text-gray-800">Title</label>
          <input
            type="text"
            id="title"
            v-model="postData.title"
            class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Enter post title"
            required
          />
        </div>
        
        <div>
          <label for="body" class="block text-lg font-semibold text-gray-800">Body</label>
          <textarea
            id="body"
            v-model="postData.body"
            rows="5"
            class="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Enter post body"
            required
          ></textarea>
        </div>
        
        <div class="text-right">
          <button
            type="submit"
            class="bg-indigo-600 text-white py-2 px-6 rounded-md shadow-lg hover:bg-indigo-700 focus:outline-none"
          >
            Update Post
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        postData: { title: '', body: '' },
      };
    },
    async created() {
      try {
        const postId = this.$route.params.id; // Access the dynamic ID from the route
        const response = await this.$axios.get(`https://junior-developer-assessment-blog.onrender.com/posts/${postId}`);
        this.postData = response.data;
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    },
    methods: {
      async updatePost() {
        try {
          const postId = this.$route.params.id;
          await this.$axios.put(
            `https://junior-developer-assessment-blog.onrender.com/posts/${postId}`,
            this.postData
          );
          this.$router.push({ name: 'dashboard' });
        } catch (error) {
          console.error("Error updating post:", error);
        }
      },
    },
  };
  </script>
  