import * as React from 'react';
import CircularProgress, {
    CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ProgressState } from '../../schema/linearProgress';
import { useRecoilValue } from 'recoil';

function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number },
) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress thickness={2.3} style={{ color: "#1976D2", stroke: "3px" }} size={250} variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div>
                    <Typography
                        variant="caption"
                        component="div"
                        style={{ color: "#fff", fontSize: "12px", textAlign: "center" }}
                    >Exporting progress:</Typography>
                    <Typography
                        variant="caption"
                        component="div"
                        style={{ color: "#fff", fontSize: "16px", textAlign: "center" }}
                    >{`${Math.round(props.value)}%`}</Typography>
                </div>
            </Box>
        </Box>
    );
}

export default function CircularWithValueLabel() {
    const updateProgress = useRecoilValue(ProgressState)

    return <CircularProgressWithLabel value={updateProgress?.progress} />;
}
