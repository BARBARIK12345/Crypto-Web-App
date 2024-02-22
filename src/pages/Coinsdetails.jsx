import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import {
  Badge,
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Image,
  Progress,
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

  const params = useParams(); /// =====For custom id using param ====///

  const currencySymbol =
    currency === "inr" ? "₹ " : currency === "eur" ? "€ " : "$ "; /// same here for currency =symbol and change as per currency//

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
        h={"auto"}
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

            <VStack spacing={"4"} padding={"2"} alignItems={"center"} w={'80%'}>
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
                <StatLabel fontWeight={"bold"}>{coin.name}</StatLabel>
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
              <Badge
                fontSize={"2xl"}
                bgColor={"blackAlpha.900"}
                color={"white"}
              >
                #{coin.market_data.market_cap_rank}
              </Badge>
            </VStack>

            {/* ////// ==== ======24 hrs high low range in range bar====== === //// */}

            <Custombar
              high={`${coin.market_data.high_24h[currency]}`}
              low={`${coin.market_data.low_24h[currency]}`}
            />

            {/* ///// ==============  Max supply showcase ============== ///  */}

            <Marketdata
              title={"Max Supply :"}
              value={coin.market_data.max_supply}
            />
            <Marketdata
              title={"Ciculate Supply :"}
              value={coin.market_data.circulating_supply}
            />
            <Marketdata
              title={"Market Cap :"}
              value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
            />

            <Marketdata
              title={"All Time Low:"}
              value={`${currencySymbol}${coin.market_data.atl[currency]}`}
            />

            <Marketdata
              title={"All Time High:"}
              value={`${currencySymbol}${coin.market_data.ath[currency]}`}
            />

           
          </>
        )}
      </Box>
    </Center>
  );
};

const Marketdata = ({ title, value }) => (
  <HStack justifyContent={"space-between"} p={2}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
      {title}
    </Text>
    <Text fontFamily={"Bebas Neue"} fontWeight={"bold"}>
      {value}
    </Text>
  </HStack>
);

const Custombar = ({ high, low }) => {
  return (
    <Center>
      <VStack w={"full"} justifyContent={"center"}>
        <Progress value={50} colorScheme="teal" w={"full"} />
        <HStack justifyContent={"space-between"} w={"full"}>
          <Badge children={low} backgroundColor={"red.500"} />
          <Text fontSize={"medium"}>24 Hrs Range</Text>
          <Badge children={high} backgroundColor={"green.500"} />
        </HStack>
      </VStack>
    </Center>
  );
};

export default Coinsdetails;
