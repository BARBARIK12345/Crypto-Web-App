import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import btcSrc from "../asset/btc.png";
import { motion } from "framer-motion";


const Homepage = () => {
  return (
    <>
      <Box bgColor={'blackAlpha.900'} w={'full'} h={'85vh'}>
      <motion.div
        style={{
          height: "80vh",
        }}
        animate={{
          translateY: "20px",
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
      <Image w={'full'} h={'full'} objectFit={'contain'} src={btcSrc}/>
      </motion.div>
      </Box>
      <Text fontSize={'6xl'} textAlign={'center'} fontWeight={'thin'} color={'white'} mt={'-20'}>Xcrypto</Text>

    </>
  )
}

export default Homepage
