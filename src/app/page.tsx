"use client"
import Image from 'next/image'


import { Web3Storage } from 'web3.storage';


import { ethers } from "ethers";


import { ConnectButton } from '@rainbow-me/rainbowkit';


import { abi } from "./abi.ts"
import { useAccount } from 'wagmi';
import { create } from '@web3-storage/w3up-client'

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Container,
  HStack,
  Radio,
  RadioGroup,
  Button,
  ButtonGroup
} from '@chakra-ui/react'


import Cryptr from "cryptr";


import {
  useEffect,
  useState
} from "react"
import axios from 'axios';
import { ARBITRUM_SEPOLIA_CONTRACT_ADDRESS, BACKEND_DATABASE_POST_ENDPOINT, WEB3_STORAGE_DID } from './constants.ts';


declare global {
  interface Window {
    ethereum?: any
  }
}


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


  const [dateOfBirth, setdateOfBirth] = useState('')
  const handledateOfBirthChange = (e: any) => setdateOfBirth(e.target.value)
  const dateOfBirthError = dateOfBirth === ''


  const [nationality, setNationality] = useState('')
  const handleNationalityChange = (e: any) => setNationality(e.target.value)
  const nationalityError = nationality === ''


  const [gender, setGender] = useState('')
  const genderChange = (e: any) => {
    console.log(e)
    setGender(e)
  }


  const genderError = gender === ''


  const [maritalStatus, setMaritalStatus] = useState('')
  const maritalStatusChange = (e: any) => setMaritalStatus(e)
  const maritalStatusError = maritalStatus === ''


  const [fathersName, setFathersName] = useState('')
  const handleFathersNameChange = (e: any) => setFathersName(e.target.value)
  const fathersNameError = fathersName === ''


  const [mothersName, setMothersName] = useState('')
  const handleMothersNameChange = (e: any) => setMothersName(e.target.value)
  const mothersNameError = mothersName === ''


  const [nomineeName, setNomineeName] = useState('')
  const handleNomineeNameChange = (e: any) => setNomineeName(e.target.value)
  const nomineeNameError = nomineeName === ''


  const [relationName, setRelationName] = useState('')
  const handleRelationChange = (e: any) => setRelationName(e.target.value)
  const relationError = relationName === ''


  const [streetName, setStreetName] = useState('')
  const handleStreetChange = (e: any) => setStreetName(e.target.value)
  const streetError = streetName === ''


  const [cityName, setCityName] = useState('')
  const handleCityChange = (e: any) => setCityName(e.target.value)
  const cityError = cityName === ''


  const [stateName, setStateName] = useState('')
  const handleStateChange = (e: any) => setStateName(e.target.value)
  const stateError = stateName === ''


  const [pinCode, setPinCode] = useState('')
  const handlePinCodeChange = (e: any) => setPinCode(e.target.value)
  const pinCodeError = pinCode === ''


  const [countryName, setCountryName] = useState('')
  const handleCountryChange = (e: any) => setCountryName(e.target.value)
  const countryError = countryName === ''


  const [documentPassword, setdocumentPassword] = useState('')
  const handleDocumentPassword = (e: any) => setdocumentPassword(e.target.value)
  const documentPasswordError = documentPassword === ''


  const [image, setImage] = useState<any>()
  const [signer, setSigner] = useState<any>();
  const { address, isConnecting, isDisconnected } = useAccount()


  useEffect(() => {
    if (window.ethereum) {
      setProvider();
      console.log("Users address is ", address);
    }
  }, [])


  async function setProvider() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setSigner(provider.getSigner());
  }


  function makeFileObjects(obj: any) {
    const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })
    // const files = [
    //   new File([blob], 'kyc.json')
    // ]
    return new File([blob], 'kyc.json')
  }


  function handleImage(e: any) {
    console.log(e)
    setImage(e.target.files[0])
  }


  async function storeOnIpfs(file: File): Promise<string> {
    try {
      const client = await create();
      const myAccount = await client.login("anupama12sg@gmail.com");
      await client.setCurrentSpace(WEB3_STORAGE_DID);
      const cid = await client.uploadFile(file);
      return cid.toString();
    } catch (error) {
      console.log(`Error in storing data to IPFS ${error}`);
      throw new Error('Error in storing data to IPFS');
    }
  }


  async function sendToContract(file_cid: string, image_cid: string) {
    try {
      const contractInstance = new ethers.Contract(ARBITRUM_SEPOLIA_CONTRACT_ADDRESS, abi, signer)
      const transaction = await contractInstance.registerCustomer(firstName, file_cid, image_cid)
      transaction.wait()
      console.log(transaction)
      return transaction;
    } catch (error) {
      console.log(`Error in contract transaction ${error}`);
      throw new Error('Error in contract transaction');
    }
  }


  async function sendToDB(file_cid: string, image_cid: string) {
    try {
      axios.post(BACKEND_DATABASE_POST_ENDPOINT, {
        data: { address: address, ipfs: file_cid, image: image_cid }
      })
        .then(function (response) {
          console.log(response);
          setEmail("")
          setCityName("")
          setCountryName("")
          setFathersName("")
          setFirstName("")
          setGender("")
          setLastName("")
          setMothersName("")
          setNationality("")
          setNomineeName("")
          setPinCode("")
          setRelationName("")
          setStateName("")
          setStreetName("")
          setdateOfBirth("")
          setMaritalStatus("")
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(`Error in posting transaction to Database ${error}`);
      throw new Error('Error in posting data to Database');
    }
  }


  async function uploadData() {
    try {
      const payLoad = {
        address: address,
        email: email,
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        nationality: nationality,
        gender: gender,
        maritalStatus: maritalStatus,
        fathersName: fathersName,
        mothersName: mothersName,
        nomineeName: nomineeName,
        relationName: relationName,
        streetName: streetName,
        cityName: cityName,
        pinCode: pinCode,
        countryName: countryName,
      }
      const cryptr = new Cryptr(documentPassword);
      const payLoadJson = JSON.stringify(payLoad)
      const encryptedData = cryptr.encrypt(payLoadJson);
      const uploadInfo = { data: encryptedData }
      console.log(payLoad)
      // client = makeStorageClient()
      const image_cid = await storeOnIpfs(new File([image], "image"));
      const files = makeFileObjects(uploadInfo)
      const file_cid = await storeOnIpfs(files);


      console.log('stored files with cid:', file_cid.toString())
      console.log("The signer is ", signer);
      console.log("The connected address is ", await signer.getAddress());


      const transaction = await sendToContract(file_cid, image_cid);
      const db = await sendToDB(file_cid, image_cid);
    } catch (error) {
      console.log(error);
      throw new Error('Error in uploading data');
    }
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Container>


        <head>
          <title>KYC Form</title>


          <h1>KYC Form</h1>
          <p>Identification Details:</p>
        </head>


        <div className="connectbutton"><ConnectButton /></div>


        <FormControl isInvalid={firstNameError}>
          <FormLabel>First Name</FormLabel>
          <Input type="text" value={firstName} onChange={handleFirstNameChange} />
          {!firstNameError ? (
            <FormHelperText>
              Enter your First Name.
            </FormHelperText>
          ) : (
            <FormErrorMessage>Full Name is required.</FormErrorMessage>
          )}
        </FormControl>
        <br></br>
        <FormControl isInvalid={lastNameError}>
          <FormLabel>Last Name</FormLabel>
          <Input type="text" value={lastName} onChange={handleLastNameChange} />
          {!lastNameError ? (
            <FormHelperText>
              Enter your Last Name.
            </FormHelperText>
          ) : (
            <FormErrorMessage>Full Name is required.</FormErrorMessage>
          )}
        </FormControl>


        <br></br>


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


        <br></br>


        <FormControl isInvalid={dateOfBirthError}>
          <FormLabel>Date of Birth</FormLabel>
          <Input type="text" value={dateOfBirth} onChange={handledateOfBirthChange} />
          {!dateOfBirthError ? (
            <FormHelperText>
              Enter your Date of Birth.
            </FormHelperText>
          ) : (
            <FormErrorMessage>Date of Birth is required.</FormErrorMessage>
          )}
        </FormControl>


        <br></br>


        <FormControl isInvalid={nationalityError}>
          <FormLabel>Nationality</FormLabel>
          <Input type="text" value={nationality} onChange={handleNationalityChange} />
          {!nationalityError ? (
            <FormHelperText>
              Enter your Nationality.
            </FormHelperText>
          ) : (
            <FormErrorMessage>Nationality is required.</FormErrorMessage>
          )}
        </FormControl>


        <br></br>


        <FormControl as='fieldset'>
          <FormLabel as='legend'>
            Select Gender
          </FormLabel>
          <RadioGroup onChange={genderChange} >
            <HStack spacing='24px'>
              <Radio value='Male'>Male</Radio>
              <Radio value='Female'>Female</Radio>
              <Radio value='Other'>Other</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>


        <br></br>


       <FormControl as='fieldset'>
          <FormLabel as='legend'>
            Marital Status
          </FormLabel>
          <RadioGroup onChange={maritalStatusChange}>
            <HStack spacing='24px'>
              <Radio value='Single'>Single</Radio>
              <Radio value='Married'>Married</Radio>
              <Radio value='Separated'>Separated</Radio>
              <Radio value='Divorced'>Divorced</Radio>
              <Radio value='Widowed'>Widowed</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>

        <br></br>

        <FormControl isInvalid={fathersNameError}>
          <FormLabel>Father&aposs Name</FormLabel>
          <Input type="Fathers Name" value={fathersName} onChange={handleFathersNameChange} />
          {!fathersNameError ? (
            <FormHelperText>
              Enter your Fathers Name.
            </FormHelperText>
          ) : (
            <FormErrorMessage>Fathers Name is required.</FormErrorMessage>
          )}
        </FormControl>

        <br></br>

        <FormControl isInvalid={mothersNameError}>
          <FormLabel>Mother&aposs Name</FormLabel>
          <Input type='Mothers Name' value={mothersName} onChange={handleMothersNameChange} />
          {!mothersNameError ? (
            <FormHelperText>
              Enter your Mothers Name.
            </FormHelperText>
          ) : (
            <FormErrorMessage>Mothers Name is required.</FormErrorMessage>
          )}
        </FormControl>

        <br></br>

        <FormControl isInvalid={nomineeNameError}>
          <FormLabel>Nominee Name</FormLabel>
          <Input type="Nominees Name" value={nomineeName} onChange={handleNomineeNameChange} />
          {!nomineeNameError ? (
            <FormHelperText>
              Enter your Nominees Name.
            </FormHelperText>
          ) : (
            <FormErrorMessage>Nominees Name is required.</FormErrorMessage>
          )}
        </FormControl>

        <br></br>

        <FormControl isInvalid={relationError}>
          <FormLabel>Relation with Nominee</FormLabel>
          <Input type="Relation with Nominee" value={relationName} onChange={handleRelationChange} />
          {!relationError ? (
            <FormHelperText>
              Enter Relation with Nominee.
            </FormHelperText>
          ) : (
            <FormErrorMessage>Relation with Nominee is required.</FormErrorMessage>
          )}
        </FormControl>

        <br></br>

        <div className="grid-container">
          <FormControl isInvalid={streetError}>
            <FormLabel>Street Address</FormLabel>
            <Input
              type="text"
              value={streetName}
              onChange={handleStreetChange}
              placeholder="Street"
            />
            {!streetError ? (
              <FormHelperText>Enter Stree Address</FormHelperText>
            ) : (
              <FormErrorMessage>Street Address is required.</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={cityError}>
            <FormLabel>City</FormLabel>
            <Input
              type="text"
              value={cityName}
              onChange={handleCityChange}
              placeholder="City"
            />
            {!cityError ? (
              <FormHelperText>Enter City.</FormHelperText>
            ) : (
              <FormErrorMessage>City is required.</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={stateError}>
            <FormLabel>State</FormLabel>
            <Input
              type="text"
              value={stateName}
              onChange={handleStateChange}
              placeholder="State"
            />
            {!stateError ? (
              <FormHelperText>Enter State.</FormHelperText>
            ) : (
              <FormErrorMessage>State is required.</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={pinCodeError}>
            <FormLabel>Pin Code</FormLabel>
            <Input
              type="number"
              value={pinCode}
              onChange={handlePinCodeChange}
              placeholder="Pin Code"
            />
            {!pinCodeError ? (
              <FormHelperText>Enter Pin Code.</FormHelperText>
            ) : (
              <FormErrorMessage>Pin Code is required.</FormErrorMessage>
            )}
          </FormControl>

          <br>

          </br>

          <FormControl isInvalid={countryError}>
            <FormLabel>Country</FormLabel>
            <Input
              type="text"
              value={countryName}
              onChange={handleCountryChange}
              placeholder="Country"
            />
            {!countryError ? (
              <FormHelperText>Enter Country.</FormHelperText>
            ) : (
              <FormErrorMessage>Country is required.</FormErrorMessage>
            )}
          </FormControl>
        </div>

        <br></br>

        <form className='imageForm'>
          <div className="upload-container">
            <label htmlFor="identity-upload">Upload Your Identity:</label>
            <input
              type="file"
              id="identity-upload"
              name="identity-upload"
              accept=".pdf, .jpg, .jpeg, .png"
              onChange={e => handleImage(e)}
            />
            <p className="upload-instructions">Accepted formats: PDF, JPG, JPEG, PNG</p>
          </div>
        </form>
        {image ? (
          <>
            <div>
              <img src={URL.createObjectURL(image)} />
            </div>
          </>
        ) : (<></>)}
        <br></br>

        <form>

          <div className="declaration-container">
            <label htmlFor="declaration">Declaration:</label>
            <textarea
              id="declaration"
              name="declaration"
              rows={4}
            ></textarea>

            <br></br>

            <div className="checkbox-container">
              <input
                type="checkbox"
                id="declaration-checkbox"
                name="declaration-checkbox"
              />
              <label htmlFor="declaration-checkbox">I, hereby declare and affirm that all the information provided in this KYC form is true, accurate and complete to the best of my knowledge. I understand that any misrepresentation or omission of information may result in legal consequences. I also acknowledge that I have read and agree to abide by the terms and conditions of this service.</label>
            </div>
          </div>
        </form>

        <br></br>

        <FormControl isInvalid={documentPasswordError}>
          <FormLabel>Document Password</FormLabel>
          <Input type="text" value={documentPassword} onChange={handleDocumentPassword} />
          {!documentPasswordError ? (
            <FormHelperText>
              Enter your Document Password.
            </FormHelperText>
          ) : (
            <FormErrorMessage>Document Password is required.</FormErrorMessage>
          )}
        </FormControl>
        <br></br>
        <Button onClick={uploadData} colorScheme='teal' variant='solid'>
          Submit
        </Button>
      </Container>
    </main >
  )
}
