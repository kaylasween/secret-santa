// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'

import { useAuth } from './auth'
import LoginPage from './pages/LoginPage/LoginPage'
import SignUpPage from './pages/SignUpPage/SignUpPage'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/" page={HomePage} name="home" />
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignUpPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
