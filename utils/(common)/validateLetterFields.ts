export const validateField = (name: string, value: string): string => {
  // Trim leading and trailing whitespaces
  const trimmedValue = value.trim();
  // console.log(`Validating field: ${name} with value: ${trimmedValue}`);

  const ptRegex = /^[a-zA-ZÀ-ÿ0-9\s.,!?()-]*$/;

  if (name === "title") {
    if (!ptRegex.test(trimmedValue)) {
      return "O título deve conter apenas caracteres portugueses";
    }
    if (trimmedValue.length < 3) {
      return "O título deve ter no mínimo 3 caracteres";
    }
    if (trimmedValue.length > 50) {
      return "O título deve ter no máximo 50 caracteres";
    }
  }

  if (name === "content") {
    if (!ptRegex.test(trimmedValue)) {
      return "A mensagem deve conter apenas caracteres portugueses";
    }
    if (trimmedValue.length < 200) {
      return "A mensagem deve ter no mínimo 200 caracteres";
    }
    if (trimmedValue.length > 2000) {
      return "A mensagem deve ter no máximo 2000 caracteres";
    }
  }

  return "";
};
