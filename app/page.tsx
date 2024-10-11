'use client'

import { ComedyPage } from '@/components/custom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const Home = () => (
  <QueryClientProvider client={queryClient}>
    <ComedyPage />
  </QueryClientProvider>
)

export default Home
