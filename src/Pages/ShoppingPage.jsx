import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getData } from '../Redux/Products/action'
import Product from '../Components/Product'
import { Box, Flex, Grid, GridItem, Heading, SimpleGrid } from '@chakra-ui/react'


const ShoppingPage = () => {
   const dispatch = useDispatch()
   const {products,isLoading,isError} = useSelector((store)=> store.product)
   useEffect(()=>{
       if(products && products.length == 0 ){
        dispatch(getData())
       }
     
   },[dispatch,products.length])

  return (
    <div>
          <Heading as ="h3" fontWeight={400}  mt={10} ml={10} size="lg">Shop All</Heading>
          
          <Flex w='95%' m='auto' mt='30px' gap = '20px'>
               <Box display={{base:'none',md:'flex'}} w={'30%'}  h='100vh'  minW = {'230px'} border='1px solid red'>
                    
               </Box>
                <SimpleGrid w='100%' border='1px solid red'columns={[1,2,3]} spacing={5}>
                {
                  isLoading ? <h1>Loading...</h1>
                  : isError ? <h2>Error...</h2>
                  : products && products.map((el)=><Product data = {el}/>)
                }
                </SimpleGrid>
          </Flex>


  
    </div>
  )
}

export default ShoppingPage
