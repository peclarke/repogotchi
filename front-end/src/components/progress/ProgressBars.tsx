import React from 'react';
import Box from '@mui/material/Box';
import Progress from './Progress';

export type ProgressBarsProps = {
    progress: Record<string, string | number>[];
}

export default function ProgressBars() {
    return (
        <Box>
            <Progress title="Health" bio="Ability to meet your contribution goals" progress={40}/>
            <Progress title="Emotional Wellbeing" bio="Consistent contributions to your repository" progress={80}/>
        </Box>
    )
}