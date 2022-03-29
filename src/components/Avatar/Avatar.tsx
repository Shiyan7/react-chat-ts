import { Avatar as MuiAvatar } from '@mui/material';
import { FC } from 'react'
import { IAvatar } from '../../types/types';

export const Avatar: FC<IAvatar> = ({width = 30, height = 30, txt}) => {

    const stringAvatar = (txt: string | undefined) => {
        if(!txt) return false;

        return {
          children: `${txt.split(' ')[0][0]}${txt.split(' ')[1][0]}`,
        };
    }

    return (
        <MuiAvatar {...stringAvatar(txt)} sx={{width: width, height: height, fontSize: '14px'}} />
    )
}
