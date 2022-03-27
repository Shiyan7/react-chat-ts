import {FC} from 'react'
import {BrowserRouter} from 'react-router-dom';
import {CssBaseline} from '@mui/material'
import {AppRouter} from './components/AppRouter/AppRouter'
import {Header} from './components/Header/Header'

export const App: FC = () => {

    return (
        <BrowserRouter>
            <CssBaseline/>
            <Header/>
            <AppRouter/>
        </BrowserRouter>
    )
}