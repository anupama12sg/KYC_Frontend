"use client";
import Image from 'next/image'

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input
} from '@chakra-ui/react'

import{
  useState
} from "react"

export default function Home() {
 const [input, setInput]= useState('')
const handleInputChange= (e: any)=> setInput(e.target.value)
const isError= input === ''

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <FormControl isInvalid={isError}>
      <FormLabel>Email</FormLabel>
      <Input type='email' value={input} onChange={handleInputChange} />
      {!isError ? (
        <FormHelperText>
          Enter the email you'd like to receive the newsletter on.
        </FormHelperText>
      ) : (
        <FormErrorMessage>Email is required.</FormErrorMessage>
      )}
    </FormControl>
  
    </main>
  )
  
}
