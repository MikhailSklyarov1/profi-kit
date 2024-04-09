import React, { useState, useEffect } from 'react';
import { Button, Drawer, Input } from 'antd';
import type { TableColumnsType } from 'antd';
import useStore from '../../store/items';
import useRerenderTrigger from '../../store/rerenderTrigger';
import { CloseOutlined, HomeOutlined } from '@ant-design/icons';
import modalStyle from './Modal.module.css';
const { TextArea } = Input;

interface DataType {
  id: string;
  name: string;
  measurement_units?: string;
  code?: string;
  description?: string;
  key: string;
}

interface EditCellProps {
  item?: DataType;
}

interface ModalProps extends EditCellProps {
  item?: DataType;
  btnModal: React.ReactNode;
}


const Modal: React.FC<ModalProps> = ({ item, btnModal }) => {

  const { editItems, createItems } = useStore()
  const { rer } = useRerenderTrigger()

  const [open, setOpen] = useState(false);
  const [data, setData] = useState(item ?? { id: '', name: '', measurement_units: '', code: '', description: '', key: ''});


  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  function save(data: DataType) {
    item ? editItems(data) : createItems(data);
    setOpen(false);
    rer();
  }

  return (
    <>
      <div onClick={showDrawer}>
        {btnModal}
      </div>
      <Drawer title={
        <p style={{
          backgroundColor:'#FAF4F4',
          width: '35px',
          height: '35px',
          borderRadius: '10px',
        }}><HomeOutlined style={{
          marginTop: '9px',
          marginLeft: '9px'
        }}
        /></p>}
        headerStyle={{height:'50px'}}
        open={open}
        closable={false}
        extra={<p onClick={onClose}><CloseOutlined /></p>}
      >
        <div className={modalStyle.container}>

          <div className={modalStyle.fields}>
            <p className={modalStyle.title}>Новая позиция</p>
            <p className={modalStyle.explanation}>Заполните все поля для создания новой номенклатуры</p>
            <label>Название</label>
            <Input className={modalStyle.input} value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
            <label>Единицы измерения</label>
            <Input className={modalStyle.input} value={data.measurement_units} onChange={(e) => setData({ ...data, measurement_units: e.target.value })} />
            <label>Артикул/код</label>
            <Input className={modalStyle.input} value={data.code} onChange={(e) => setData({ ...data, code: e.target.value })} />
            <label>Описание</label>
            <TextArea className={modalStyle.input} value={data.description} rows={4} onChange={(e) => setData({ ...data, description: e.target.value })} />
          </div>

          <div className={modalStyle.footer}>
            <Button className={modalStyle.cancel} onClick={onClose}>Отмена</Button>
            <Button className={modalStyle.ok} onClick={() => save(data)}>Подтвердить</Button>
          </div>

        </div>

      </Drawer>
    </>
  );
}

export default Modal;