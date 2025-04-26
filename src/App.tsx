import React from 'react'

import { ThemeProvider } from "./components/themeProvider"
import Layout from './Layout'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>Testing</Layout>
    </ThemeProvider>
  )
}

export default App
