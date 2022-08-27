import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RepogotchiType } from '../../state/repo';
import RepoListItem from './RepoListItem';

import { firebaseConfig } from '../../config/firebase';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, getDoc, addDoc, Firestore, doc, getDocs } from 'firebase/firestore/lite';

export type RepoListProps = {

}

export default function RepoList(props: RepoListProps) {
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        const stuff = async () => {
            const res = await getUserRepos();
            setRepos(res);
        }
        stuff();
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
                    HealthPercent:  data.HealthPercent,
                    WellbePercent:  data.WellbePercent,
                    CommitProgress: data.CommitProgress,
                    LastCommit:     data.LastCommit
                }
            }
            );

            // setRepos(repoData);
        }

        userRepos();
        return [];
    }

    return (
        <>
            {
                repos.map((repo: RepogotchiType) => {
                    return (
                        <Link to="/repo/1" style = {{ textDecoration: 'none'}}>
                            <RepoListItem />
                        </Link>
                    )
                })
            }
            <Link to="/repo/1" style = {{ textDecoration: 'none'}}>
                <RepoListItem />
            </Link>

            <Link to="/repo/2" style = {{ textDecoration: 'none'}}>
                <RepoListItem />
            </Link>

            <Link to="/repo/3" style = {{ textDecoration: 'none'}}>
                <RepoListItem />
            </Link>
        </>
    )
}