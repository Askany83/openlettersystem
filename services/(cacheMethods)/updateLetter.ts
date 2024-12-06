export function updateLetterInSessionStorage(
  letterId: string,
  formData: { title: string; message: string }
) {
  const existingLetters = JSON.parse(
    sessionStorage.getItem("myLetters") || "[]"
  );

  const updatedLetters = existingLetters.map((letter: { _id: string }) => {
    if (letter._id === letterId) {
      return {
        ...letter,
        title: formData.title,
        message: `data:application/gzip;base64,${formData.message}`,
      };
    }
    return letter;
  });

  sessionStorage.setItem("myLetters", JSON.stringify(updatedLetters));
}
