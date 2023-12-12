import { useState } from 'react'

import { useSignUp } from '@clerk/clerk-react'

import { Form, Label, TextField } from '@redwoodjs/forms'
import { Link } from '@redwoodjs/router'

import Button from 'src/components/Button/Button'
import HeaderWithRulers from 'src/components/HeaderWithRulers/HeaderWithRulers'
import ShowHidePassword from 'src/components/ShowHidePassword/ShowHidePassword'
import AuthLayout from 'src/layouts/AuthLayout/AuthLayout'

const SignUpPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')
  const { isLoaded, signUp, setActive } = useSignUp()

  if (!isLoaded) {
    return null
  }

  async function handleSignUp() {
    await signUp.create({
      emailAddress: email,
      username: userName,
      password,
    })
    await signUp.prepareEmailAddressVerification({
      strategy: 'email_code',
    })
    setPendingVerification(true)
  }

  async function handleVerifyEmail() {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })
      if (completeSignUp.status !== 'complete') {
        /*  investigate the response, to see if there was an error
           or if the user needs to complete more steps.*/
        console.log(JSON.stringify(completeSignUp, null, 2))
      }
      if (completeSignUp.status === 'complete') {
        await setActive({
          session: completeSignUp.createdSessionId,
        })
        // router.push('/')
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <AuthLayout>
      <HeaderWithRulers heading="Sign Up" className="pb-8 text-white" />
      {!pendingVerification && (
        <Form
          onSubmit={handleSignUp}
          className="ml-auto mr-auto flex w-[50vw] flex-col gap-4"
        >
          <div className="field">
            <Label name="username">Username</Label>
            <TextField
              name="username"
              placeholder=" "
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="field">
            <Label name="email">Email Address</Label>
            <TextField
              name="email"
              placeholder=" "
              onChange={(e) => setEmail(e.target.value)}
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
      )}
      {pendingVerification && (
        <div>
          <Form className="flex flex-col gap-4">
            <TextField
              name="code"
              value={code}
              placeholder="Code..."
              onChange={(e) => setCode(e.target.value)}
            />
            <Button
              size="large"
              className="bg-supernova text-black"
              handleClick={handleVerifyEmail}
            >
              VERIFY
            </Button>
          </Form>
        </div>
      )}
      <div className="p-4 text-center underline dark:text-white">
        <Link to="/login">Ready to Login?</Link>
      </div>
    </AuthLayout>
  )
}

export default SignUpPage
