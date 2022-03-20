import {FC} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme'
import { REGISTER_ROUTE } from '../utils/conts';
import { Link as RouterLink } from 'react-router-dom';

export const Login: FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography textTransform='uppercase' fontWeight='500' component="h1" fontSize='30px' sx={{ mb: 1 }} >
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              size='large'
              fullWidth
              variant='contained'
              sx={{ mb: 2 }}
            >
              Sign In
            </Button>
            <Link to={REGISTER_ROUTE} component={RouterLink} variant="body2">
              Don't have an account? Sign Up
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}