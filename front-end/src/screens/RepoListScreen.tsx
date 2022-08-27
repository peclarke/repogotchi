import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import React, { useEffect, useState } from 'react';
import ManageRepos from '../components/actions/ManageRepos';
import RepoList from '../components/RepoList/RepoList';
import { firebaseConfig } from '../config/firebase';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { RepogotchiType } from '../state/repo';

export type RepoListScreenProps = {
    
}

export default function RepoListScreen(props: RepoListScreenProps) {
    const { height } = useWindowDimensions();

    const [repos, setRepos] = useState<RepogotchiType[]>([]);

    useEffect(() => {
        getUserRepos();
    }, [])

    const getUserRepos = async () => {
        const app = initializeApp(firebaseConfig);
        const db: Firestore = getFirestore(app);

        const userRepos = async () => {
            const repoCol = collection(db, "users/peclarke/repogotchis");
            const repoDocs = await getDocs(repoCol);
            const repoData: RepogotchiType[] = repoDocs.docs.map((doc) => {
                const data = doc.data();
                 return {
                    GithubName: data.GithubName,
                    PersonalName: data.PersonalName,
                    Age:          data.Age,
                    Languages:    data.Languages,
                    MaxHealth:    data.MaxHealth,
                    CurrentHealth:data.CurrentHealth,
                    CommitProgress: data.CommitProgress,
                    LastCommit:     data.LastCommit
                }
            });
            console.log(repoData);
            setRepos(repoData);
        }

        userRepos();
        return [];
    }

    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Box sx = {{ justifyContent: 'space-evenly', display: 'flex',
                                 flexDirection: 'column', height: height, background: "linear-gradient(#e66465, #9198e5)",
                                 paddingLeft: 4, paddingRight: 4}}>
                        {/* Render this with a proper list element from mui. Only allow 5 repogotchis  */}

                        <RepoList repos={repos}/>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box sx = {{ ml: 5 }} >
                        <ManageRepos updateRepos={getUserRepos}/>
                    </Box>
                </Grid>
            </Grid>
        </Box>
        </>
    )
}