// import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Skeleton ,
} from '@mui/material';

SkeletonLoading.propTypes = {
    isLoading: PropTypes.bool,
    top: PropTypes.number,
    bot: PropTypes.number,
    children: PropTypes.node,
  };
export default function SkeletonLoading({ isLoading , top = 0.15 , bot = 0.3 , children }) {
    // const loading = ()=>{
    //     console.log("Loading...")
    // }
    if(isLoading){
        return(
            <>
                <Skeleton key={1} width="100%" height={window.screen.height * top} />
                <Skeleton key={2} width="100%" height={window.screen.height * bot} />
            </>
        )
    }
    return( <>{children}</>)
    
}