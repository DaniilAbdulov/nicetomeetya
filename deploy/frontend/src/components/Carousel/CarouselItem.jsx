import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;

export const CarouselItem = ({title, description}) => (
  <Card
    hoverable
    style={{
      width: 240,
    }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title={title} description={description} />
  </Card>
);