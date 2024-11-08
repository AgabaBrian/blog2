<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <div class="text-center p-6 bg-white shadow-lg rounded-lg w-96">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">Welcome to the Blog Dashboard</h1>
      <p class="text-gray-600 mb-6">Manage your posts</p>
      <nuxt-link 
        to="/login" 
        class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
      >
        Login
      </nuxt-link>
    </div>
  </div>
</template>

<style scoped>
/* You can add any additional custom styles here if necessary */
</style>

