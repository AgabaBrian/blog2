export const modules = {
  posts: {
    namespaced: true,
    state: () => ({
      posts: [],
      loading: false,
      pagination: {
        currentPage: 1,
        totalPages: 1,
      },
    }),
    mutations: {
      setPosts(state, posts) {
        state.posts = posts;
      },
      setLoading(state, status) {
        state.loading = status;
      },
      setPagination(state, pagination) {
        state.pagination = pagination;
      },
    },
    actions: {
      async fetchPosts({ commit, state }) {
        try {
          commit('setLoading', true);
          const response = await this.$axios.$get('/api/posts', { // Updated endpoint
            params: {
              page: state.pagination.currentPage,
              limit: 6,
            },
          });
          commit('setPosts', response.posts);
          commit('setPagination', response.pagination);
        } catch (error) {
          console.error(error);
          commit('setPosts', []);
        } finally {
          commit('setLoading', false);
        }
      },
      async createPost({ commit }, postData) {
        try {
          commit('setLoading', true);
          //const response = await this.$axios.$post('/posts', postData); // Adjusted endpoint
          const response = await this.$axios.$post('/api/posts', postData);
          // Assuming the response contains the created post
          commit('setPosts', [...this.state.posts, response]);

          // Optionally, redirect or show a toast
          // this.$toast.success("Post created successfully!");
          // this.$router.push('/dashboard'); // Navigate to dashboard or posts list
        } catch (error) {
          console.error("Error creating post:", error);
        } finally {
          commit('setLoading', false);
        }
      },
      async updatePost({ commit }, { postId, updatedData }) {
        try {
          commit('setLoading', true);
          await this.$axios.$put(`/posts/${postId}`, updatedData);
        } catch (error) {
          console.error(error);
        } finally {
          commit('setLoading', false);
        }
      },
      async deletePost({ commit }, postId) {
        try {
          commit('setLoading', true);
          await this.$axios.$delete(`/posts/${postId}`);
        } catch (error) {
          console.error(error);
        } finally {
          commit('setLoading', false);
        }
      },
    },
  },
};
