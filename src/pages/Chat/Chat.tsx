import {FC, FormEvent, useEffect, useRef, useState} from 'react'
import {Box, Container, Fab, TextField, Typography} from '@mui/material'
import {Send} from '@mui/icons-material'
import {useAuth} from '../../providers/useAuth'
import {addDoc, collection, onSnapshot, orderBy, query, serverTimestamp} from 'firebase/firestore'
import {useAuthState} from 'react-firebase-hooks/auth';
import {NoMessages} from "./NoMessages"
import {Message} from './Message'
import {IMessage} from '../../types/types'
import styles from './Chat.module.scss'
import dayjs from 'dayjs'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

export const Chat: FC = () => {

    const {ga, db} = useAuth()
    const [user] = useAuthState(ga)
    const [value, setValue] = useState<string>('')
    const [messages, setMessages] = useState<IMessage[]>([])
    const chatContainer = useRef<HTMLElement>(null)

    useEffect(
        () => {
            onSnapshot(
                query(collection(db, 'messages'), orderBy('timestamp', 'asc')),
                snapshot => {
                    setMessages(
                        snapshot.docs.map(d =>
                            d.data()?.timestamp
                                ? ({
                                    uid: d.id,
                                    ...d.data(),
                                    timestamp: dayjs.unix(d.data()?.timestamp.seconds).format('HH:mm')
                                } as IMessage)
                                : ({
                                    uid: d.id,
                                    ...d.data(),
                                } as IMessage)
                        )
                    )
                }
            )
            // eslint-disable-next-line
        }, [])

    const sendMessage = async (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {

        try {

            e.preventDefault();

            if (value.trim()) {

                await addDoc(collection(db, 'messages'), {
                    uid: user?.uid,
                    displayName: user?.displayName,
                    text: value,
                    timestamp: serverTimestamp()
                })

                setValue('')
            }

        } catch (error: unknown) {
            console.error(error);

        }
    }

    useEffect(() => {
        chatContainer.current?.scrollTo(0, chatContainer.current.scrollHeight)
    }, [messages])

    return (
        <Container maxWidth='md' sx={{paddingTop: 8, paddingBottom: 8}}>
            <Box sx={{display: 'flex', alignItems: 'flex-end', mb: 2}}>
                <Typography lineHeight='25px' variant='h6' mr='14px'>Chat</Typography>
                <Typography variant='caption' color='#909090'>{messages.length} messages</Typography>
            </Box>
            <Box className={styles.chat}>
                <SimpleBar scrollableNodeProps={{ref: chatContainer}} style={{maxHeight: '100%'}}>
                    <Box className={styles.chatContainer}>
                        {messages?.length
                            ?
                            messages.map((message, idx) =>
                                <Message message={message} key={idx}/>
                            )
                            :
                            <NoMessages/>
                        }
                    </Box>
                </SimpleBar>
            </Box>
            <Box onSubmit={sendMessage} component='form' sx={{display: 'flex'}}>
                <TextField
                    sx={{width: '100%', mr: '15px'}}
                    variant='outlined'
                    placeholder='Type something...'
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
                <Fab onClick={sendMessage} sx={{padding: '5px 20px'}} color='primary' aria-label="Send message">
                    <Send/>
                </Fab>
            </Box>
        </Container>
    )
}