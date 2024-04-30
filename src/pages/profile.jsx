import React, { useEffect, useState } from "react";
import { auth, db } from "../service/firebase/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import UserModel from "../models/userModel";


function ProfilePage() {
    const [userDetails, setUserDetails] = useState(null);
    const fetchUserData = async () => {
        auth.onAuthStateChanged(async (user) => {
            console.log(user);
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserDetails(docSnap.data());
                console.log(docSnap.data());

            } else {
                console.log('user not logged in')
            }
        })
    }
    const handleLogout = async () => {
        try {
            const user = auth.currentUser;

            // Update user data after signing out
            await updateDoc(doc(db, 'users', user.uid), {
                online: false,
                searching: false
            });

            await auth.signOut(); // Sign out the user first
            console.log('signed out');
            toast.success('Signed Out', { position: 'top-center' });
            window.location.href = '/login';
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        fetchUserData();
    }, []);
    return (
        <div>
            {userDetails ? (
                <div>
                    <br />
                    <h3>Welcome {userDetails.name}</h3>
                    <div>
                        <p>
                            <b>Email:</b> {userDetails.email}
                        </p>
                        <p>
                            <b>Name:</b> {userDetails.name}
                        </p>

                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>

            ) : (
                <p>Loading...</p>
            )
            }
        </div>
    )
}
export default ProfilePage;