import { useState, useEffect, useRef } from 'react';
import { Table, Drawer, Input, Button, Space, Tag } from 'antd';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import useStore from '../../store/items';
import useRerenderTrigger from '../../store/rerenderTrigger';
import usePagesTable from '../../store/pagesTable';
import { EditOutlined, SearchOutlined } from '@ant-design/icons';
import Modal from '../Modal/Modal';
import tableStyle from './TableItems.module.css';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';


interface DataType {
  id: string;
  name: string;
  measurement_units?: string;
  code?: string;
  description?: string;
  key:string;
}


type DataIndex = keyof DataType;




function TableItems() {

  const { items, getItems, count } = useStore();
  const { stateRer } = useRerenderTrigger();
  const { pagination, setPaginationVal } = usePagesTable();

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Найти
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Сброс
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Фильтр
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Закрыть
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      //@ts-ignore
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
        ...getColumnSearchProps('name'),
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Единица измерения',
      dataIndex: 'measurement_units',
    },
    {
      title: 'Артикул/код',
      dataIndex: 'code',
    },
    {
      title: '',
      dataIndex: 'edit',
      align: 'right',
      render: (_, record) => {
        return <span><Modal item={record} btnModal={<EditOutlined></EditOutlined>}></Modal></span>;
      },
    },
  ];

  function onChangePagination(e: any) {
    setPaginationVal(e)
  }

  useEffect(() => {
    setTimeout(() => getItems(pagination), 0);
  }, [stateRer, pagination]);

  return (
    <>
      <Table className={tableStyle.table} columns={columns} dataSource={items} pagination={{ total:count }}
        onChange={(e) => onChangePagination(e)} scroll={{ y: '65vh' }} 
      />

    </>
  );
}

export default TableItems;