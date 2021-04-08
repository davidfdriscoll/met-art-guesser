import { useContext, useEffect, useState } from 'react';
import { CarouselContext } from 'pure-react-carousel';

import MobileStepper from '@material-ui/core/MobileStepper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  stepper: {
    '& .MuiMobileStepper-dots .MuiMobileStepper-dotActive': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}));

export default function ArtCarouselDots(props) {
  const classes = useStyles();
  const carouselContext = useContext(CarouselContext);
  const [currentSlide, setCurrentSlide] = useState(carouselContext.state.currentSlide);
  const [totalSlides, setTotalSlides] = useState(carouselContext.state.totalSlides);

  useEffect(() => {
    function onChange() {
      setCurrentSlide(carouselContext.state.currentSlide);
      setTotalSlides(carouselContext.state.totalSlides);
    }
    carouselContext.subscribe(onChange);
    return () => carouselContext.unsubscribe(onChange);
  }, [carouselContext]);

  return (
    <MobileStepper
      variant="dots"
      steps={totalSlides}
      activeStep={currentSlide}
      position="static"
      className={classes.stepper}
    />
  );
}