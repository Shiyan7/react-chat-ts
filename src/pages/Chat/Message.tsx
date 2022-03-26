import { FC } from 'react'
import { Box, Typography } from '@mui/material'
import { Avatar } from '../../components/Avatar/Avatar'
import { useAuth } from '../../providers/useAuth'
import { IMessage } from '../../types/types'

export const Message:FC<{message: IMessage}> = ({message}) => {

    const {user} = useAuth()

    return (
        <Box sx={{
            marginTop: 2,
            marginBottom: 2,
            marginLeft: user?._id === message.uid ? 'auto' : '10px',
        }}>
            <Box sx={{
                width: 'fit-content',
                display: 'flex',
                backgroundColor: '#eaeaea',
                borderRadius: '10px',
                padding: '15px',
                maxWidth: '300px'
            }}>
                
                <Avatar txt={message.displayName} width={38} height={38} />
                <Box sx={{ml: 1}}>
                    <Box sx={{display: 'flex', alignItems: 'center', mb: '2px', fontSize: '15px'}}>
                        <Box mr={1}>{message.displayName}</Box>
                        <Typography variant='body2' color='#909090'>
                            {message.timestamp || '00:00'}
                        </Typography>
                    </Box>
                    <Typography maxWidth='300px' variant='body2'>{message.text}</Typography>
                </Box>
            </Box>
        </Box>
    )
}
