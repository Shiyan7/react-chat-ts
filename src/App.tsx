import {FC} from 'react'
import {BrowserRouter} from 'react-router-dom';
import {CssBaseline, ThemeProvider} from '@mui/material'
import {AppRouter} from './components/AppRouter/AppRouter'
import {Header} from './components/Header/Header'
import { theme } from './theme';

export const App: FC = () => {

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <CssBaseline/>
                <Header/>
                <AppRouter/>
            </BrowserRouter>
        </ThemeProvider>
    )
}