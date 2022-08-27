import React from 'react';
import Box from '@mui/material/Box';
import Progress from './Progress';

export type ProgressBarsProps = {
    progress: Record<string, string | number>[];
}

export default function ProgressBars() {
    return (
        <Box>
            <Progress title="Health" bio="Make commits often to keep their health up" progress={40}/>
            <Progress title="Affection" bio="Regular visits improve their affection to you " progress={80}/>
        </Box>
    )
}