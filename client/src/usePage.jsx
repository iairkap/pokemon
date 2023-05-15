import { useMemo } from "react";

export const usePage = (iterableArray, numberElementsPerPage, currentPage) => {
  console.log("iterableArray:", iterableArray);
  console.log("currentPage:", currentPage);
  const countPage = useMemo(() => {
    if (numberElementsPerPage <= 0 || iterableArray.length === 0) {
      return [];
    }
    return Array.from(
      //array.from crea un array con los elementos que le pasemos
      { length: Math.ceil(iterableArray.length / numberElementsPerPage) },
      (_, i) => i + 1
    );
  }, [numberElementsPerPage, iterableArray]);

  const Start = currentPage * numberElementsPerPage;
  const End = Start + numberElementsPerPage;
  const page = iterableArray.slice(Start, End);

  console.log("page:", page);
  console.log("countPage:", countPage);
  return { page, countPage };
};
