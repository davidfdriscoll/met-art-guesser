import React from 'react';
import {nanoid} from 'nanoid';

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  carousel: {
    display: 'flex',
  },
  slider: {
    '& .carousel__slider-tray-wrapper': {
      height: '100%',
    },
    '& .carousel__slider-tray-wrapper .carousel__slider-tray': {
      height: '100%',
    },
    '& .carousel__slider-tray-wrapper .carousel__slider-tray .carousel__inner-slide': {
    },
  },
  button: {
    flex: '1 0 auto',
  },
  paper: {
    minHeight: 0,
    height: '100%',
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
    },
  },
  mainImage: {
    objectFit: 'contain',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3),
    },
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function ArtCarousel(props) {
  const classes = useStyles();

  if(!props.artObject) return null;

  return(
    <CarouselProvider
      totalSlides={props.artObject.additionalImages.length + 1}
      className={classes.carousel}
      isIntrinsicHeight
    >
      <ButtonBack className={classes.button}>Back</ButtonBack>
      <Slider className={classes.slider}>
        <Slide index={0} className={classes.slide}>
          <Paper elevation={15} className={classes.paper}>
            <img 
              className={classes.mainImage} 
              src={props.artObject.primaryImage}
              alt="Guess the object" 
            />
          </Paper>
        </Slide>
        {props.artObject.additionalImages.map((additionalImageURL, additionalImageIndex) => 
          <Slide key={nanoid()} index={additionalImageIndex+1}>
            <Paper key={nanoid()} elevation={15} className={classes.paper}>
              <img 
                key={nanoid()} 
                className={classes.mainImage} 
                src={additionalImageURL} 
                alt="Guess the object" 
              />
            </Paper>
          </Slide>          
        )}
      </Slider>
      <ButtonNext className={classes.button}>Next</ButtonNext>      
    </CarouselProvider>
  );
}