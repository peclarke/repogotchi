import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RepogotchiType } from '../../state/repo';
import RepoListItem from './RepoListItem';

export type RepoListProps = {
    repos: RepogotchiType[];
}

export default function RepoList(props: RepoListProps) {
    // const exampleRepo: RepogotchiType = {
    //     GithubName: "FirebaseAnalyticsProject",
    //     PersonalName: "Desmond The Moon Bear",
    //     Age: "",
    //     Languages: [""],
    //     MaxHealth: 100,
    //     CurrentHealth: 90,
    //     CommitProgress: 100,
    //     LastCommit: "",
    //     Level: 0,
    //     Birthdate: "",
    //     LevelProgress: 0,
    //     LevelReq: 0,
    //     LastVisit: "",
    //     Affection: 10,
    //     MaxAffection: 20,
    //     Body: 0,
    //     Eyes: 0,
    //     Mouth: 0,
    //     Accessory: 0,
    //     Ears: 0,
    //     Colour: "white",
    // }
    return (
        <>
            {
                props.repos.map((repo: RepogotchiType, index) => {
                    return (
                        <Link to={"/repo/" + repo.GithubName} style = {{ textDecoration: 'none'}} key={index}>
                            <RepoListItem repo={repo}/>
                        </Link>
                    )
                })
            }
            {/* <RepoListItem repo={exampleRepo}/>
            <RepoListItem repo={exampleRepo}/>
            <RepoListItem repo={exampleRepo}/>
            <RepoListItem repo={exampleRepo}/>
            <RepoListItem repo={exampleRepo}/> */}
        </>
    )
}