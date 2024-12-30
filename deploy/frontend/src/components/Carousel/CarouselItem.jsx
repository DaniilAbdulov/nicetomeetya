import React from 'react';
import { sympathiesStore } from '#stores/components/Carousel/SympathiesStore.js';
import { Card } from 'antd';

import {HeartOutlined, HeartFilled } from '@ant-design/icons';
const { Meta } = Card;



const clickHandler = (id, key) => {
  console.log(`${key} ${id}`)

  switch (key) {
    case 'create':
      sympathiesStore.createSympathy(id);
      break;
    default:
      break;
  }
}



export const CarouselItem = ({id, title, description}) => {
  const actions = [];
  const sympathies = sympathiesStore.sympathiesByUser;

  if (sympathies.includes(id)) {
    actions.push(
<HeartFilled key="create" onClick={() => clickHandler(id, 'create')}/>
    )
  } else {
    actions.push(
      <HeartOutlined key="create" onClick={() => clickHandler(id, 'create')}/>
          )
  }

  return (
    <Card
      hoverable
      style={{
        width: 240,
      }}
      cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
      actions={actions}
      
    >
      <Meta title={title} description={description} />
    </Card>
  )
} ;