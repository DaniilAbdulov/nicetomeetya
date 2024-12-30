import React, { useState } from 'react';
import { Button, Divider, Drawer } from 'antd';

export const MyDrawer = ({buttonName, elements}) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        {buttonName ?? 'Открыть'}
      </Button>
      <Drawer title="Логи" onClose={onClose} open={open}>
        {elements?.length ? elements.map((elem) => {
        return (
          <div key={elem.id}><p>{elem.from.fullName} лайнкул ваш профиль</p><p> {elem.time}</p><Divider /></div>
        ) 
        }) : null}
      </Drawer>
    </>
  );
};