"use client"
import Cryptr from "cryptr";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAccount } from "wagmi";
import { Button, Container, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from "@chakra-ui/react";


export default function ViewDoc() {
    // const testData = { name: "Anu" }
    // const testJson= JSON.stringify(testData)
    // const cryptr = new Cryptr('myTotallySecretKey');

    // const encryptedString = cryptr.encrypt(testJson);
    // const crypt2 = new Cryptr('myTotallySecretKey2');
    // const decryptedString = crypt2.decrypt(encryptedString);

    // console.log("Checking for encrypted data ", encryptedString);
    // console.log(decryptedString);

    const { address, isConnecting, isDisconnected } = useAccount()
    const [data, setData] = useState([])
    const [decodedData, setDecodedData] = useState <any>({})

    const [password, setPassword] = useState('')
    const handlePasswordChange = (e: any) => setPassword(e.target.value)
    const passwordError = password === ''

    useEffect(() => {
        console.log("Address ->", address);
        loadData();
    }, [])

    async function loadData() {
        axios.get(`http://localhost:5000/record/${address}`).then(async function (response) {
            console.log("This is the text.", response.data.data)
            setData(response.data.data)
        })
    }

    async function decodeData(encryptedData: any) {
        if (password.length > 0) {
            const ipfsKey = await axios.get(`https://ipfs.io/ipfs/${encryptedData.ipfs}`)
            console.log(ipfsKey)
            const cryptr = new Cryptr(password);
            const decryptedString = cryptr.decrypt(ipfsKey.data.data);
            console.log(decryptedString);
            setDecodedData(JSON.parse(decryptedString));
        }
    }
    return <><head>
        <title>Document Access Page</title>

        <h1>Document Access Page</h1>

    </head>
        <Container>
            {data.map((item: any, index: number) => {
                return (<><p>
                    {index + 1}) {item.address}
                </p>

                    <FormControl isInvalid={passwordError}>
                        <FormLabel>Password</FormLabel>
                        <Input type='password' onChange={handlePasswordChange} />
                        {!passwordError ? (
                            <FormHelperText>
                                Enter your Document Password.
                            </FormHelperText>
                        ) : (
                            <FormErrorMessage>Document Password is required.</FormErrorMessage>
                        )}
                    </FormControl>

                    <br></br>

                    <Button onClick={() => decodeData(item)} colorScheme='teal' variant='solid'>
                        Submit
                    </Button>

                    {decodedData ? (<><p>{decodedData.firstName}</p>
                    <p>{decodedData.lastName}</p>
                    <p>{decodedData.email}</p>
                    <p>{decodedData.dateOfBirth}</p>
                    <p>{decodedData.nationality}</p>
                    <p>{decodedData.gender}</p>
                    <p>{decodedData.maritalStatus}</p>
                    <p>{decodedData.fathersName}</p>
                    <p>{decodedData.mothersName}</p>
                    <p>{decodedData.nomineeName}</p>
                    <p>{decodedData.relation}</p>
                    <p>{decodedData.streetName}</p>
                    <p>{decodedData.cityName}</p>
                    <p>{decodedData.stateName}</p>
                    <p>{decodedData.pinCode}</p>
                    <p>{decodedData.countryName}</p>
            
                    </>):(<></>)}

                </>)

            })}
        </Container>
    </>

}




