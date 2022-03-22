import { FC } from 'react'
import { Box, CircularProgress } from '@mui/material'

export const Loader: FC = () => (
    <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: '-1'
    }}>
        <CircularProgress />
    </Box>
)