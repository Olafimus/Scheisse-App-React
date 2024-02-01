import { useState, useMemo, ChangeEvent, useEffect } from "react";

interface UseSearchResult<T> {
  searchTerm: string;
  handleSearch: (term: string) => void;
  filteredItems: T[];
}

const useSearch = <T, K extends keyof T>(
  items: T[],
  searchKey: K
): UseSearchResult<T> => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  // const [filteredItems, setFilteredItems] = useState(items);

  const filteredItems = useMemo(() => {
    if (!searchTerm) {
      return items;
    }
    const normalizedSearchTerm = searchTerm.toLowerCase();
    const data = items.filter((item) =>
      String(item[searchKey]).toLowerCase().includes(normalizedSearchTerm)
    );
    return data;
  }, [items, searchKey, searchTerm]);

  // useEffect(() => {
  //   const normalizedSearchTerm = searchTerm.toLowerCase();
  //   const data = items.filter((item) =>
  //     String(item[searchKey]).toLowerCase().includes(normalizedSearchTerm)
  //   );
  //   setFilteredItems(data);
  // }, [items, searchKey, searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return { searchTerm, handleSearch, filteredItems };
};

export default useSearch;
