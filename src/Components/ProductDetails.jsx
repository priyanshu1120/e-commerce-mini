import React, { useEffect, useState } from "react";
import { getSingleProductData } from "../Redux/Products/action";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { addToCart } from "../Redux/Carts/action";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { productDetails, isLoading, isError } = useSelector((store) => store.product);
  const [size, setSize] = useState(null);
  const  [show,setShow] = useState(false)
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      dispatch(getSingleProductData(id));
    }
  }, [dispatch, id]);

  const handleCart = ()=>{
      if(!size){
        setShow(true)
      } 
      
     let payload = {
          ...productDetails,
          size
     }
     dispatch(addToCart(payload))
  }


  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : isError ? (
        <h2>something went wrong</h2>
      ) : (
        Object.keys(productDetails).length > 0 && (
          <Container maxW={"7xl"}>
            <SimpleGrid
              columns={{ base: 1, lg: 2 }}
              spacing={{ base: 4, md: 6 }}
              py={{ base: 12, md: 16 }}
              h="auto"
            >
              <Flex align={"center"} justify="center">
                <Image
                  src={productDetails.images[0]}
                  alt={productDetails.name}
                  rounded={"md"}
                  align="center"
                  maxW="100%"
                  h={{ base: "400px", sm: "400px", lg: "500px" }}
                />
              </Flex>
              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={"column"}
              >
                <Heading
                  lineHeight={1}
                  fontWeight={500}
                  fontSize={["2xl", "4xl", "4xl"]}
                >
                  {`${productDetails.name} - ${productDetails.color} | ${productDetails.gender}`}
                </Heading>
                <HStack>
                  <Text color="red.500" fontSize={["2xl", "3xl"]}>
                    RS. {productDetails.final_price}
                  </Text>
                  <Text as="s" color="gray.400" fontSize={["2xl", "3xl"]}>
                    RS. {productDetails.orignol_price}
                  </Text>
                </HStack>

                <Grid
                  templateColumns={{
                    base: "repeat(2, 1fr)",
                    sm: "repeat(3, 1fr)",
                    md: "repeat(4, 1fr)",
                  }}
                  gap={[3, 6]}
                >
                  {productDetails.images.map((el) => (
                    <Box
                      borderRadius={"50%"}
                      border={"4px solid gray"}
                      w="100px"
                      h="100px"
                    >
                      <Image
                        w="100%"
                        borderRadius={"50%"}
                        h="100%"
                        src={el}
                        alt="variety images"
                      />
                    </Box>
                  ))}
                </Grid>

                <Stack
                  spacing={{ base: 1, sm: 2 }}
                  direction={"column"}
                >
                  <Heading as="h6" size="sm">
                    Choose a size
                  </Heading>
                  <Text color={'red.500'} display = {show ? 'block' :'none'}> *Please Select One Size*</Text>
                  <Grid
                    w={["100%", "80%", "50%"]}
                    mt="5px"
                    templateColumns={{
                      base: "repeat(3, 1fr)",
                      sm: "repeat(4, 1fr)",
                      md: "repeat(4, 1fr)",
                    }}
                    gap={[3, 4]}
                  >
                    {productDetails.sizes.map((el) => (
                        
                      <Button
                       size="sm"  
                        style={{backgroundColor: size === el ? 'black' : '#edf2f7',
                        color: size === el ? 'white' : 'black',
                      }}  
                      onClick = {()=>{setSize(el) ,setShow(false)}}>{el}
                      </Button>
                    ))}
                  </Grid>
                </Stack>
                <Button
                    w="100%"
                    h="60px"
                    bg={"yellow"}
                    _hover={{bg:'#e1e909'}}
                    variant="none"
                    onClick = {handleCart}
                  >
                  ADD TO CART
                  </Button>
              </Stack>
            </SimpleGrid>
          </Container>
        )
      )}
    </>
  );
};

export default ProductDetails;
