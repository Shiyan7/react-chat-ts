import { FC } from 'react'
import { Box, Typography } from '@mui/material'
import { Avatar } from '../../components/Avatar/Avatar'
import { useAuth } from '../../providers/useAuth'
import { IMessage } from '../../types/types'
import styles from './Style.module.scss'
import classNames from 'classnames'

export const Message:FC<{message: IMessage}> = ({message}) => {

    const { user } = useAuth()

    return (
        <Box className={classNames(styles.message, user?._id === message.uid ? styles.myMessage : '' )}>                
            <Avatar cls={styles.avatar} txt={message.displayName} width={38} height={38} />
            <Box sx={{ml: 1}}>
                <Box className={styles.text}>
                    <Box mr={1}>{message.displayName}</Box>
                    <Typography className={styles.timestamp} variant='body2'>
                        {message.timestamp}
                    </Typography>
                </Box>
                <Typography maxWidth='300px' variant='body2'>{message.text}</Typography>
            </Box>
        </Box>
    )
}
