import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import {
    Badge,
  Box,
  Button,
  Center,
  Heading,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { server } from "..";
import { useParams } from "react-router-dom";
import Coins from "./Coins";

const Coinsdetails = () => {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState("inr");

  const params = useParams();

  const currencySymbol =
    currency === "inr" ? "₹ " : currency === "eur" ? "€ " : "$ ";              /// same here for currency =symbol and change as per currency//

  useEffect(() => {
    try {
      const fetchcoindetail = async () => {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        console.log(data);
        setCoin(data);
        setLoading(false);
      };
      fetchcoindetail();
    } catch (error) {
      console.error(error);
      setLoading(true);
    }
  }, [params.id]);

  return (
    <Center>
      <Box
        border={"2px solid red"}
        display={"flex"}
        flexWrap={"wrap"}
        flexDirection={"column"}
        w={"80vw"}
        mt={"1rem"}
        alignContent={"center"}
        justifyContent={"center"}    
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <Text>hii</Text>

            <Button></Button>

            {/* ///=======Radio button for change CMP as per currency =====/// */}
            <Center>
              <RadioGroup onChange={setCurrency} value={currency}>          
                <Stack direction="row">
                  <Radio value="inr">INR</Radio>
                  <Radio value="eur">EUR</Radio>
                  <Radio value="usd">USD</Radio>
                </Stack>
              </RadioGroup>
            </Center>


            <VStack spacing={"4"} padding={"2"} alignItems={"center"}>
              <Text alignSelf={"center"}>
                Last updated on
                {Date(coin.market_data.last_updated).split("G")[0]}
              </Text>
              <Image
                src={coin.image.large}
                w={"16"}
                h={"16"}
                objectFit={"contain"}
              />

              {/* // =======stat functionality for market up downs prices ====//// */}
              <Stat>
                <StatLabel fontWeight={'bold'}>{coin.name}</StatLabel>
                <StatNumber>
                  {currencySymbol}
                  {coin.market_data.current_price[currency]}
                </StatNumber>
                <StatHelpText>
                  <StatArrow
                    type={
                      coin.market_data.price_change_percentage_24h > 0
                        ? "increase"
                        : "decrease"
                    }
                  />
                  {coin.market_data.price_change_percentage_24h}%
                </StatHelpText>
              </Stat>

            {/* /////===== market cap rank ===== /// */}
              <Badge fontSize={'2xl'} bgColor={'blackAlpha.900'} color={'white'}>#{coin.market_data.market_cap_rank}</Badge>
            </VStack>
          </>
        )}
      </Box>
    </Center>
  );
};

export default Coinsdetails;
