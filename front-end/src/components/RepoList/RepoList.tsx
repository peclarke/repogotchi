import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RepogotchiType } from '../../state/repo';
import RepoListItem from './RepoListItem';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import InfoIcon from '@mui/icons-material/Info';

export type RepoListProps = {
    repos: RepogotchiType[];
}

const baseIconTheme = {
    width: 35,
    height: 'auto',
    transitionDuration: '200ms',
    position: 'absolute' as 'absolute',
    left: '96%',
    cursor: 'pointer',
    marginTop: 2.5
}

export default function RepoList(props: RepoListProps) {
    const canAdd = props.repos.length < 5;

    const [removeHover, setRemoveHover] = useState(false)
    const [infoHover, setInfoHover]     = useState(false)

    const [loading, setLoading] = useState(true)

    const removeIconTheme = {
        ...baseIconTheme,
        top: -5,
        color: removeHover ? 'red' : 'red',
    }

    const infoIconTheme = {
        ...baseIconTheme,
        top: 40,
        color: infoHover ? 'gray' : 'gray'
    }

    const repoTheme = {
        paddingTop: '5%',
        position: 'relative' as 'relative'
    }

    // const RepogotchiGroup = () => {
    //     const group = props.repos.map((repo: RepogotchiType, index) => {
    //         return index == props.repos.length - 1 && canAdd
    //         ? <div>
    //             <div style={{position: 'relative'}}>
    //                 <RepoListItem repo={repo}/>
    //                 <RemoveCircleIcon sx={removeIconTheme} onMouseEnter={() => setRemoveHover(true)} onMouseLeave={() => setRemoveHover(false)}/>
    //                 <InfoIcon sx={infoIconTheme} onMouseEnter={() => setInfoHover(true)} onMouseLeave={() => setInfoHover(false)} />
    //             </div>
    //             <AddRepoShape />
    //           </div>
    //         : <RepoListItem repo={repo}/>
    //     })
    //     setLoading(false)
    //     return group
    // }

    return (
        <>
            {
                
                props.repos.map((repo: RepogotchiType, index) => {
                    return index == props.repos.length - 1 && canAdd
                    ? <div style={repoTheme}>
                        <div> 
                            <RepoListItem repo={repo}/>
                            {/* <RemoveCircleIcon sx={removeIconTheme} onMouseEnter={() => setRemoveHover(true)} onMouseLeave={() => setRemoveHover(false)}/>
                            <InfoIcon sx={infoIconTheme} onMouseEnter={() => setInfoHover(true)} onMouseLeave={() => setInfoHover(false)} /> */}
                        </div>
                        <AddRepoShape />
                      </div>
                    : <div style={repoTheme}>
                        <RepoListItem repo={repo}/>
                        {/* <RemoveCircleIcon sx={removeIconTheme} onMouseEnter={() => setRemoveHover(true)} onMouseLeave={() => setRemoveHover(false)}/>
                        <InfoIcon sx={infoIconTheme} onMouseEnter={() => setInfoHover(true)} onMouseLeave={() => setInfoHover(false)} /> */}
                      </div>
                })
            }
        </>
    )
}

const AddRepoShape = () => {
    const [hovering, setHovering] = useState(false)

    const addRepoTheme = {
        border: '2px solid black',
        opacity: hovering ? 0.5 : 0.2,
        height: 100,
        transitionDuration: '150ms',
        borderRadius: 30,
        cursor: 'pointer',
        marginTop: 30,
        width: '100%'
    }

    const iconStyle = {
        height: '100%',
        width: '100%',
        opacity: 1
    }

    return (
        <div style={addRepoTheme} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} onClick={undefined}>
            <AddIcon style={iconStyle}/>
        </div>
    )
}