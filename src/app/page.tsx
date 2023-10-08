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

  const [firstName, setFirstName] = useState('')
  const handleFirstNameChange = (e: any) => setFirstName(e.target.value)
  const firstNameError = firstName === ''

  const [lastName, setLastName] = useState('')
  const handleLastNameChange = (e: any) => setLastName(e.target.value)
  const lastNameError = lastName === ''

  const [gender, setGender] = useState('')
  const genderChange = (e: any) => setGender(e.target.value)
  const genderError = gender === ''

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Container>

        <FormControl isInvalid={firstNameError}>
          <FormLabel>First Name</FormLabel>
          <Input type="text" value={firstName} onChange={handleFirstNameChange} />
          {!firstNameError ? (
            <FormHelperText>
              Enter your Name.
            </FormHelperText>
          ) : (
            <FormErrorMessage>Full Name is required.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={lastNameError}>
          <FormLabel>Last Name</FormLabel>
          <Input type="text" value={lastName} onChange={handleLastNameChange} />
          {!lastNameError ? (
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

        <FormControl as='fieldset'>
  <FormLabel as='Select Gender'>
    Select Gender
  </FormLabel>
    <HStack spacing='24px'>
      <Radio value='Male'>Male</Radio>
      <Radio value='Female'>Female</Radio>
      <Radio value='Other'>Other</Radio>
    </HStack>
</FormControl>

      </Container>

    </main>
  )

}
