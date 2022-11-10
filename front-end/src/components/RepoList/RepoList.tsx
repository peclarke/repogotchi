import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RepogotchiType } from '../../state/repo';
import RepoListItem from './RepoListItem';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import InfoIcon from '@mui/icons-material/Info';
import ActionRepoDialog from '../../dialogs/ActionRepoDialog';
import generate, { SpriteGeneration } from '../../generation/generate';
import { getFirestore, setDoc, Firestore, doc, serverTimestamp } from 'firebase/firestore/lite';
import { firebaseConfig } from '../../config/firebase';
import { initializeApp } from 'firebase/app';
import { names } from '../../utils/consts';

export type RepoListProps = {
    repos:       RepogotchiType[];
    updateRepos: () => Promise<never[]>;
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
                        <AddRepoShape updateRepos={props.updateRepos}/>
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

export type AddRepoShapeProps = {
    updateRepos: () => Promise<never[]>;
}

const AddRepoShape = (props: AddRepoShapeProps) => {
    const [hovering, setHovering] = useState(false)
    const [open, setOpen] = useState(false)

    const add_repo = (githubUrl: string) => {
        const app = initializeApp(firebaseConfig);
        const db: Firestore = getFirestore(app);

        const delimited = githubUrl.split("/").reverse();
        const repoName = delimited[0];
        const username = delimited[1];

        const baseUrl = "https://api.github.com/repos/" + username + "/" + repoName

        fetch(baseUrl)
            .then(res => res.json())
            .then((json) => {
                fetch(baseUrl + "/languages")
                    .then(res => res.json())
                    .then((jsonLang) => {
                        const sprite: SpriteGeneration = generate();
                        const repo: RepogotchiType = {
                            GithubName: json['name'],
                            PersonalName: names[Math.floor(Math.random() * names.length)],
                            Age: 0,
                            Languages: Object.keys(jsonLang),
                            MaxHealth: 20,
                            CurrentHealth: 20,
                            CommitProgress: 100,
                            LastCommit: "",
                            Level: 1,
                            Birthdate: new Date(json['created_at']).toDateString(),
                            LevelProgress: 0,
                            LevelReq: 20,
                            LastVisit: serverTimestamp(),
                            Affection: 10,
                            MaxAffection: 10,
                            Owner: json['owner']['login'],
                            Body: sprite.body,
                            Eyes: sprite.eyes,
                            Mouth: sprite.mouth,
                            Accessory: sprite.accessory,
                            Ears: sprite.ears,
                            Colour: sprite.colour,
                        }

                        const userStuff = async () => {
                            // const repoCol = collection(db, "users/peclarke/repogotchis");
                            const repoDoc = doc(db, "users/" + localStorage.getItem("email") + "/repogotchis", json['name'])
                            // const docRef = await addDoc(repoCol, repo);
                            const docRef = await setDoc(repoDoc, repo)
                            props.updateRepos();
                        }

                        userStuff();
                    }, (err) => {
                        console.log(err)
                    })
            }, (err) => {
                console.log(err)
            })
    }

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
        <>
            <ActionRepoDialog open={open} onClose={() => setOpen(false)} action={(url: string) => add_repo(url)} type={'add'} />
            <div style={addRepoTheme} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} onClick={() => setOpen(true)}>
                <AddIcon style={iconStyle}/>
            </div>
        </>
    )
}