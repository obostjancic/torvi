import { JsonInput, Switch, Table } from '@mantine/core';
import { Search } from './model/search';
import { formatDate, formatJSON } from './utils/format';
import ReactJson from 'react-json-view';

interface SearchTableProps {
  searches: Search[];
  updateSearch: (id: number, data: Partial<Search>) => void;
  selectSearch: (id: number) => void;
}

export const SearchTable = ({ searches, updateSearch, selectSearch }: SearchTableProps) => {
  return (
    <Table striped highlightOnHover withBorder withColumnBorders>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Created</th>
          <th>Schedule</th>
          <th>Config</th>
          <th>Enabled</th>
        </tr>
      </thead>

      <tbody>
        {searches.map((search) => (
          <tr key={search.id} onClick={() => selectSearch(search.id)}>
            <td>{search.id}</td>
            <td>{search.name}</td>
            <td>{formatDate(search.created)}</td>
            <td>
              <pre>{search.schedule}</pre>
            </td>
            <td>
              <JsonInput value={formatJSON(search.config)} formatOnBlur maxRows={3} autosize />
            </td>
            <td>
              <Switch
                checked={search.enabled}
                onChange={({ target }) => {
                  updateSearch(search.id, { enabled: target.checked });
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
