import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useRecoilValue } from 'recoil';
import { ProgressState } from '../../schema/linearProgress';

export default function LinearBuffer() {
    const updateProgress = useRecoilValue(ProgressState)

    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress variant="buffer" value={updateProgress.progress} valueBuffer={updateProgress.buffer} />
        </Box>
    );
}