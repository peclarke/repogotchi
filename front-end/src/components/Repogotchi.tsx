import React, { Fragment } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CommitProgress from './progress/CommitProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { RepogotchiType } from '../state/repo';
import useWindowDimensions from '../hooks/useWindowDimensions';

const theme = createTheme();

theme.typography.h5 = {
    fontSize: '2rem'
}

export type SpriteLayerProps = {
    height: number;
    src: string;
    width: number;
}

export function SpriteLayer(props: SpriteLayerProps) {
    return (<img src={props.src} style={{ position: 'absolute', zIndex: props.height, objectFit: 'scale-down', width: props.width }} />);
}

export type ColourLayerProps = {
    height: number;
    src: string;
    width: number;
    colour: string;
}

export function ColourLayer(props: ColourLayerProps) {
    return (
        <div style={{ width: props.width, height: 500, position: 'absolute', display: 'inline-block', zIndex: props.height, objectFit: 'scale-down', background: props.colour, WebkitMaskImage: "url(" + props.src + ")", maskImage: "url(" + props.src + ")", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskSize: "contain", maskSize: "contain" }} />
    );
}

export type RepogotchiProps = {
    name: string;
    repo: RepogotchiType;
}

export default function Repogotchi(props: RepogotchiProps) {

    const { width, height } = useWindowDimensions();

    const imgWidth = width / 3 - 50;
    const mouthWidth = imgWidth / 4;
    const mouthLeft = imgWidth / 2.65;
    const mouthTop = imgWidth / 2.65;

    const earsSrc = require('../sprite/ear' + props.repo.Ears + '.png');
    const earsMaskSrc = require('../sprite/earmask' + props.repo.Ears + '.png');
    const bodySrc = require('../sprite/body' + props.repo.Body + '.png');
    const bodyMaskSrc = require('../sprite/bodymask' + props.repo.Body + '.png');
    const mouthSrc = require('../sprite/mouths/mouth' + props.repo.Mouth + '.png');
    const eyesSrc = require('../sprite/eye' + props.repo.Eyes + '.png');
    const accessorySrc = require('../sprite/accessory' + props.repo.Accessory + '.png');

    const commitProgress = Math.floor(props.repo.LevelProgress / props.repo.LevelReq) * 100;

    return (
        <ThemeProvider theme={theme}>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" style={{ marginTop: 50 }}>
                <Typography variant="h5">{props.name}</Typography>
                <br></br>
                <Box display="inline" alignItems="center" justifyContent="center" position="relative" style={{ width: "100%", height: 500 }}>
                    <ColourLayer height={1} src={earsMaskSrc} width={imgWidth} colour={props.repo.Colour} />
                    <SpriteLayer height={2} src={earsSrc} width={imgWidth} />
                    <ColourLayer height={3} src={bodyMaskSrc} width={imgWidth} colour={props.repo.Colour} />
                    <SpriteLayer height={4} src={bodySrc} width={imgWidth} />
                    <img alt="mouth" src={mouthSrc} style={{ position: 'absolute', zIndex: 5, objectFit: 'scale-down', width: mouthWidth, transform: "rotateX(180deg)", left: mouthLeft, top: mouthTop }} />
                    <SpriteLayer height={6} src={eyesSrc} width={imgWidth} />
                    <SpriteLayer height={7} src={accessorySrc} width={imgWidth} />
                </Box>
                <CommitProgress progress={commitProgress} repo={props.repo} />
            </Box>
        </ThemeProvider>
    )
}