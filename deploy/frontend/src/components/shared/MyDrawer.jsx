import React, { useState } from 'react';
import { Button, Drawer } from 'antd';

export const MyDrawer = ({buttonName}) => {
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
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};