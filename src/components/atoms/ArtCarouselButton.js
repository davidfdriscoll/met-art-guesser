import React, { useContext, useEffect, useState } from 'react';
import { CarouselContext } from 'pure-react-carousel';

import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

export default function ArtCarouselButton(props) {
  const carouselContext = useContext(CarouselContext);
  const [currentSlide, setCurrentSlide] = useState(carouselContext.state.currentSlide);
  const [totalSlides, setTotalSlides] = useState(carouselContext.state.totalSlides);

  function backClick() {
    carouselContext.setStoreState({currentSlide: currentSlide - 1})
  }

  function forwardClick() {
    carouselContext.setStoreState({currentSlide: currentSlide + 1})    
  }

  useEffect(() => {
    function onChange() {
      setCurrentSlide(carouselContext.state.currentSlide);
      setTotalSlides(carouselContext.state.totalSlides);
    }
    carouselContext.subscribe(onChange);
    return () => carouselContext.unsubscribe(onChange);
  }, [carouselContext]);

  return (
    <IconButton 
      color="primary" 
      aria-label={props.type}
      onClick={props.type === 'back' ? backClick : forwardClick}
      disabled={props.type === 'back' ? currentSlide===0 : currentSlide===totalSlides-1}
    >
      {props.type === 'back' ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
    </IconButton>
  );
}