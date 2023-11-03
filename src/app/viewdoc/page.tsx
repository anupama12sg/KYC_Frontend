"use client"
import Cryptr from "cryptr";
import { useEffect } from "react";
import axios from "axios";
import { useAccount } from "wagmi";

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

    useEffect(() => {
        console.log("Address ->", address);
        axios.get(`http://localhost:5000/record/${address}`).then(function(response){console.log(response)})
      }, [])
      
function decodeData(password: string, encryptedData: any){
    const cryptr = new Cryptr(password);
    const decryptedString = cryptr.decrypt(encryptedData);
    console.log(decryptedString);
    return JSON.parse(decryptedString);
}
    return <><p>Document Access Page</p></>
}




