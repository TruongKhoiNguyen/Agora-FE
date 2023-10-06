import { useState } from "react";
import { Avatar, HStack, VStack, Text, Button } from "@chakra-ui/react";

const ItemRightSideBar = () => {
  return (
    <HStack spacing="1rem">
      <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
      <VStack spacing="1rem">
        <HStack spacing="1rem">
          <Text fontSize="2xl">Trần Xuân BÁch</Text>
          <Text fontSize="md">1 hour ago</Text>
        </HStack>
        <HStack spacing="1rem">
          <Button colorScheme="blue">Accept</Button>
          <Button colorScheme="messenger" variant="outline">
            Delete
          </Button>
        </HStack>
      </VStack>
    </HStack>
  );
};

const RightSideBar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <VStack align="left" spacing="2rem">
      <HStack>
        <Text fontSize="2xl" color="blackAlpha.400">
          Suggestions For You
        </Text>
        <Text
          fontSize="2xl"
          textDecoration="underline"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          cursor="pointer"
          color={isHovered ? "purple.200" : "purple.400"}
        >
          See All
        </Text>
      </HStack>
      <ItemRightSideBar></ItemRightSideBar>
      <ItemRightSideBar></ItemRightSideBar>
      <ItemRightSideBar></ItemRightSideBar>
      <ItemRightSideBar></ItemRightSideBar>
      <ItemRightSideBar></ItemRightSideBar>
    </VStack>
  );
};

export default RightSideBar;
