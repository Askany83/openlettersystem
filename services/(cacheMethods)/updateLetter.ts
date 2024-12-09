export function updateLetterInSessionStorage(
  letterId: string,
  formData: { title: string; message: string }
) {
  // Retrieve letters from "myLetters" and "openLettersOfReceiver"
  const existingLetters = JSON.parse(
    sessionStorage.getItem("myLetters") || "[]"
  );
  const openLettersOfReceiver = JSON.parse(
    sessionStorage.getItem("openLettersOfReceiver") || "[]"
  );

  // Update the letter in "myLetters"
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

  // Update the letter in "openLettersOfReceiver"
  const updatedOpenLettersOfReceiver = openLettersOfReceiver.map(
    (receiverData: { data: { _id: string }[] }) => {
      const updatedData = receiverData.data.map((letter: { _id: string }) => {
        if (letter._id === letterId) {
          return {
            ...letter,
            title: formData.title,
            message: `data:application/gzip;base64,${formData.message}`,
          };
        }
        return letter;
      });
      return { ...receiverData, data: updatedData };
    }
  );

  // Save the updated letters back to sessionStorage
  sessionStorage.setItem("myLetters", JSON.stringify(updatedLetters));
  sessionStorage.setItem(
    "openLettersOfReceiver",
    JSON.stringify(updatedOpenLettersOfReceiver)
  );
}
