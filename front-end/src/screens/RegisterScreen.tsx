import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore, getDoc, doc, updateDoc, collection, getDocs, setDoc } from 'firebase/firestore/lite';
import { firebaseConfig } from '../config/firebase';
// import { getAuth } from 'firebase/auth';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";
import Alert from "@mui/material/Alert";

const theme = createTheme();

const loginStyles = {
    h5: {
        fontSize: '1.4rem',
        fontWeight: 200,
        marginTop: 3,
        textAlign: 'center',
        fontStyle: 'italic'
    },
    h2: {
        fontSize: '3rem',
        fontWeight: 400,
        marginTop: 20,
        textAlign: 'center',
        overflowWrap: 'break-word'
    },
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
        borderRadius: 5,
        height: '100%'
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
        fontWeight: 500
    }
}


export const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass]   = useState("");
    const [git, setGit]     = useState("");

    const [userExists, setUserExists] = useState(false);

    const [loading, setLoading] = useState(false);

    const app = initializeApp(firebaseConfig);
    const db: Firestore = getFirestore(app);
    const auth = getAuth();

    const nav = useNavigate();

    // AUTHENTICATION
    const checkExists = async () => {
        const docRef = doc(db, "users/" + email);
        const snapDoc = await getDoc(docRef);
        console.log(snapDoc)
        return snapDoc.exists()
    }

    const createUser = () => {
        createUserWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                const user = userCredential.user;
                const userDoc = doc(db, "users/" + email)
                // assign details on firebase
                setDoc(userDoc, {'username': email, 'github': git}).then(res => {
                    // the user should now be logged in, redirect
                    nav('/home')
                })

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // setError(errorMessage);
            });
    }

    const registerUser = () => {
        setLoading(true);
        checkExists().then(exists => {
            if (exists) {
                // tell them no can do
                setUserExists(true)
                setLoading(false)

            } else {
                // register the user
                createUser()
            }
        })
    }

    // STATE CHANGE FUNCTIONS
    function updateEmail(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void {
        setEmail(e.target.value)
    }

    function updatePass(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void {
        setPass(e.target.value)
    }

    function updateGit(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void {
        setGit(e.target.value)
    }

    return (
        <>
        <header>
            <Typography sx={loginStyles.h2}>TamaGit</Typography>
            <Typography sx={loginStyles.h5}>
                Never forget about your beloved projects again
            </Typography>
        </header>
        <section style={loginStyles.mainSection}>
            <div style={loginStyles.inputSection}>
                <TextField id="email-input" label="TamaGit Email" variant="standard" sx={{width: "100%"}} onChange={(e) => updateEmail(e)} />
                <TextField id="password-input" label="TamaGit Password" variant="standard" sx={{}} type="password" onChange={(e) => updatePass(e)}/>
                <TextField id="password-input" label="Github Username" variant="filled" sx={{marginTop: 3}} onChange={(e) => updateGit(e)}/>
            </div>
            {
                userExists
                ? <Alert severity="error">This username already exists</Alert>
                : null
            }
            <div style={loginStyles.confirmGroup}>
                <Button variant="contained" sx={loginStyles.button} size="large" onClick={registerUser}>
                    {
                        loading
                        ? <CircularProgress color="inherit" size={25}/>
                        : "Sign Up"
                    }
                </Button>
                <span style={loginStyles.newUserText}>
                    Already have an account? <Link to={"/"} style={loginStyles.link}>Login</Link>
                </span>
            </div>
        </section>
        </>
    )
}