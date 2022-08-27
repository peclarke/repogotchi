import React from 'react';
import Box from '@mui/material/Box';
import Progress from './Progress';
import { RepogotchiType } from '../../state/repo';
import Paper from '@mui/material/Paper';

export type ProgressBarsProps = {
    repo: RepogotchiType;
}

export default function ProgressBars(props: ProgressBarsProps) {

    const healthPercent = Math.ceil(props.repo.CurrentHealth / props.repo.MaxHealth) * 100;
    const affPercent = Math.ceil(props.repo.Affection / props.repo.MaxAffection) * 100;

    return (
        <Paper elevation={10} sx = {{pb: 2, width: '80%', ml: 5, mt: 5}}>
            <Box>
                <Progress title="Health" bio="Make commits often to keep their health up" progress={healthPercent}/>
                <Progress title="Affection" bio="Regular visits improve their affection to you " progress={affPercent}/>
            </Box>
        </Paper>
    )
}