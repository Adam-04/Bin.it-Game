import { useEffect } from "react";
import { postBook, getBooks } from "../src/api/gameApi";



export default function Index() {
  useEffect(() => {
    const test = async () => {
      try {
        // const status = await healthCheck();
        // console.log("Backend status:", status);
        const postResponse = await postBook();
        console.log("Post book response:", postResponse);
        const getResponse = await getBooks();
        console.log("Get books response:", getResponse);
      } catch (err) {
        console.error("API error:", err);
      }
    };

    test();
  }, []);

  return null;
}

