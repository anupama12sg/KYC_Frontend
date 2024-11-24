"use client";
import { ChakraProvider } from '@chakra-ui/react'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  arbitrumSepolia
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
  [arbitrumSepolia],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'KYC System',
  projectId: 'KYC System on Blockchain Architecture',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

const inter = Inter({ subsets: ['latin'] })

// const metadata: Metadata = {
//   title: 'KYC System',
//   description: 'KYC System on Blockchain Architecture',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}><ChakraProvider>
          <body className={inter.className}>{children}</body>
        </ChakraProvider></RainbowKitProvider>
        </WagmiConfig>
    </html>
  )
}


