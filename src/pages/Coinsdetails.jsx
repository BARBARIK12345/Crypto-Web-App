import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import { Box, Text } from '@chakra-ui/react';
import axios from 'axios';
import { server } from '..';

const Coinsdetails = () => {

    const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState("inr");


  useEffect(()=>{
    try {

        const fetchcoindetail= async()=>{
         const {data} = await axios.get(`${server}/coins/${coin.id}`)
        //   console.log(data)
          setCoin(data)
          setLoading(false)  
        }
        fetchcoindetail();
        
    } catch (error) {
        console.error(error)
        setLoading(true)
    }
    
  })  

  return (
    <Box
    display={"flex"}
    flexWrap={"wrap"}
    flexDirection={"row"}
    w={"80vw"}
    mt={"1rem"}
    //   alignContent={'center'}
    justifyContent={"center"}
    >
    {loading ? (
            <Loader />
          ) : (
    
      <Text>hii</Text>
    
    )
     }
     </Box>
  )
}

export default Coinsdetails
