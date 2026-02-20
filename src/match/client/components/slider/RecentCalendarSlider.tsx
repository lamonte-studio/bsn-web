'use client';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";

type Props<T> = {
  data: T[];
  render: (item: T, index: number) => React.ReactNode;
  keyExtractor?: (item: T, index: number) => string;
};

export default function RecentCalendarSlider<T>({ data, render, keyExtractor }: Props<T>) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    variableWidth: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          variableWidth: true,
        },
      },
    ],
    className: 'recent-calendar-slider',
  };
  return (
    <Slider {...settings}>
      {data.map((item, index) => (
        <div key={keyExtractor ? keyExtractor(item, index) : index}>
          {render(item, index)}
        </div>
      ))}
    </Slider>
  );
}
