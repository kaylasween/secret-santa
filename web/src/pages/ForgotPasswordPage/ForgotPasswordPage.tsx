import { useState } from 'react'

import { useClerk, useSignIn, useUser } from '@clerk/clerk-react'

import { Form, Label, TextField, set } from '@redwoodjs/forms'
import { Link } from '@redwoodjs/router'

import Button from 'src/components/Button/Button'
import HeaderWithRulers from 'src/components/HeaderWithRulers/HeaderWithRulers'
import ShowHidePassword from 'src/components/ShowHidePassword/ShowHidePassword'
import AuthLayout from 'src/layouts/AuthLayout/AuthLayout'

const ForgotPasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [complete, setComplete] = useState(false)
  const { isSignedIn, user, isLoaded } = useUser()

  if (!isLoaded) {
    return null
  }

  async function handleReset() {
    if (currentPassword === newPassword) {
      return
    }
    await user
      ?.updatePassword({
        newPassword,
        currentPassword,
      })
      .then((result) => {
        console.log(result)
      })
      .catch((err) => console.error('error', err.errors[0].longMessage))
  }

  return (
    <AuthLayout>
      <HeaderWithRulers heading="Reset Password" className="pb-8 text-white" />
      {isSignedIn && !complete && (
        <Form
          onSubmit={handleReset}
          className="ml-auto mr-auto flex w-[50vw] flex-col gap-4"
        >
          <ShowHidePassword
            name="currentPassword"
            label="Current Password"
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <ShowHidePassword
            name="newPassword"
            label="New Password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button
            size="large"
            className="bg-supernova text-black"
            handleClick={() => {}}
          >
            SUBMIT
          </Button>
        </Form>
      )}
      <div className="p-4 text-center underline dark:text-white">
        {complete && 'You successfully changed you password'}
        <Link to="/signup">Need an Account?</Link>
      </div>
    </AuthLayout>
  )
}

export default ForgotPasswordPage
