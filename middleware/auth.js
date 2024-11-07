// middleware/auth.js
export default function ({ store, redirect }) {
    if (!store.state.auth.isAuthenticated) {
      return redirect('/login');  // Redirect to login page if not authenticated
    }
  }
  