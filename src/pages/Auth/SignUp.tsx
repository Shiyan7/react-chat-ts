import {FC, FormEvent, useState} from 'react'
import {Button, TextField, Link, Grid, Box, Typography, Container} from '@mui/material'
import {LOGIN_ROUTE} from '../../utils/conts'
import {Link as RouterLink} from 'react-router-dom'
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {IUser} from '../../types/types'
import {Alert, IconButton, InputAdornment} from '@mui/material'
import {useAuth} from '../../providers/useAuth'
import {Visibility, VisibilityOff} from '@mui/icons-material'

export const SignUp: FC = () => {
    const {ga} = useAuth();

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    } as IUser)
    const [error, setEror] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleLogin = async (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
        e.preventDefault()

        try {
            const response = await createUserWithEmailAndPassword(
                ga,
                userData.email,
                userData.password
            )

            await updateProfile(response.user, {
                displayName: `${userData.firstName} ${userData.lastName}`,
            })

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
                <Typography textTransform='uppercase' fontWeight='500' component="h1" fontSize='30px' sx={{mb: 3}}>
                    Sign up
                </Typography>
                {error && <Alert sx={{width: '100%', mb: 1, mt: 2}} severity='error'>{error}</Alert>}
                <Box component="form" noValidate onSubmit={handleLogin}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                value={userData.firstName}
                                onChange={e => setUserData({...userData, firstName: e.target.value})}
                                id="firstName"
                                label="First Name"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                value={userData.lastName}
                                onChange={e => setUserData({...userData, lastName: e.target.value})}
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                value={userData.email}
                                onChange={e => setUserData({...userData, email: e.target.value})}
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                value={userData.password}
                                onChange={e => setUserData({...userData, password: e.target.value})}
                                id="password"
                                autoComplete="new-password"
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
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        size='large'
                        variant="contained"
                        onClick={handleLogin}
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign Up
                    </Button>
                    <Link to={LOGIN_ROUTE} component={RouterLink} variant="body2">
                        Already have an account? Sign in
                    </Link>
                </Box>
            </Box>
        </Container>
    );
}