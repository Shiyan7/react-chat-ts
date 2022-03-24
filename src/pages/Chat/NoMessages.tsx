import {Box, Typography} from '@mui/material';
import {FC} from 'react';

export const NoMessages: FC = () => {
    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 24}}>
            <Typography variant='h6'>No messages!</Typography>
        </Box>
    );
};
