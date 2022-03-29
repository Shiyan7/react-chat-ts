import { FC } from 'react'
import { Box, Typography } from '@mui/material'
import { Avatar } from '../../components/Avatar/Avatar'
import { useAuth } from '../../providers/useAuth'
import { IMessage } from '../../types/types'
import styles from './Message.module.scss'
import classNames from 'classnames'

export const Message:FC<{message: IMessage}> = ({message}) => {

    const { user } = useAuth()

    const myMessage = user?._id === message.uid

    return (
        <Box className={classNames(styles.message, myMessage ? styles.myMessage : '' )}>
            {!myMessage ? <Avatar cls={styles.avatar} txt={message.displayName} width={38} height={38} /> : null}
            <Box className={styles.content}>
                {!myMessage ? <Box className={styles.name}>{message.displayName}</Box> : null}
                <Box className={styles.text}>
                    <span className={styles.messageText}>{message.text}</span>
                    
                    <Typography className={styles.timestamp} variant='body2'>
                        {message.timestamp}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

// return (
//     <Box className={classNames(styles.message, myMessage ? styles.myMessage : '' )}>                
//         <Avatar cls={styles.avatar} txt={message.displayName} width={38} height={38} />
//         <Box sx={{ml: 1}}>
//             {!myMessage ?
            
//             <Box className={styles.text}>
//                 <Box mr={1}>{message.displayName}</Box>
//                 <Typography className={styles.timestamp} variant='body2'>
//                     {message.timestamp}
//                 </Typography>
//             </Box>

//             : null
//             }
//             <Typography maxWidth='300px' variant='body2'>{message.text}</Typography>
//         </Box>
//     </Box>
// )
