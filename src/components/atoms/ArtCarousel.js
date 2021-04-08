import React from 'react';
import {nanoid} from 'nanoid';

import { CarouselProvider, Slider, Slide, Image, DotGroup } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';

import ArtCarouselButton from '../../components/atoms/ArtCarouselButton';
import ArtCarouselResetter from '../../components/atoms/ArtCarouselResetter';

const useStyles = makeStyles((theme) => ({
  carousel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselNavigation: {
    minHeight: 0,
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
    alignSelf: 'center',
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
  image: {
    objectFit: 'contain',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3),
    },
    flexGrow: 1,
  },
  dotGroup: {
    margin: theme.spacing(1),
  }
}));

export default function ArtCarousel(props) {
  const classes = useStyles();
  if(!props.artObject) return null;

  return(
    <CarouselProvider
      totalSlides={props.artObject.additionalImages.length + 1}
      className={classes.carousel}
      isIntrinsicHeight
      hasMasterSpinner
    >
      <ArtCarouselResetter artObject={props.artObject} />
      <div className={classes.carouselNavigation}>
        <Hidden smDown>
          <ArtCarouselButton type='back' className={classes.button} />
        </Hidden>
        <Slider className={classes.slider}>
          <Slide index={0} className={classes.slide}>
            <Paper elevation={15} className={classes.paper}>
              <Image
                className={classes.image} 
                src={props.artObject.primaryImage}
                alt="Guess the object" 
              />
            </Paper>
          </Slide>
          {props.artObject.additionalImages.map((additionalImageURL, additionalImageIndex) => 
            <Slide key={nanoid()} index={additionalImageIndex+1}>
              <Paper key={nanoid()} elevation={15} className={classes.paper}>
                <Image
                  key={nanoid()} 
                  className={classes.image} 
                  src={additionalImageURL} 
                  alt="Guess the object" 
                />
              </Paper>
            </Slide>          
          )}
        </Slider>
        <Hidden smDown>
          <ArtCarouselButton type='next' className={classes.button} />   
        </Hidden>     
      </div>
      <DotGroup className={classes.dotGroup} />
    </CarouselProvider>
  );
}