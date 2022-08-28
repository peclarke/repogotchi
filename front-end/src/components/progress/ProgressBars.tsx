import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Progress from './Progress';
import { RepogotchiType } from '../../state/repo';
import Paper from '@mui/material/Paper';

export type ProgressBarsProps = {
    repo: RepogotchiType;
}

export default function ProgressBars(props: ProgressBarsProps) {
    const [health, setHealth] = useState(0);
    const [affection, setAffection] = useState(0);

    // console.log(props.repo.CurrentHealth);
    // console.log(healthPercent);

    useEffect(() => update(), [props.repo])
    console.log(health, affection)

    const update = () => {
        const healthPercent = Math.floor(props.repo.CurrentHealth / props.repo.MaxHealth * 100);
        const affPercent = Math.floor(props.repo.Affection / props.repo.MaxAffection * 100);
        setHealth(healthPercent);
        setAffection(affPercent);
    }

    return (
        <Paper elevation={10} sx = {{pb: 2, width: '80%', ml: 5, mt: 5}}>
            <Box>
                <Progress title="Health" bio="Make commits often to keep their health up" progress={health}/>
                <Progress title="Affection" bio="Regular visits improve their affection to you " progress={affection}/>
            </Box>
        </Paper>
    )
}