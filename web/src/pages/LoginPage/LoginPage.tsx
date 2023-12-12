import { useState } from 'react'

import { useSignIn } from '@clerk/clerk-react'

import { Form, Label, TextField } from '@redwoodjs/forms'
import { Link } from '@redwoodjs/router'

import Button from 'src/components/Button/Button'
import HeaderWithRulers from 'src/components/HeaderWithRulers/HeaderWithRulers'
import ShowHidePassword from 'src/components/ShowHidePassword/ShowHidePassword'
import AuthLayout from 'src/layouts/AuthLayout/AuthLayout'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { signIn, setActive } = useSignIn()

  return (
    <AuthLayout>
      <HeaderWithRulers heading="login" className="pb-8 text-white" />
      <Form
        onSubmit={async () => {
          await signIn
            .create({
              identifier: username,
              password,
            })
            .then((result) => {
              if (result.status === 'complete') {
                setActive({ session: result.createdSessionId })
              } else {
                console.log(result)
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }}
        className="ml-auto mr-auto flex w-[50vw] flex-col gap-4"
      >
        <div className="field">
          <Label name="username">Username</Label>
          <TextField
            name="username"
            placeholder=" "
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <ShowHidePassword
          name="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          size="large"
          className="bg-supernova text-black"
          handleClick={() => {}}
        >
          SUBMIT
        </Button>
      </Form>
      <div className="p-4 text-center underline dark:text-white">
        <Link to="/signup">Need an Account?</Link>
      </div>
    </AuthLayout>
  )
}

export default LoginPage
