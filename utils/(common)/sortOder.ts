import { OpenLetterInterface } from "@/interfaces/systemInterfaces";

export enum SortOrder {
  ASCENDING = "ASCENDING",
  DESCENDING = "DESCENDING",
}

export const sortLetters = (
  letters: OpenLetterInterface[],
  sortBy: string,
  order: SortOrder
): OpenLetterInterface[] => {
  return letters.sort((a, b) => {
    const compareA =
      sortBy === "title" ? a.title : new Date(a.createdAt).getTime();
    const compareB =
      sortBy === "title" ? b.title : new Date(b.createdAt).getTime();

    if (order === SortOrder.ASCENDING) {
      return compareA < compareB ? -1 : compareA > compareB ? 1 : 0;
    } else {
      return compareA > compareB ? -1 : compareA < compareB ? 1 : 0;
    }
  });
};
