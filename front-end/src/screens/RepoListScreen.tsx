import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
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
    const [allow, setAllow] = useState(true);

    useEffect(() => {
        getUserRepos();
    }, [])

    useEffect(() => {
        setAllow(repos.length < 4);
    }, [repos])

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
                    LastCommit:     data.LastCommit,
                    Level: data.Level,
                    Birthdate: data.Birthdate,
                    LevelProgress: data.LevelProgress,
                    LevelReq: data.LevelReq,
                    LastVisit: data.LastVisit,
                    Affection: data.Affection,
                    MaxAffection: data.MaxAffection,
                }
            });
            console.log(repoData);
            setRepos(repoData);
        }

        userRepos();
        return [];
    }

    return (
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
                        <Typography variant="h2" sx = {{ ml: 11, mt: 3}}>TamaGit</Typography>
                        <ManageRepos updateRepos={getUserRepos} allowAdds={allow}/>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}