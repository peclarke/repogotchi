import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RepogotchiType } from '../../state/repo';
import RepoListItem from './RepoListItem';

export type RepoListProps = {
    repos: RepogotchiType[];
}

export default function RepoList(props: RepoListProps) {
    return (
        <>
            {
                props.repos.map((repo: RepogotchiType) => {
                    return (
                        <Link to={"/repo/" + repo.GithubName} style = {{ textDecoration: 'none'}}>
                            <RepoListItem repo={repo}/>
                        </Link>
                    )
                })
            }
            {/* <Link to="/repo/1" style = {{ textDecoration: 'none'}}>
                <RepoListItem />
            </Link>

            <Link to="/repo/2" style = {{ textDecoration: 'none'}}>
                <RepoListItem />
            </Link>

            <Link to="/repo/3" style = {{ textDecoration: 'none'}}>
                <RepoListItem />
            </Link> */}
        </>
    )
}