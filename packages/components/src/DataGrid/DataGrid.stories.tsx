import { EyeFillMd, SendOutlineMd } from '@self-kit/icons';
import { Story } from '@storybook/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { Stack } from '@mui/material';

import { ActionCell, Actions } from '../ActionCell';
import { DataGridPagination } from '../DataGridPagination';
import { ExampleTemplate } from '../docs';
import { Button } from '../Button';
import { Grid } from '../Grid';

import { DataGrid } from './DataGrid';
import { DataGridColumns, DataGridSort } from './types';

export default {
  title: 'Components/DataGrid',
  component: DataGrid,
};

type DataType = {
  id: string;
  documentName: string;
  direction: string;
  createDate: string;
};

type SortField = 'documentName' | 'direction' | 'createDate';

const ACTIONS: Actions<DataType> = {
  main: [
    {
      icon: <EyeFillMd />,
      name: 'Просмотреть',
      onClick: () => console.log('main'),
    },
    {
      icon: <SendOutlineMd />,
      nested: true,
      name: 'Отправить',
      actions: [
        { name: 'Туда', onClick: () => console.log('nested 1') },
        { name: 'Сюда', onClick: () => console.log('nested 2') },
      ],
    },
  ],
  secondary: [
    { name: 'Редактировать', onClick: () => console.log('secondary 1') },
    { name: 'Удалить', onClick: () => console.log('secondary 2') },
  ],
};

const columns: DataGridColumns<DataType>[] = [
  {
    field: 'documentName',
    label: 'Наименование документа',
    sortable: true,
  },
  {
    field: 'direction',
    label: 'Направление',
    sortable: true,
  },
  {
    field: 'createDate',
    label: 'Дата создания',
    sortable: true,
    format: ({ createDate }) => new Date(createDate).toLocaleDateString(),
  },
  {
    label: 'Действия',
    sortable: false,
    align: 'center',
    width: '1%',
    renderCell: (row) => <ActionCell actions={ACTIONS} row={row} />,
  },
];

const data: DataType[] = [
  {
    id: '1',
    documentName: 'Документ 1',
    direction: 'ФНС',
    createDate: '2022-03-24T17:50:40.206Z',
  },
  {
    id: '2',
    documentName: 'Документ 2',
    direction: 'ФСС',
    createDate: '2022-03-24T17:50:40.206Z',
  },
  {
    id: '3',
    documentName: 'Документ 3',
    direction: 'ПФР',
    createDate: '2022-03-24T17:50:40.206Z',
  },
  {
    id: '4',
    documentName: 'Документ 4',
    direction: 'РПН',
    createDate: '2022-03-24T17:50:40.206Z',
  },
  {
    id: '5',
    documentName: 'Документ 5',
    direction: 'ФНС',
    createDate: '2022-03-24T17:50:40.206Z',
  },
  {
    id: '6',
    documentName: 'Документ 6',
    direction: 'РПН',
    createDate: '2022-03-24T17:50:40.206Z',
  },
  {
    id: '7',
    documentName: 'Документ 7',
    direction: 'ПФР',
    createDate: '2022-03-24T17:50:40.206Z',
  },
  {
    id: '8',
    documentName: 'Документ 8',
    direction: 'ФНС',
    createDate: '2022-03-24T17:50:40.206Z',
  },
  {
    id: '9',
    documentName: 'Документ 9',
    direction: 'ФНС',
    createDate: '2022-03-24T17:50:40.206Z',
  },
  {
    id: '10',
    documentName: 'Документ 10',
    direction: 'ФСС',
    createDate: '2022-03-24T17:50:40.206Z',
  },
  {
    id: '11',
    documentName: 'Документ 11',
    direction: 'ФНС',
    createDate: '2022-03-24T17:50:40.206Z',
  },
  {
    id: '12',
    documentName: 'Документ 12',
    direction: 'РПН',
    createDate: '2022-03-24T17:50:40.206Z',
  },
  {
    id: '13',
    documentName: 'Документ 13',
    direction: 'ФНС',
    createDate: '2022-03-24T17:50:40.206Z',
  },
  {
    id: '15',
    documentName: 'Документ 14',
    direction: 'ФСС',
    createDate: '2022-03-24T17:50:40.206Z',
  },
  {
    id: '14',
    documentName: 'Документ 15',
    direction: 'ФНС',
    createDate: '2022-03-24T17:50:40.206Z',
  },
  {
    id: '16',
    documentName: 'Документ 12',
    direction: 'РПН',
    createDate: '2022-03-24T17:50:40.206Z',
  },
];

