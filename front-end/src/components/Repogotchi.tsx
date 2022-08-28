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
    opacity: number;
}

export function SpriteLayer(props: SpriteLayerProps) {
    return (<img src={props.src} style={{ position: 'absolute', zIndex: props.height, objectFit: 'scale-down', width: props.width, opacity: props.opacity }} />);
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

export type RepogotchiDisplayProps = {
    repo: RepogotchiType;
    imgWidth: number;
    containerHeight: number;
}

export function RepogotchiDisplay(props: RepogotchiDisplayProps) {
    const healthPercent = Math.floor(props.repo.CurrentHealth / props.repo.MaxHealth * 100);
    const mouthTransform = () => {
        console.log(props.repo.CurrentHealth);
        console.log(props.repo.MaxHealth);
        console.log(healthPercent);
        if (healthPercent < 50) {
            return "rotateX(180deg)"
        } else {
            return "none"
        }
    }

    const mouthWidth = props.imgWidth / 4;
    const mouthLeft = props.imgWidth / 2.65;
    const mouthTop = props.imgWidth / 2.65;

    const earsSrc = require('../sprite/ear' + props.repo.Ears + '.png');
    const earsMaskSrc = require('../sprite/earmask' + props.repo.Ears + '.png');
    const bodySrc = require('../sprite/body' + props.repo.Body + '.png');
    const bodyMaskSrc = require('../sprite/bodymask' + props.repo.Body + '.png');
    const mouthSrc = require('../sprite/mouths/mouth' + props.repo.Mouth + '.png');
    const eyesSrc = require('../sprite/eye' + props.repo.Eyes + '.png');
    const accessorySrc = require('../sprite/accessory' + props.repo.Accessory + '.png');
    const crownSrc = require('../sprite/crown.png');

    const crownOpacity = () => {
        if (props.repo.Level >= 3) {
            return 100;
        } else {
            return 0;
        }
    };

    return (<Box display="inline" alignItems="center" justifyContent="center" position="relative" style={{ width: "100%", height: props.containerHeight }}>
        <ColourLayer height={1} src={earsMaskSrc} width={props.imgWidth} colour={props.repo.Colour} />
        <SpriteLayer height={2} src={earsSrc} width={props.imgWidth} opacity={100} />
        <ColourLayer height={3} src={bodyMaskSrc} width={props.imgWidth} colour={props.repo.Colour} />
        <SpriteLayer height={4} src={bodySrc} width={props.imgWidth} opacity={100} />
        <img alt="mouth" src={mouthSrc} style={{ position: 'absolute', zIndex: 5, objectFit: 'scale-down', width: mouthWidth, transform: mouthTransform(), left: mouthLeft, top: mouthTop }} />
        <SpriteLayer height={6} src={eyesSrc} width={props.imgWidth} opacity={100} />
        <SpriteLayer height={7} src={accessorySrc} width={props.imgWidth} opacity={100} />
        <SpriteLayer height={8} src={crownSrc} width={props.imgWidth} opacity={crownOpacity()} />
    </Box>);
}

export type RepogotchiProps = {
    name: string;
    repo: RepogotchiType;
}

export default function Repogotchi(props: RepogotchiProps) {

    const { width, height } = useWindowDimensions();

    const imgWidth = width / 3 - 50;

    const commitProgress = Math.floor(props.repo.LevelProgress / props.repo.LevelReq) * 100;

    return (
        <ThemeProvider theme={theme}>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" style={{ marginTop: 50 }}>
                <Typography variant="h5">{props.name}</Typography>
                <br></br>
                <RepogotchiDisplay repo={props.repo} imgWidth={imgWidth} containerHeight={500} />
                <CommitProgress progress={commitProgress} repo={props.repo} />
            </Box>
        </ThemeProvider>
    )
}