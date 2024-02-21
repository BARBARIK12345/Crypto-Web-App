import { Box,  Spinner, VStack } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
  return (
    <div>
      <VStack m={'5rem'} justifyContent={'center'}>
        <Box transform={"scale(3)"}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="black.900"
        size='xl'     
         />
         </Box>
        </VStack>
    </div>
  );
};

export default Loader;
