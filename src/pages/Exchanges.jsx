import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "..";
import { Box, Center, Container,  Image, Text } from "@chakra-ui/react";
import Loader from "../components/Loader";
// import { Link } from "react-router-dom";

const Exchanges = () => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchexchange = async () => {
        const { data } = await axios.get(`${server}/exchanges`);
        // console.log(data);
        setResponse(data);
        setLoading(false);
      };
      fetchexchange();
    } catch (err) {
      console.error(err);
      setLoading(true);
    }
  }, []);

  return (
    <Center>
      <Box
        // border={"2px solid red"}
        display={"flex"}
        flexWrap={"wrap"}
        flexDirection={"row"}
        w={"80vw"}
        //   alignContent={'center'}
        justifyContent={"center"}
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            {response.map((exchng, indx) => (
              <Container
                key={indx}
                h={"310px"}
                minH={"310px"}
                w={"200px"}
                minW={"250px"}
                //   border={"1px solid green"}
                shadow={"lg"}
                objectFit={"contain"}
                padding={"1rem"}
                mt={"0.5rem"}
                css={{ "&:hover": { transform: "scale(1.03)" } }}
              >
                <a href={exchng.url} target="_blank">
                  {/* <Text textAlign={'center'} fontSize={'x-large'}m={'0.3rem'} fontWeight={'bold'}> {exchng.id}</Text> */}
                  <Center>
                    <Image
                      h={"8rem"}
                      w={"8rem"}
                      src={exchng.image}
                      m={"0.3rem"}
                    />
                  </Center>
                  <Text
                    textAlign={"center"}
                    fontSize={"x-large"}
                    m={"0.3rem"}
                    fontWeight={"bold"}
                  >
                    {exchng.trust_score_rank}
                  </Text>
                  <Text
                    textAlign={"center"}
                    fontSize={"x-large"}
                    m={"0.3rem"}
                    fontWeight={"bold"}
                  >
                    {exchng.name}
                  </Text>
                  {/* <Text textAlign={'center'} fontSize={'x-large'}m={'0.3rem'}> {exchng.country}</Text> */}
                </a>
              </Container>
            ))}
          </>
        )}
      </Box>
    </Center>
  );
};

export default Exchanges;
