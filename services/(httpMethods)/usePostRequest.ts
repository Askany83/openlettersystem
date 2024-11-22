import { useState } from "react";

interface PostResponse {
  message: string;
  success: boolean;
}

// Custom hook to make a POST request
const usePostRequest = <T>(url: string, data: T) => {
  const [response, setResponse] = useState<PostResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const postRequest = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Request failed with status " + res.status);
      }

      const result: PostResponse = await res.json();
      setResponse(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, postRequest };
};

export default usePostRequest;
