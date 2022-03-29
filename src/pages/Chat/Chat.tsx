import {ChangeEvent, FC, FormEvent, useEffect, useRef, useState} from 'react'
import {Box, Container, Fab, IconButton, TextField, Typography} from '@mui/material'
import {Clear, Send} from '@mui/icons-material'
import {useAuth} from '../../providers/useAuth'
import {addDoc, collection, onSnapshot, orderBy, query, serverTimestamp} from 'firebase/firestore'
import {useAuthState} from 'react-firebase-hooks/auth';
import {Message} from './Message'
import {IMessage} from '../../types/types'
import styles from './Style.module.scss'
import dayjs from 'dayjs'
import SimpleBar from 'simplebar-react'
import classNames from 'classnames'
import 'simplebar/dist/simplebar.min.css'

export const Chat: FC = () => {

    const {ga, db} = useAuth()
    const [user] = useAuthState(ga)
    const [message, setMessage] = useState<string>('')
    const [messages, setMessages] = useState<IMessage[]>([])
    const [searchValue, setSearchValue] = useState<string>('')
    const chatContainer = useRef<HTMLElement>(null)

    const searchMessages = messages.filter(message =>
        message.text.toLowerCase().includes(searchValue.toLowerCase()),
    );

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    const clickHandler = () => {
        setSearchValue('')
    }

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

            if (message.trim()) {

                await addDoc(collection(db, 'messages'), {
                    uid: user?.uid,
                    displayName: user?.displayName,
                    text: message,
                    timestamp: serverTimestamp()
                })

                setMessage('')
            }

        } catch (error: unknown) {
            console.error(error);

        }
    }

    useEffect(() => {
        chatContainer.current?.scrollTo(0, chatContainer.current.scrollHeight)
    }, [messages])

    return (
        <Container maxWidth='md' sx={{paddingTop: 16, paddingBottom: 8}}>
            <Box className={styles.header}>
                <Box className={styles.title}>
                    <Typography lineHeight='25px' variant='h6' mr='14px'>Chat</Typography>
                    <Typography variant='caption' color='#909090'>{messages.length} messages</Typography>
                </Box>
                <Box component='form'>
                    <TextField
                        className={styles.input}
                        variant='standard'
                        placeholder='Search by messages...'
                        value={searchValue}
                        onChange={changeHandler}
                        InputProps={{
                            endAdornment: (
                                <IconButton className={classNames(styles.searchButton, searchValue ? styles.searchButtonActive : null)} onClick={clickHandler}>
                                    <Clear />
                                </IconButton>
                            ),
                        }}
                    />
                </Box>
            </Box>
            <Box className={styles.chat}>
                <SimpleBar scrollableNodeProps={{ref: chatContainer}} style={{maxHeight: '100%'}}>
                    <Box className={styles.chatContainer}>
                        {searchMessages.map((message, idx) =>
                            <Message message={message} key={idx}/>
                        )}
                    </Box>
                </SimpleBar>
            </Box>
            <Box onSubmit={sendMessage} component='form' sx={{display: 'flex'}}>
                <TextField
                    sx={{width: '100%', mr: '15px'}}
                    variant='outlined'
                    placeholder='Type something...'
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <Fab onClick={sendMessage} sx={{padding: '5px 20px'}} color='primary' aria-label="Send message">
                    <Send/>
                </Fab>
            </Box>
        </Container>
    )
}