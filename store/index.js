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
          state.posts = posts
        },
        setLoading(state, status) {
          state.loading = status
        },
        setPagination(state, pagination) {
          state.pagination = pagination
        },
      },
      actions: {
        async fetchPosts({ commit, state }) {
          try {
            commit('setLoading', true)
            const response = await this.$axios.$get('/api/posts', {
              params: {
                page: state.pagination.currentPage,
                limit: 6,  // Pagination (6 posts per page)
              },
            })
            commit('setPosts', response.posts)
            commit('setPagination', response.pagination)
          } catch (error) {
            console.error(error)
            commit('setPosts', [])
          } finally {
            commit('setLoading', false)
          }
        },
        async createPost({ commit }, postData) {
          try {
            commit('setLoading', true)
            await this.$axios.$post('/api/posts', postData)
          } catch (error) {
            console.error(error)
          } finally {
            commit('setLoading', false)
          }
        },
        async updatePost({ commit }, { postId, updatedData }) {
          try {
            commit('setLoading', true)
            await this.$axios.$put(`/api/posts/${postId}`, updatedData)
          } catch (error) {
            console.error(error)
          } finally {
            commit('setLoading', false)
          }
        },
        async deletePost({ commit }, postId) {
          try {
            commit('setLoading', true)
            await this.$axios.$delete(`/api/posts/${postId}`)
          } catch (error) {
            console.error(error)
          } finally {
            commit('setLoading', false)
          }
        },
      },
    },
  }
  