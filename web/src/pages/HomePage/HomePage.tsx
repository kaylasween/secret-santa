import { Redirect } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

const HomePage = () => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    Redirect({ to: '/login' })
  }

  return <div></div>
}

export default HomePage
