import { Avatar as MuiAvatar } from '@mui/material';
import { FC } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useAuth } from '../../providers/useAuth'

export const Avatar: FC = () => {

    const { ga } = useAuth();
    const [user] = useAuthState(ga)
      
    const stringAvatar = (name: string) => {
        return {
          children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    return (
        user?.displayName
        ?
        <MuiAvatar {...stringAvatar(user?.displayName)} sx={{width: 30, height: 30, fontSize: '14px'}} />
        :
        <MuiAvatar sx={{width: 30, height: 30}} />
    )
}
