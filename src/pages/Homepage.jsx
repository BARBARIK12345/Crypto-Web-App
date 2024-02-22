import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import btcSrc from "../asset/btc.png";


const Homepage = () => {
  return (
    <>
      <Box bgColor={'blackAlpha.900'} w={'full'} h={'85vh'}>

      <Image w={'full'} h={'full'} objectFit={'contain'} src={btcSrc}/>
      </Box>
      <Text fontSize={'6xl'} textAlign={'center'} fontWeight={'thin'} color={'white'} mt={'-20'}>Xcrypto</Text>

    </>
  )
}

export default Homepage
