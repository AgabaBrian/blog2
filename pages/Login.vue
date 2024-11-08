<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold text-center text-gray-800">
        LOGIN HERE
      </h2>
      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-600"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="Enter your email"
            required
            class="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-md focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-600"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="Enter your password"
            required
            class="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-md focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
          />
        </div>
        <button
          type="submit"
          class="w-full px-4 py-2 font-semibold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const email = this.email
      const password = this.password
      await this.$axios.$post("/auth/login", {
        email,
        password,
      })
      .then ( response => {
        if (response) {
          localStorage.setItem("token", response.token);
          this.$router.push("/dashboard");
        } else {
          this.$toast.error("failed to login");
        }
      })
      .catch( error => {
        console.log(error)
        this.$toast.error(" Failed log in")
      })
    }
  }
}
</script>
