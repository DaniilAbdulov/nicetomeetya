import React from 'react';
import { Card } from 'antd';
import {SettingOutlined } from '@ant-design/icons';
const { Meta } = Card;


const clickHandler = (id) => {
  console.log(`like ${id}`)
}

export const CarouselItem = ({id, title, description}) => (
  <Card
    hoverable
    style={{
      width: 240,
    }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
    actions={[
      <SettingOutlined key="setting" onClick={() => clickHandler(id)}/>,
    ]}
    
  >
    <Meta title={title} description={description} />
  </Card>
);