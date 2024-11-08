export const state = () => ({
  posts: [],
  loading: false,
  pagination: {
    currentPage: 1,
    totalPages: 1,
  },
});

export const mutations = {
  setPosts(state, posts) {
    state.posts = posts;
  },
  setPagination(state, pagination) {
    state.pagination = pagination;
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
  addPost(state, post) {
    state.posts.unshift(post); // Add new post to the start of the list
  },
  updatePost(state, updatedPost) {
    const index = state.posts.findIndex((post) => post.id === updatedPost.id);
    if (index !== -1) {
      state.posts.splice(index, 1, updatedPost); // Update post in place
    }
  },
  deletePost(state, postId) {
    state.posts = state.posts.filter((post) => post.id !== postId);
  },
};

export const actions = {
  async fetchPosts({ commit }, page = 1) {
    commit('setLoading', true);
    try {
      // Fetch posts with pagination
      const response = await this.$axios.get(
        `https://junior-developer-assessment-blog.onrender.com/posts?page=${page}`
      );

      console.log('Full Response:', response); // For debugging response structure

      // Update state with fetched posts and pagination
      commit('setPosts', response.data.posts);
      commit('setPagination', {
        currentPage: page,
        totalPages: response.data.totalPages,
      });
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      commit('setLoading', false);
    }
  },

  async createPost({ commit }, newPost) {
    try {
      const response = await this.$axios.post(
        'https://junior-developer-assessment-blog.onrender.com/posts',
        newPost
      );
      commit('addPost', response.data);
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  },

  async updatePost({ commit }, { postId, updatedData }) {
    try {
      const response = await this.$axios.put(
        `https://junior-developer-assessment-blog.onrender.com/posts/${postId}`,
        updatedData
      );
      commit('updatePost', response.data);
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  },

  async deletePost({ commit }, postId) {
    try {
      await this.$axios.delete(
        `https://junior-developer-assessment-blog.onrender.com/posts/${postId}`
      );
      commit('deletePost', postId);
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  },
};