const Template: Story = (args) => {
  const [selected, setSelected] = useState<DataType[]>([]);
  const [sorting, setSorting] = useState<DataGridSort<SortField>>();
  const [loading, setLoading] = useState(true);
  const [slicedData, setSlicedData] = useState<DataType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setSlicedData(data.slice((page - 1) * 10, page * 10));
      setLoading(false);
    }, 1500);
  }, []);

  const handleChangePage = (
    _event: ChangeEvent<unknown>,
    newPage: number,
  ): void => {
    setLoading(true);
    setPage(newPage);

    setTimeout(() => {
      setLoading(false);
      setSlicedData(data.slice((newPage - 1) * 10, newPage * 10));
    }, 1500);
  };

  const handleReset = () => {
    setSlicedData([]);
    setLoading(true);

    return setTimeout(() => {
      setSlicedData(data.slice((page - 1) * 10, page * 10));
      setLoading(false);
    }, 1500);
  };

  const handleSelect = (rows: DataType[]) => setSelected(rows);

  const handleRowClick = (row: DataType) => console.log('row clicked', row);

  const handleSort = (newSorting: DataGridSort<SortField> | undefined) =>
    setSorting(newSorting);

  const handleToggleDisabled = () => setDisabled((prev) => !prev);

  return (
    <ExampleTemplate>
      <ExampleTemplate.Case
        title="DataGrid без пагинации"
        descriptionList={[
          'Пагинация скрыта, так как totalCount(10) меньше или равен minDisplayRows(10)',
          'Растягивается по всей доступной высоте котейнера (600px)',
        ]}
      >
        <Stack
          spacing={4}
          sx={{ height: '600px', padding: '0 36px', alignItems: 'flex-end' }}
        >
          <Button onClick={handleReset}>Сбросить</Button>
          <DataGrid<DataType, SortField>
            {...args}
            keyId="id"
            rows={slicedData}
            columns={columns}
            selectedRows={selected}
            onSelectRow={handleSelect}
            onRowClick={handleRowClick}
            loading={loading}
            onSort={handleSort}
            sorting={sorting}
            Footer={
              <DataGridPagination
                totalCount={10}
                onChange={handleChangePage}
                page={page}
              />
            }
          />
        </Stack>
      </ExampleTemplate.Case>

      <ExampleTemplate.Case
        title="DataGrid с пагинацией"
        descriptionList={[
          'Растягивается по всей доступной высоте котейнера (700px)',
        ]}
      >
        <Stack
          spacing={4}
          sx={{ height: '700px', padding: '0 36px', alignItems: 'flex-end' }}
        >
          <Button onClick={handleReset}>Сбросить</Button>
          <DataGrid<DataType, SortField>
            {...args}
            keyId="id"
            rows={slicedData}
            columns={columns}
            selectedRows={selected}
            onSelectRow={handleSelect}
            onRowClick={handleRowClick}
            loading={loading}
            onSort={handleSort}
            sorting={sorting}
            Footer={
              <DataGridPagination
                totalCount={data.length}
                onChange={handleChangePage}
                page={page}
              />
            }
          />
        </Stack>
      </ExampleTemplate.Case>

      <ExampleTemplate.Case
        title="DataGrid с пагинацией без данных"
        descriptionList={[
          'Растягивается по всей доступной высоте котейнера (700px)',
        ]}
      >
        <Stack
          spacing={4}
          sx={{ height: '700px', padding: '0 36px', alignItems: 'flex-end' }}
        >
          <Button onClick={handleReset}>Сбросить</Button>
          <DataGrid<DataType, SortField>
            {...args}
            keyId="id"
            rows={[]}
            columns={columns}
            selectedRows={selected}
            onSelectRow={handleSelect}
            onRowClick={handleRowClick}
            loading={loading}
            onSort={handleSort}
            sorting={sorting}
            Footer={
              <DataGridPagination
                totalCount={0}
                onChange={handleChangePage}
                page={page}
              />
            }
          />
        </Stack>
      </ExampleTemplate.Case>

      <ExampleTemplate.Case
        title="DataGrid с блокировкой содержимого"
        descriptionList={[
          'Растягивается по всей доступной высоте котейнера (700px)',
        ]}
      >
        <Stack
          spacing={4}
          sx={{ height: '700px', padding: '0 36px', alignItems: 'flex-end' }}
        >
          <Grid container templateColumns="auto auto" spacing={4}>
            <Button onClick={handleReset}>Сбросить</Button>
            <Button onClick={handleToggleDisabled}>
              {disabled ? 'Разблокировать' : 'Заблокировать'}
            </Button>
          </Grid>

          <DataGrid<DataType, SortField>
            {...args}
            keyId="id"
            rows={slicedData}
            columns={columns}
            selectedRows={selected}
            onSelectRow={handleSelect}
            onRowClick={handleRowClick}
            loading={loading}
            onSort={handleSort}
            sorting={sorting}
            disabled={disabled}
            Footer={
              <DataGridPagination
                totalCount={data.length}
                onChange={handleChangePage}
                page={page}
              />
            }
          />
        </Stack>
      </ExampleTemplate.Case>
    </ExampleTemplate>
  );
};

export const Default = Template.bind({});

Default.parameters = {
  options: { showPanel: false },
  controls: { expanded: true },
};

export const Showcase: Story = (args) => {
  const [selected, setSelected] = useState<DataType[]>([]);
  const [sorting, setSorting] = useState<DataGridSort<SortField>>();
  const [loading, setLoading] = useState(true);
  const [slicedData, setSlicedData] = useState<DataType[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setTimeout(() => {
      setSlicedData([]);
      setLoading(false);
    }, 1500);
  }, []);

  const handleChangePage = (
    _event: ChangeEvent<unknown>,
    newPage: number,
  ): void => {
    setLoading(true);
    setPage(newPage);

    setTimeout(() => {
      setLoading(false);
      setSlicedData(data.slice((newPage - 1) * 10, newPage * 10));
    }, 1500);
  };

  const handleSelect = (rows: DataType[]) => setSelected(rows);

  const handleRowClick = (row: DataType) => console.log('row clicked', row);

  const handleSort = (newSorting: DataGridSort<SortField> | undefined) =>
    setSorting(newSorting);

  return (
    <DataGrid<DataType, SortField>
      {...args}
      keyId="id"
      rows={slicedData}
      columns={columns}
      selectedRows={selected}
      onSelectRow={handleSelect}
      onRowClick={handleRowClick}
      minDisplayRows={10}
      loading={loading}
      onSort={handleSort}
      sorting={sorting}
      Footer={
        <DataGridPagination
          totalCount={data.length}
          onChange={handleChangePage}
          page={page}
        />
      }
    />
  );
};

Showcase.storyName = 'DataGrid NoData';
