import { createContext, useState, useEffect } from "react";
import LinearIndeterminate from "../components/LinearIndeterminate";

import { auth, db } from "../firebase";
import { query , collection , where , getDocs } from "firebase/firestore";
const AuthContext = createContext({
	currentUser: null,
	isAdmin: false,
});

const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [isAdmin, setIsAdmin] = useState(false);
	const [pending, setPending] = useState(true);
	
	useEffect(() => {
		auth.onAuthStateChanged(async (user) => {
			setCurrentUser(user);
			if (user) {
				const q = query(collection(db, "users"), where("uid", "==", user.uid));
				const querySnapshot = await getDocs(q);
				let foundAdmin = false;
				querySnapshot.forEach((doc) => {
					if (doc.data().isAdmin) {
						foundAdmin = true;
					}
				});
				if (foundAdmin) {
					setIsAdmin(true);
				}
			} else {
				setIsAdmin(false);
			}
      setPending(false);
		});
	}, []);

	if (pending) {
		return <LinearIndeterminate />;
	}

	return (
		<AuthContext.Provider value={{ currentUser, isAdmin }}>
			{children}
		</AuthContext.Provider>
	);
};

export {AuthContext , AuthContextProvider};
