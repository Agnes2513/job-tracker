import React, { createContext, useState, useEffect } from "react";
import supabase from "../helper/supabaseClient";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async (userId) => {
    if (!userId) {
      setJobs([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("user_id", userId)
      .order("date_applied", { ascending: false });

    if (error) {
      console.error("Error fetching jobs:", error);
    } else {
      setJobs(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    // ✅ Initial fetch for the current user
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      fetchJobs(user?.id);
    };
    init();

    // ✅ Listen for login/logout/switch-user
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        fetchJobs(session?.user?.id);
      }
    );

    // cleanup listener
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const addJob = (newJob) => {
    setJobs((prev) => [newJob, ...prev]);
  };

  return (
    <JobContext.Provider value={{ jobs, addJob, loading }}>
      {children}
    </JobContext.Provider>
  );
};
