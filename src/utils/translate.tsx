import axios from "axios";

const API_KEY = process.env.REACT_APP_LINGVANEX_API_KEY;

export const translateText = async (text: string, targetLanguage: string) => {
  const url = `https://api-b2b.backenster.com/b1/api/v3/translate`;

  try {
    const response = await axios.post(
      url,
      {
        translateMode: "html",
        platform: "api",
        from: "ka",
        to: "ru",
        data: text,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.result;
  } catch (error) {
    console.error("Error translating text:", error);
    return text;
  }
};
