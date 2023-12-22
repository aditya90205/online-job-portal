import "./App.css";
import Header from "./Components/Header";
import JobCard from "./Components/JobCard";
import Navbar from "./Components/Navbar";
import SearchBar from "./Components/SearchBar";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { db } from "./firebase.config";
import { useEffect } from "react";
import { useState } from "react";

// Authentication Logic
const auth = getAuth();

// eslint-disable-next-line
export const handleGoogleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Store the user's email and displayName in the "emails" collection
    const emailCollectionRef = collection(db, "emails");
    await addDoc(emailCollectionRef, {
      email: user.email,
      displayName: user.displayName,
    });

    const userDocRef = collection(db, "users").doc(user.uid);
    await addDoc(userDocRef, {
      displayName: user.displayName,
      email: user.email,
    });

    console.log("Successfully signed in with Google:", user);
  } catch (error) {
    console.error("Google sign-in error:", error);
  }
};

function App() {
  const [jobs, setJobs] = useState([]);

  const [customSearch, setCustomSearch] = useState(false);

  const fetchJobs = async () => {
    setCustomSearch(false);
    // Initializing an empty array for storing job from the databse
    const tempJobs = [];

    const jobsRef = query(collection(db, "job"));

    // For Giving a proper order to latest jobs
    const q = query(jobsRef, orderBy("postedOn", "desc"));

    const req = await getDocs(q);

    req.forEach((job) => {
      console.log(job.id, "=>", job.data());
      tempJobs.push({
        ...job.data(),
        id: job.id,
        postedOn: job.data().postedOn.toDate(),
      });
    });

    setJobs(tempJobs);
  };

  // For Filtering the Job
  const fetchJobsCustom = async (jobCriteria) => {
    setCustomSearch(true);
    const tempJobs = [];
    const jobsRef = query(collection(db, "job"));
    const q = query(
      jobsRef,
      where("type", "==", jobCriteria.type),
      where("title", "==", jobCriteria.title),
      where("experience", "==", jobCriteria.experience),
      where("location", "==", jobCriteria.location),
      orderBy("postedOn", "desc")
    );
    const req = await getDocs(q);

    req.forEach((job) => {
      tempJobs.push({
        ...job.data(),
        id: job.id,
        postedOn: job.data().postedOn.toDate(),
      });
    });
    setJobs(tempJobs);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <Navbar />
      <Header />
      <SearchBar fetchJobsCustom={fetchJobsCustom} />
      {customSearch && (
        <button onClick={fetchJobs} className="flex pl-[1250px] mb-2">
          <p className="bg-blue-500 px-10 py-2 rounded-md text-white">
            Clear Filters
          </p>
        </button>
      )}
      {jobs.length > 0 ? (
        jobs.map((job) => <JobCard key={job.id} {...job} />)
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
