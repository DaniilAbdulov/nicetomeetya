import { Carousel } from "antd";
import React from "react";
import { CarouselItem } from "./CarouselItem";

const contentStyle = {
    display: 'flex',
    justifyContent: 'center',
    margin: 0,
    height: '100%',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    borderRadius: '5px',
    padding: '10px 0px'
  };

export const CarouselView = ({users}) => {
    const onChange = (currentSlide) => {
        console.log(currentSlide);
      };
      return (
        <div style={{width: '300px', height: '500px'}} >
        <Carousel afterChange={onChange} arrows dots={false} infinite={true}>
            {users.length ? users.map((user) => {

                return (
                    <div key={user.id}>
                    <div style={contentStyle}><CarouselItem id={user.id} title={user.full_name} description={user.city} /></div>
                  </div>
                )

            }) : null}

        </Carousel>
        </div>


      );
};
