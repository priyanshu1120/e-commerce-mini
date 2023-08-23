import { Box, Flex, HStack, Heading, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Product = ({ data }) => {
  const [img, setImg] = useState(data.images[0]);
  const navigate = useNavigate();
  const handleMouseOver = () => {
    setImg(data.images[1]);
  };

  const handleMouseOut = () => {
    setImg(data.images[0]);
  };

  return (
    <Flex
      flexDirection={"column"}
      p={[1, 2, 2]}
      align="center"
      boxShadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px"}
      onClick={() => navigate(`/collection/all/${data.id}`)}
      cursor='pointer'
    >
      <Box
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        w="100%"
        h="80%"
      >
        <Image w="100%" h="100%" src={img} alt={data.name} />
      </Box>
      <Text fontSize={[13]} mt="20px" fontWeight={600}>
        {data.name + "-" + " " + data.color + " " + "|" + " " + data.gender}
      </Text>
      <HStack>
        <Text fontSize={[12]} color="red">
          RS {data.final_price}
        </Text>
        <Text as="s" fontSize={[12]} color="gray">
          RS {data.orignol_price}
        </Text>
      </HStack>
    </Flex>
  );
};

export default Product;
