import {createContext, FC, useMemo, useState} from 'react'
import {AppRouter} from './components/AppRouter/AppRouter'
import {createTheme, CssBaseline, ThemeProvider, useMediaQuery} from '@mui/material'
import {Header} from './components/Header/Header'
import {BrowserRouter} from 'react-router-dom';

export const ColorModeContext = createContext({
    toggleColorMode: () => {
    }
});

export const App: FC = () => {

    const [mode, setMode] = useState<'light' | 'dark'>('light');

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [prefersDarkMode],
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
                    <CssBaseline/>
                    <Header/>
                    <AppRouter/>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </BrowserRouter>
    )
}