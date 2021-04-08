import { useContext, useEffect, useRef } from 'react';
import { CarouselContext } from 'pure-react-carousel';

export default function ArtCarouselResetter(props) {
  const carouselContext = useRef(useContext(CarouselContext));

  // with new object reset carousel
  useEffect(() => {
    carouselContext.current.setStoreState({currentSlide: 0});
  }, [props.artObject]);

  return null;
}