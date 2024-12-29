import {Empty} from 'antd';
import React from 'react';
import {NavLink} from 'react-router-dom';

export const NoFound = () => {
  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={
        <span>
          Здесь пока ничего нет <NavLink to="/">К списку уроков</NavLink>
        </span>
      }
    ></Empty>
  );
};
