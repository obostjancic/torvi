import './App.css';

import { Stack } from '@mantine/core';

import { useSearches } from './hooks/search';
import { ThemeProvider } from './ThemeProvider';
import { SearchTable } from './SearchTable';
import { SearchDetails } from './SearchDetails';

function App() {
  const { searches, selectedSearchId, updateSearch, selectSearch, getSearch, deleteSearch } = useSearches();

  return (
    <ThemeProvider>
      <Stack align="center" mt={50}>
        <SearchTable searches={searches} updateSearch={updateSearch} selectSearch={selectSearch} />
        <SearchDetails
          selectedSearch={getSearch(selectedSearchId)}
          selectSearch={selectSearch}
          updateSearch={updateSearch}
          deleteSearch={deleteSearch}
        />
      </Stack>
    </ThemeProvider>
  );
}

export default App;
