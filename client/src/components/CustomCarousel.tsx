import React, { ReactNode } from "react";
import Carousel, { ResponsiveType } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface IProps {
  swipeable: boolean;
  draggable: boolean;
  showDots: boolean;
  responsive: ResponsiveType;
  arrows: boolean;
  infinite: boolean;
  shouldResetAutoplay: boolean;
  autoPlay: boolean;
  renderButtonGroupOutside?: boolean;
  customButtonGroup?: JSX.Element;
  className: string;
  children: ReactNode;
}

const CustomCarousel = ({
  swipeable,
  draggable,
  showDots,
  responsive,
  arrows,
  infinite,
  shouldResetAutoplay,
  autoPlay,
  renderButtonGroupOutside,
  customButtonGroup,
  className,
  children,
}: IProps) => {
  return (
    <Carousel
      swipeable={swipeable}
      draggable={draggable}
      showDots={showDots}
      responsive={responsive}
      arrows={arrows}
      infinite={infinite}
      shouldResetAutoplay={shouldResetAutoplay}
      autoPlay={autoPlay}
      renderButtonGroupOutside={renderButtonGroupOutside}
      customButtonGroup={customButtonGroup}
      className={className}
    >
      {children}
    </Carousel>
  );
};

export default CustomCarousel;
