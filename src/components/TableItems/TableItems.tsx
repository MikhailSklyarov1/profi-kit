import { useState, useEffect } from 'react';
import { Table, Drawer } from 'antd';
import type { TableColumnsType } from 'antd';
import useStore from '../../store/items';
import useRerenderTrigger from '../../store/rerenderTrigger';
import usePagesTable from '../../store/pagesTable';
import { EditOutlined } from '@ant-design/icons';
import Modal from '../Modal/Modal';
import tableStyle from './TableItems.module.css';
import { Space, Tag } from 'antd';
import type { TableProps } from 'antd';


interface DataType {
  id: string;
  name: string;
  measurement_units?: string;
  code?: string;
  description?: string;
  key:string;
}


const columns: TableColumnsType<DataType> = [
  {
    title: 'Название',
    dataIndex: 'name',
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
      console.log(record)
      return <span><Modal item={record} btnModal={<EditOutlined></EditOutlined>}></Modal></span>;
    },
  },
];



function TableItems() {

  const { items, getItems, count } = useStore();
  const { stateRer } = useRerenderTrigger();
  const { pagination, setPaginationVal } = usePagesTable();

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