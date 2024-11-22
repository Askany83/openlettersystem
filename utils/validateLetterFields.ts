export const validateField = (name: string, value: string): string => {
  const ptRegex = /^[a-zA-ZÀ-ÿ0-9\s.,!?()-]*$/;

  if (name === "title") {
    if (!ptRegex.test(value)) {
      return "O título deve conter apenas caracteres portugueses";
    }
    if (value.length < 3) {
      return "O título deve ter no mínimo 3 caracteres";
    }
    if (value.length > 50) {
      return "O título deve ter no máximo 50 caracteres";
    }
  }

  if (name === "message") {
    if (!ptRegex.test(value)) {
      return "A mensagem deve conter apenas caracteres portugueses";
    }
    if (value.length < 200) {
      return "A mensagem deve ter no mínimo 200 caracteres";
    }
    if (value.length > 2000) {
      return "A mensagem deve ter no máximo 2000 caracteres";
    }
  }

  return "";
};
