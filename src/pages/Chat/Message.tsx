import { Box, Typography } from '@mui/material'
import React, { FC } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Avatar } from '../../components/Avatar/Avatar'
import { useAuth } from '../../providers/useAuth'
import { IMessage } from '../../types/types'

export const Message:FC<{message: IMessage}> = ({message}) => {

    const {ga} = useAuth()
    const [user] = useAuthState(ga)

    return (
        <Box sx={{
            marginTop: 2,
            marginBottom: 2,
            marginLeft: user?.uid === message.uid ? 'auto' : '10px',
        }}>
            <Typography variant='body2' color='#909090' pl={2} mb='5px'>
                {message.timestamp || '00:00'}
            </Typography>
            <Box sx={{
                width: 'fit-content',
                backgroundColor: '#eaeaea',
                borderRadius: '10px',
                padding: '15px'
            }}>
                <Box sx={{display: 'flex', alignItems: 'center', mb: 1}}>
                    <Avatar/>
                    <Box ml={1}>{message.displayName}</Box>
                </Box>
                <Typography maxWidth='300px' variant='body2'>{message.text}</Typography>
            </Box>
        </Box>
    )
}
