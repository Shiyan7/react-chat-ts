import { createContext, FC, useMemo, useState } from 'react'
import { AppRouter } from './components/AppRouter/AppRouter'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { Header } from './components/Header/Header'
import { useAuth } from './providers/useAuth';
import { BrowserRouter } from 'react-router-dom';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const App: FC = () => {

  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const {ga} = useAuth()

  console.log(ga);
  

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <BrowserRouter>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <AppRouter />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </BrowserRouter>
  )
}