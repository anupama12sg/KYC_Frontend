"use client";
import Image from 'next/image'

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Container
} from '@chakra-ui/react'

import {
  useState
} from "react"

export default function Home() {
  const [email, setEmail] = useState('')
  const handleEmailChange = (e: any) => setEmail(e.target.value)
  const emailError = email === ''

  const [name, setName] = useState('')
  const handleNameChange = (e: any) => setName(e.target.value)
  const nameError = name === ''

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Container>

        <FormControl isInvalid={nameError}>
          <FormLabel>Full Name</FormLabel>
          <Input type="text" value={name} onChange={handleNameChange} />
          {!nameError ? (
            <FormHelperText>
              Enter your Name.
            </FormHelperText>
          ) : (
            <FormErrorMessage>Full Name is required.</FormErrorMessage>
          )}
        </FormControl>


        <FormControl isInvalid={emailError}>
          <FormLabel>Email</FormLabel>
          <Input type='email' value={email} onChange={handleEmailChange} />
          {!emailError ? (
            <FormHelperText>
              Enter your Email ID.
            </FormHelperText>
          ) : (
            <FormErrorMessage>Email ID is required.</FormErrorMessage>
          )}
        </FormControl>



      </Container>

    </main>
  )

}
