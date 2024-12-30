import { Carousel } from "antd";
import React from "react";
import { CarouselItem } from "./CarouselItem";
import { MyDrawer } from "#components/shared/MyDrawer.jsx";

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

const elements = [
    {id: 1, title: 'Hello world 1', description: 'Description'},
    {id: 2, title: 'Hello world 2', description: 'Description'},
    {id: 3, title: 'Hello world 3', description: 'Description'},
    {id: 4, title: 'Hello world 4', description: 'Description'},
    {id: 5, title: 'Hello world 5', description: 'Description'},
    {id: 6, title: 'Hello world 6', description: 'Description'}
]

export const CarouselView = () => {
    const onChange = (currentSlide) => {
        console.log(currentSlide);
      };
      return (
        <div style={{width: '300px', height: '500px'}} >
        <Carousel afterChange={onChange} arrows infinite={true}>
            {elements.length ? elements.map((elem) => {

                return (
                    <div key={elem.id}>
                    <div style={contentStyle}><CarouselItem title={elem.title} description={elem.description} /></div>
                  </div>
                )

            }) : null}

        </Carousel>
        </div>


      );
};
