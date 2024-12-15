import { OpenLetterInterface } from "@/interfaces/systemInterfaces";
import { CacheSystem } from "@/utils/cacheSystem";

export enum FilterMode {
  ALL = "ALL",
  SENT_BY_USER = "SENT_BY_USER",
  NOT_SENT_BY_USER = "NOT_SENT_BY_USER",
}

export const filterLettersBySender = (
  letters: OpenLetterInterface[],
  filterMode: FilterMode
): OpenLetterInterface[] => {
  const cacheSystem = new CacheSystem();
  const loggedUserId = cacheSystem.loggedUserUID();

  if (!loggedUserId) return letters;

  switch (filterMode) {
    case FilterMode.SENT_BY_USER:
      return letters.filter((letter) => letter.letterSender === loggedUserId);
    case FilterMode.NOT_SENT_BY_USER:
      // Return letters where the logged-in user is NOT the sender
      return letters.filter((letter) => letter.letterSender !== loggedUserId);
    case FilterMode.ALL:
    default:
      return letters;
  }
};
