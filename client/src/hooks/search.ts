import { useState, useEffect } from 'react';
import { Search, SearchApi } from '../model/search';

const api = new SearchApi();

export const useSearches = () => {
  const [searches, setSearches] = useState<Search[]>([]);
  const [selectedSearchId, setSelectedSearchId] = useState<number | null>(null);

  const loadSearches = async () => {
    if (!searches.length) {
      setSearches(await api.getSearches());
    }
  };

  const updateSearch = async (id: number, search: Partial<Search>) => {
    const updatedSearch = await api.updateSearch(id, search);
    setSearches(searches.map((search) => (search.id === id ? updatedSearch : search)));
  };

  const selectSearch = (id: number | null) => {
    setSelectedSearchId(id);
  };

  const getSearch = (id: number | null) => {
    return searches.find((search) => search.id === id);
  };

  const deleteSearch = async (id: number) => {
    await api.deleteSearch(id);
    setSearches(searches.filter((search) => search.id !== id));
  };

  useEffect(() => {
    loadSearches();
  }, []);

  return { searches, selectedSearchId, getSearch, selectSearch, updateSearch, deleteSearch };
};
