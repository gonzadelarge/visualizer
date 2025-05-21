import React from 'react'

import Layout from './Layout'

import { ThemeProvider } from "./components/themeProvider"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout />
    </ThemeProvider>
  )
}

export default App
