import React from 'react';
import { Menu } from 'antd';
import type { GetProp, MenuProps } from 'antd';

type MenuItem = GetProp<MenuProps, 'items'>[number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}


const items: MenuItem[] = [
  getItem('Межоперационные склады', '1', null, [
    getItem('Склад продукции', '11'),
    getItem('Склад заготовок', '12'),
    getItem('Хозяйственный склад', '13'),
    getItem('Инструментальный склад', '14'),
    getItem('Склад мерителей', '15'),
    getItem('Склад ЗИП', '16'),
  ]),
];


function ListTypeWarehouse() {

  return (
    <>
      <Menu
        mode="inline"
        defaultSelectedKeys={['11']}
        style={{ width: 256 }}
        items={items}
      />
    </>
  );
}

export default ListTypeWarehouse;