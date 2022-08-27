import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import useWindowDimensions from '../hooks/useWindowDimensions';

import wiz2 from '../assets/wiz_2.png';
import wiz3 from '../assets/wiz_3.png';
import wiz4 from '../assets/wiz_4.png';
import wiz6 from '../assets/wiz_6.png';
import wiz7 from '../assets/wiz_7.png';


const theme = createTheme();

theme.typography.h5 = {
    fontSize: '1.5rem',
    fontWeight: 500
}

theme.typography.h6 = {
    fontSize: '1rem',
    fontWeight: 50,
    marginTop: -4
}

export type WizardDialogProps = {
    onClose: () => void;
    open: boolean;
}

export default function WizardDialog(props: WizardDialogProps) {
    const [page, setPage] = useState(0);
    const {width} = useWindowDimensions();

    useEffect(() => {
        if (props.open) {
            setPage(0);
        }
    }, [props.open]);

    return (
        <ThemeProvider theme={theme}>
            <Box style = {{ width: width}}>
                <Dialog onClose={props.onClose} open={props.open} sx = {{minWidth: "lg", display: 'flex', alignItems: 'center', justifyContent: 'center', mt: -5}}>
                    <DialogTitle sx = {{ pt: 5, pl: 5}}>
                        <Typography variant="h5">{page === 0 ? "GitHub Repository Wizard" : "GH Wiz: Step " + page + " / 8"}</Typography>
                    </DialogTitle>
                    <DialogContent sx = {{ p: 5 }}>
                        <Typography variant="h6">
                            <Box display="flex" flexDirection="column">
                                {
                                    staticInfo[page].txt
                                }
                                {
                                    ("img" in staticInfo[page])
                                    ? staticInfo[page].img
                                    : null
                                }
                            </Box>
                        </Typography>
                        {/* <Box sx = {{ mt: 2, display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: 110 }}>
                            <TextField onChange={updateText} id="repo-dialog-input" label="Repository Nickname" variant="outlined" sx = {{ width: "100%"}} />
                            <Button variant="contained" onClick={buttonClicked} sx = {{ width: "45%"}}>Confirm</Button>
                        </Box> */}
                        {
                            page !== 8
                            ? <Button variant="contained" onClick={() => setPage(page + 1)} sx={{ mt: 4 }}>Next Step</Button>
                            : <Button variant="contained" onClick={props.onClose} sx={{ mt: 4 }}>Finish</Button>
                        }
                    </DialogContent>
                </Dialog>
            </Box>
        </ThemeProvider>
    )
}

const staticInfo = [
    {
        'txt': 'Finish up configuring your repository with our application with these following steps'
    },
    {
        'txt': '1. Navigate to your target repository on GitHub'
    },
    {
        'txt': '2. Click the "Settings" tab',
        'img': <img src = {wiz2} alt="2nd step" style = {{ width: '140%', marginLeft: -190, marginTop: 20}} />
    },
    {
        'txt': '3. Click on "Webhooks"',
        'img': <img src = {wiz3} alt="3rd step" style = {{ height: 500}}/>
    },
    {
        'txt': '4. Click "Add Webhook"',
        'img': <img src = {wiz4} alt="4th step"/>
    },
    {
        'txt': '5. In "Payload URL", copy and paste this URL: https://australia-southeast1-repogotchi.cloudfunctions.net/feedRepogotchi'
    },
    {
        'txt': '6. For "Content Type", select "application/json"',
        'img': <img src = {wiz6} alt="6th step"/>
    },
    {
        'txt': '7. Your page should look like the following prior to continuing',
        'img': <img src = {wiz7} alt="7th step"/>
    },
    {
        'txt': 'Click the "Add Webhook" button to finish'
    }


]

// const staticInfo = [
//     'Finish up configuring your repository with our application with these following steps',
//     '1. Navigate to your target repository on'
// ]