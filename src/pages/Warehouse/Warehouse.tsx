import { Button } from 'antd';
import warehouseStyle from "./Warehouse.module.css";
import { useState } from "react";
import { HomeOutlined, SwapOutlined, PlusOutlined } from '@ant-design/icons';
import ListTypeWarehouse from '../../components/ListTypeWarehouse/ListTypeWarehouse';
import TableItems from '../../components/TableItems/TableItems';
import Modal from '../../components/Modal/Modal';
import useStore from '../../store/items';


function Warehouse() {

  const [activeTab, setActiveTab] = useState("Склады");
  const { count } = useStore();

  const handleClick = (e: any) => {
    setActiveTab(e.target.innerText);
  };

  return (
    <div className={warehouseStyle.container}>
      <div className={warehouseStyle.sidebar}>
        <div className={warehouseStyle.topnav}>
          <div className={activeTab === "Склады" ? warehouseStyle.active : ""} onClick={handleClick}><HomeOutlined />Склады</div>
          <div onClick={() => activeTab === "Склады" ? setActiveTab('Транзакции') : setActiveTab('Склады')}><SwapOutlined /></div>
          <div className={activeTab === "Транзакции" ? warehouseStyle.active : ""} onClick={handleClick}>Транзакции</div>
        </div>

        <div style={{ padding: "0px 16px" }}>
          {activeTab === "Склады" && (
            <ListTypeWarehouse />
          )}

          {activeTab === "Транзакции" && (
            <ListTypeWarehouse />
          )}
        </div>
      </div>
      <div className={warehouseStyle.contentContainer}>
        <div className={warehouseStyle.content}>
          <div className={warehouseStyle.leftPart}>
            <span className={warehouseStyle.nameTable}>Номенклатура</span>
            <span className={warehouseStyle.count}>{count} единиц</span>
          </div>
          <div className={warehouseStyle.rightPart}>
            <Modal btnModal={<Button className={warehouseStyle.addBtn}><PlusOutlined />Новая позиция</Button>}></Modal>
          </div>
        </div>
        <TableItems />
      </div>
    </div>
  );
}

export default Warehouse;