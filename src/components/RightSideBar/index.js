import { useState } from "react";
import {
  Avatar,
  HStack,
  VStack,
  Text,
  Button,
  Divider,
  Box,
  Badge,
} from "@chakra-ui/react";

const ItemSuggestFriend = ({ avatarSrc, userName, timeStamp }) => {
  return (
    <HStack spacing="10px">
      <Avatar name={userName} src={avatarSrc} />
      <VStack align="left" spacing="8px">
        <HStack spacing="10px">
          <Text fontSize="18px">{userName}</Text>
          <Text fontSize="14px" color="blackAlpha.400">
            {timeStamp}
          </Text>
        </HStack>
        <HStack spacing="10px">
          <Button colorScheme="blue">Accept</Button>
          <Button colorScheme="messenger" variant="outline">
            Delete
          </Button>
        </HStack>
      </VStack>
    </HStack>
  );
};

const ItemFriendOnline = ({ avatarSrc, userName, isOnline, timeStamp }) => {
  return (
    <HStack spacing="10px">
      <Box position="relative">
        <Avatar name={userName} src={avatarSrc} size="md" />
        {isOnline && (
          <Badge
            position="absolute"
            top="4px"
            right="-2px"
            bg="green.400"
            borderRadius="50%"
            w="10px"
            h="10px"
          ></Badge>
        )}
      </Box>
      <Text fontSize="18px">{userName}</Text>
      {!isOnline && (
        <Text fontSize="14px" color="blackAlpha.400">
          {timeStamp}
        </Text>
      )}
    </HStack>
  );
};

const RightSideBar = () => {
  //TODO: Fakedata
  const itemsDataFriendOnline = [
    {
      avatarSrc: "https://bit.ly/dan-abramov",
      userName: "User 1",
      isOnline: true,
    },
    {
      avatarSrc: "https://bit.ly/dan-abramov",
      userName: "User 1",
      isOnline: true,
    },
    {
      avatarSrc: "https://bit.ly/dan-abramov",
      userName: "User 1",
      isOnline: false,
      timeStamp: "2 minutes ago",
    },
  ];
  //TODO: Fakedata
  const itemsData = [
    {
      avatarSrc: "https://bit.ly/dan-abramov",
      userName: "User 1",
      timeStamp: "1 hour ago",
    },
    {
      avatarSrc: "https://bit.ly/dan-abramov",
      userName: "User 2",
      timeStamp: "2 hours ago",
    },
    {
      avatarSrc: "https://bit.ly/dan-abramov",
      userName: "User 1",
      timeStamp: "1 hour ago",
    },
    {
      avatarSrc: "https://bit.ly/dan-abramov",
      userName: "User 2",
      timeStamp: "2 hours ago",
    },
    {
      avatarSrc: "https://bit.ly/dan-abramov",
      userName: "User 1",
      timeStamp: "1 hour ago",
    },
  ];

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    console.log("enter");
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <VStack align="left" spacing="1rem" w="300px">
      <HStack justifyContent="space-between" w="100%">
        <Text fontSize="18px" color="blackAlpha.400">
          Suggestions For You
        </Text>
        <Text
          fontSize="18px"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          cursor="pointer"
          color={isHovered ? "purple.200" : "purple.400"}
        >
          See All
        </Text>
      </HStack>
      {itemsData.map((item, index) => (
        <ItemSuggestFriend
          key={index}
          avatarSrc={item.avatarSrc}
          userName={item.userName}
          timeStamp={item.timeStamp}
        />
      ))}
      <Divider borderColor="#CDD0D4" />
      <HStack justifyContent="space-between" w="100%">
        <Text fontSize="18px" color="blackAlpha.400">
          Online Friends
        </Text>
        <Text
          fontSize="18px"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          cursor="pointer"
          color={isHovered ? "purple.200" : "purple.400"}
        >
          See All
        </Text>
      </HStack>
      {itemsDataFriendOnline.map((item, index) => (
        <ItemFriendOnline
          key={index} // Đặt key duy nhất cho mỗi phần tử
          avatarSrc={item.avatarSrc}
          userName={item.userName}
          isOnline={item.isOnline}
          timeStamp={item.timeStamp}
        />
      ))}
    </VStack>
  );
};

export default RightSideBar;
