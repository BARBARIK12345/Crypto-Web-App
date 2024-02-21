import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "..";
import {
  Box,
  Button,
  Center,
  Container,
  HStack,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
// import Errorcomponent from "../components/Errorcomponent";

const Coins = () => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState("inr"); // if we pass usd then we will get all values in usd as per api shown
  const [page, setPage] = useState(1);
  //   const [error , setError] = useState(false);          // error componenet

  const currencySymbol =
    currency === "inr" ? "₹ " : currency === "eur" ? "€ " : "$ "; /// cureency symbol turnery if change then

  useEffect(() => {
    try {
      const fetchcoin = async () => {
        const { data } = await axios.get(
          `${server}coins/markets?vs_currency=${currency}&page=${page}`
        );
        console.log(data);
        setResponse(data);
        setLoading(false);
      };
      fetchcoin();
    } catch (err) {
      console.error(err);
      //   setError(true);
      setLoading(true);
    }
  }, [currency, page]); // fetch only when currency or page event or state  is only change

  //   if (error)  return <Errorcomponent message = {'hii something went wrong'} />        /// error compoenent

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  const btns = new Array(132).fill(1); // For button mapping array has 132 pages in api from where we are fetching and for paging function.

  return (
    <>
    <Center>
      <RadioGroup
        onChange={setCurrency}
        value={currency}
      >
        <Stack direction="row">
          <Radio value="inr">INR</Radio>
          <Radio value="eur">EUR</Radio>
          <Radio value="usd">USD</Radio>
        </Stack>
      </RadioGroup>
      </Center>

      <Center>
        <Box
          border={"2px solid red"}
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
            <>
              {response.map((coins, indx) => (
                <Container
                  key={indx}
                  h={"310px"}
                  minH={"310px"}
                  w={"200px"}
                  minW={"300px"}
                  border={"1px solid green"}
                  objectFit={"contain"}
                  padding={"1rem"}
                  mt={"0.5rem"}
                  css={{ "&:hover": { transform: "scale(1.03)" } }}
                >
                  <Link to={`/coins/${coins.id}`} target="_blank">
                    <Text
                      textAlign={"center"}
                      fontSize={"x-large"}
                      m={"0.3rem"}
                      fontWeight={"bold"}
                    >
                      {coins.symbol}
                    </Text>
                    {/* <Text textAlign={'center'} 
                fontSize={'x-large'}m={'0.3rem'} 
                fontWeight={'bold'}> {coins.id}
                </Text> */}
                    <Center>
                      <Image
                        h={"8rem"}
                        w={"8rem"}
                        src={coins.image}
                        m={"0.3rem"}
                      />
                    </Center>

                    <Text
                      textAlign={"center"}
                      fontSize={"x-large"}
                      m={"0.3rem"}
                      fontWeight={"bold"}
                    >
                      {coins.name}
                    </Text>
                    <Text
                      textAlign={"center"}
                      fontSize={"x-large"}
                      m={"0.3rem"}
                    >
                      {currencySymbol}
                      {coins.current_price}
                    </Text>
                  </Link>
                </Container>
              ))}
            </>
          )}
        </Box>
      </Center>

        {/* /////======= ===Paging jsx part is started======= ////// */}
      <Center>
        <HStack w={"80%"} overflow={"auto"} m={"1px"} p={"4"}>
          {btns.map((value, index) => (
            <Button
              key={index}
              backgroundColor={"black"}
              color={"white"}
              onClick={() => {
                changePage(index + 1);
              }}
            >
              {index + 1}
            </Button>
          ))}
        </HStack>
      </Center>
    </>
  );
};

export default Coins;
