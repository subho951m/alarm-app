import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useReset = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const reset = async (username, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      "https://vercel-mern-alarm-app-backend.onrender.com/api/user/reset",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      // update loading state
      setIsLoading(false);
    }
  };

  return { reset, isLoading, error };
};
