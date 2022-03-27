import {FC, FormEvent, useState} from 'react'
import {
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Box,
    Typography,
    Container,
    Alert,
    InputAdornment,
    IconButton
} from '@mui/material'
import {REGISTER_ROUTE} from '../../utils/conts'
import {Link as RouterLink} from 'react-router-dom'
import {IUser} from '../../types/types'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {useAuth} from '../../providers/useAuth'
import {Visibility, VisibilityOff} from '@mui/icons-material'

export const SignIn: FC = () => {

    const {ga} = useAuth();

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    } as IUser)
    const [error, setEror] = useState<boolean>()
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleLogin = async (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(
                ga,
                userData.email,
                userData.password
            )
        } catch (e: any) {
            setEror(e.message)
        }

        setUserData({
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        })
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '64px 0'
                }}
            >
                <Typography textTransform='uppercase' fontWeight='500' component="h1" fontSize='30px' sx={{mb: 1}}>
                    Sign in
                </Typography>
                {error && <Alert sx={{width: '100%', mt: 2, mb: 1}} severity='error'>{error}</Alert>}
                <Box component="form" onSubmit={handleLogin} noValidate>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        value={userData.email}
                        onChange={e => setUserData({...userData, email: e.target.value})}
                        name="email"
                        autoComplete="email"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        value={userData.password}
                        onChange={e => setUserData({...userData, password: e.target.value})}
                        id="password"
                        autoComplete="current-password"
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                    >
                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                        sx={{mb: 2}}
                    />
                    <Button
                        type="submit"
                        size='large'
                        fullWidth
                        variant='contained'
                        onClick={handleLogin}
                        sx={{mb: 2}}
                    >
                        Sign In
                    </Button>
                    <Link to={REGISTER_ROUTE} component={RouterLink} variant="body2">
                        Don't have an account? Sign Up
                    </Link>
                </Box>
            </Box>
        </Container>
    );
}