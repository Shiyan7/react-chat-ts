import { FC } from 'react'
import { AppRouter } from './components/AppRouter/AppRouter'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme'
import { Header } from './components/Header/Header'

export const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <AppRouter />
    </ThemeProvider>
  )
}