import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Image,
  DrawerOverlay,
  Drawer,
  DrawerCloseButton,
  Heading,
  DrawerBody,
  DrawerFooter,
  DrawerContent,
  DrawerHeader,
  Divider,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { BsHandbag } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { DecreaseCartQty, IncreaseCartQty, removeCart } from "../Redux/Carts/action";
import { useState } from "react";

export default function Navbar() {
  const { cart } = useSelector((store) => store.cart);
  const [show,setShow] = useState(false)
  const dispatch = useDispatch()
    // Cart Drawer state
    const {
      isOpen: isCartDrawerOpen,
      onOpen: onOpenCartDrawer,
      onClose: onCloseCartDrawer,
    } = useDisclosure();
  
    // Navigation Drawer state
    const { isOpen, onToggle} = useDisclosure();
  
  let total_price = 0;
  total_price = cart.reduce(
    (acc, el) => el.final_price * el.qty + acc,
    total_price
  );
  console.log(total_price);

  const increaseQty = (size,id)=>{
        dispatch(IncreaseCartQty({size,id}))
  }

  const decreaseQty = (size,id)=>{
     dispatch(DecreaseCartQty({size,id}))
  }

  const removeQty = (size,id) =>{
    dispatch(removeCart({size,id}))
  }

  return (
    <Box position={"sticky"} top="0px">
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: 2 }}
          display={{ base: "flex", md: "none" }}
        >
          {" "}
          {/* md is like current senario and base is like a responsive display */}
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 2, md: 0.4 }}
          justify={{ base: "centre", md: "start" }}
        >
          <Link to="/">
            <Image src="https://www.flatheads.in/cdn/shop/files/flatheads-logo-new-hotizontal_180x_2x_bf74c8db-79f1-4904-b343-3b0e2681ec07_192x32.png?v=1647508945" />
          </Link>
        </Flex>
        <Flex
          flex={{ base: 1, md: 1 }}
          display={{ base: "none", md: "flex" }}
          ml={10}
        >
          <DesktopNav />
        </Flex>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          align={"center"}
          direction={"row"}
          spacing={6}
        >
          <Box onClick={onOpenCartDrawer} cursor={"pointer"}>
            <Box position={"relative"}>
              <BsHandbag fontSize={"20px"} />
              <Box as="span" position="absolute" top="-8px" left="20px">
                {cart ? cart.length : 0}
              </Box>
            </Box>
          </Box>
          <Link to="/login">
            {" "}
            <Button
              as={"a"}
              fontSize={"sm"}
              fontWeight={400}
              variant={"link"}
              href={"#"}
            >
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            {" "}
            <Button
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"pink.400"}
              href={"#"}
              _hover={{
                bg: "pink.300",
              }}
            >
              Sign Up
            </Button>
          </Link>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
      <Drawer
        isOpen={isCartDrawerOpen}
        placement="right"
        onClose={onCloseCartDrawer}
        size={["xs", "xs", "xs"]}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" fontSize={"24px"}>
            YOUR CART ({cart.length})
          </DrawerHeader>
          {cart.length > 0 ? (
            <DrawerBody>
              <Box mt="10px">
                {cart.length > 0 &&
                  cart.map((el) => (
                    <Box key={el.id} py="20px">
                      <Divider orientation="horizontal" borderColor={"black"} />
                      <Flex w="full" justify="space-between" align="center">
                        <Flex w="50%">
                          <Image
                            boxSize={"80px"}
                            src={el.images[0]}
                            alt="cart images"
                          />
                          <Box>
                            {el.name} | {el.color} | {el.gender}{" "}
                          </Box>
                        </Flex>
                        <Box> RS. {el.final_price}</Box>
                      </Flex>
                      <Flex
                        w="50%"
                        margin={"auto"}
                        mt="10px"
                        borderRadius={"xl"}
                        justify={"space-around"}
                        align="center"
                        border={"1px solid"}
                      >
                        <Text fontSize={"xl"} cursor='pointer' style={{display: el.qty <= 1 ? 'none' : 'block'}} onClick = {()=>decreaseQty(el.size,el.id)}>-</Text>
                        <Text fontSize={"xl"}>{el.qty}</Text>
                        <Text fontSize={"xl"} cursor='pointer' onClick = {()=>increaseQty(el.size,el.id)} >+</Text>
                        <Text fontSize={"25px"} cursor='pointer' onClick = {()=>removeQty(el.size,el.id)}> {<MdOutlineCancel />}</Text>
                      </Flex>
                    </Box>
                  ))}
              </Box>
              <Divider orientation="horizontal" borderColor={"black"} />
              <Flex align={"flex-end"} direction={"column"} px="15px" py="15px">
                <Heading as="h6" size="sm">
                  Subtotal
                </Heading>
                <Text>RS. {total_price}</Text>
              </Flex>

              <Button
                w="full"
                mt="20px"
                h="50px"
                bg="black"
                fontWeight={400}
                fontSize={"20px"}
                color="white"
                _hover={{ bg: "gray.100", color: "black" }}
              >
                Checkout
              </Button>
              <Button
                w="full"
                mt="10px"
                h="50px"
                border='1px solid'
                bg='white'
                fontWeight={400}
                fontSize={"20px"}
                _hover={{ bg: "black", color: "white" }}
              >
                view
              </Button>
            </DrawerBody>
          ) : (
            <Box p="20px">
              <Text>Your Cart Is Empty</Text>
            </Box>
          )}
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={10}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link to={navItem.href}>
                <Box
                  as="a"
                  p={2}
                  href={navItem.href ?? "#"}
                  fontSize={"sm"}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: "none",
                    color: linkHoverColor,
                  }}
                >
                  {navItem.label}
                </Box>
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href }) => {
  return (
    <Box
      as="a"
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Shop All",
    href: "/collection/all",
  },
  {
    label: "Not out edition(new)",
    href: "/newcollection",
  },
  {
    label: "Shoes",
    href: "/shoes",
    children: [
      {
        label: "Linen Sneakers",
        href: "/Linen Sneakers",
      },
      {
        label: "Banana Kicks",
        href: "/Banana Kicks",
      },
    ],
  },
  {
    label: "Classics",
    children: [
      {
        label: "Ellipses breatheable Sneakers",
        href: "/breatheable",
      },
      {
        label: "Luft ultralight sneakers",
        href: "/ultralight",
      },
    ],
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Help",
    href: "/help",
  },
];
