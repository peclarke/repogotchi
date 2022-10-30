import Button from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styles } from "../screens/LandingScreen";

import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore, getDoc, doc, updateDoc, collection, getDocs, setDoc } from 'firebase/firestore/lite';
import { firebaseConfig } from '../config/firebase';
// import { getAuth } from 'firebase/auth';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";

const theme = createTheme();

const loginStyles = {
    inputSection: {
        display: "flex",
        flexDirection: "column" as "column",
        gap: 20,
        width: "100%",
        maxWidth: 350
    },
    mainSection: {
        paddingTop: 100,
        gap: 60,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column" as "column"
    },
    button: {
        color: theme.palette.getContrastText("#9e5482"),
        backgroundColor: "#9e5482",
        "&:hover": {
            backgroundColor: "#8c4170",
            // Reset on touch devices, it doesn't add specificity
            "@media (hover: none)": {
                backgroundColor: "#8c4170"
            }
        },
        "text-transform": "none",
        borderRadius: 5
    },
    newUserText: {
        textAlign: "center" as "center",
        color: "gray"
    },
    confirmGroup: {
        display: "flex",
        flexDirection: "column" as "column",
        gap: 15,
        width: "100%",
        maxWidth: 250,
    },
    link: {
        textDecoration: 'none',
        fontWeight: 600,
        color: "#9e5482"
    }
}

export const Login = () => {
    const [login, setLogin] = useState(true);

    const [email, setEmail] = useState("");
    const [pass, setPass]   = useState("");

    function updateEmail(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void {
        setEmail(e.target.value)
    }

    function updatePass(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void {
        setPass(e.target.value)
    }

    return (
        <>
        <section style={loginStyles.mainSection}>
            <div style={loginStyles.inputSection}>
                <TextField id="email-input" label="TamaGit Email" variant="standard" sx={{width: "100%"}} onChange={(e) => updateEmail(e)} />
                <TextField id="password-input" label="TamaGit Password" variant="standard" sx={{}} type="password" onChange={(e) => updatePass(e)}/>
            </div>
            <div style={loginStyles.confirmGroup}>
                <Button variant="contained" sx={loginStyles.button} size="large" onClick={() => null}>Login</Button>
                {/* <TextField id="username-input" label="Github Username" variant="standard" sx={{}} onChange={(e) => updateUser(e)}/> */}
                <span style={loginStyles.newUserText}>
                    New user? <Link to={"/register"} style={loginStyles.link}>Signup</Link>
                </span>
            </div>
        </section>
        </>
    )
}

export const Register = () => {
    return (
        <section>

        </section>
    )
}
