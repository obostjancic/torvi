import React from 'react';
import { Drawer, TextInput, Button, Group, Box, JsonInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Search } from './model/search';
import { formatJSON } from './utils/format';

interface SearchDetailsProps {
  selectedSearch?: Search;
  selectSearch: (id: number | null) => void;
  updateSearch: (id: number, data: Partial<Search>) => void;
  deleteSearch: (id: number) => void;
}

export const SearchDetails = ({ selectedSearch, selectSearch, updateSearch, deleteSearch }: SearchDetailsProps) => {
  return (
    <Drawer
      position="right"
      opened={!!selectedSearch}
      onClose={() => selectSearch(null)}
      title="Search details"
      padding="lg"
      size="xl"
    >
      {selectedSearch && (
        <SearchForm
          search={selectedSearch}
          onSubmit={async (data) => {
            await updateSearch(selectedSearch.id, data);
            selectSearch(null);
          }}
          onDelete={async () => {
            await deleteSearch(selectedSearch.id);
            selectSearch(null);
          }}
        />
      )}
    </Drawer>
  );
};

interface SearchFormProps {
  search: Search;
  onSubmit: (data: Partial<Search>) => void;
  onDelete: (id: number) => void;
}

const SearchForm = ({ search, onSubmit, onDelete }: SearchFormProps) => {
  const form = useForm({
    initialValues: {
      name: search.name,
      schedule: search.schedule,
      config: search.config,
    },

    validate: {
      name: (value) => (value.length > 3 ? null : 'Name must be longer than 3 characters'),
      schedule: (value) =>
        /(((\d+,)+\d+|(\d+(\/|-)\d+)|\d+|\*) ?){5,7}/.test(value) ? null : 'Schedule must be a valid cron expression',
      config: (value) => {
        try {
          JSON.parse(JSON.stringify(value));
          return null;
        } catch (e) {
          return 'Config must be a valid JSON';
        }
      },
    },
  });

  return (
    <Box>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput withAsterisk label="Name" placeholder="Search name" {...form.getInputProps('name')} />
        <TextInput withAsterisk label="Schedule" {...form.getInputProps('schedule')} />
        <JsonInput withAsterisk label="Config" value={formatJSON(search.config)} maxRows={20} autosize />

        <Group position="right" mt="md">
          <Button
            color="red"
            type="button"
            onClick={() => {
              if (confirm('Are you sure you want to delete this search?')) onDelete(search.id);
            }}
          >
            Delete
          </Button>
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
};
