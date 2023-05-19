export const getWordMeaning = async (word: string) => {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    if (!response.ok) throw new Error("Couldn't find word");
    return response.json();
  } catch (err) {
    throw new Error("Couldn't find word");
  }
};
