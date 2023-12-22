import { handleGoogleSignIn } from "../../App";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    const auth = getAuth();

    signOut(auth);
  };

  return (
    <>
      <div className="h-20 flex items-center text-white w-full justify-between lg:px-56">
        <h1 className="text-3xl pl-20 font-bold">Joboard.</h1>
        <div className="mx-5">
          {user ? (
            <button className="mx-5" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="mx-5" onClick={handleGoogleSignIn}>
              Login
            </button>
          )}
          <button className="mx-5">Edit</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
