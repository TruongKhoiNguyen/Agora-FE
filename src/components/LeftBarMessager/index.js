import { AiOutlineMessage, AiOutlineSearch } from 'react-icons/ai';
import {
  Box,
  Flex,
  HStack,
  Text,
  Image,
  Icon,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Avatar,
  Circle,
  Badge
} from '@chakra-ui/react';
import { FaUserFriends, FaUsers } from 'react-icons/fa';
import { useState, React } from 'react';

const TypeMessager = {
  Logo: 'logo',
  Message: 'Message',
  Group: 'Group',
  Friends: 'Friends'
};

//TODO: Fakedata
const itemsDataFriend = [
  {
    avatarSrc: 'https://bit.ly/dan-abramov',
    userName: 'User 1',
    message: 'alksfjl;kasdjfl',
    timeStamp: '11:30',
    countMessage: '3'
  }
];

const ItemMessage = (avatarSrc, userName, message, timeStamp, countMessage) => {
  return (
    <HStack>
      <Box position="relative">
        <Avatar name={userName} src={avatarSrc} size="md" />
        {countMessage > 0 && (
          <Badge
            position="absolute"
            top="4px"
            right="-2px"
            bg="green.400"
            borderRadius="50%"
            w="10px"
            h="10px"></Badge>
        )}
      </Box>
      <Flex>
        <Text flex={1} fontSize="18px">
          {userName}
        </Text>
        <Text fontSize="14px"> {timeStamp}</Text>
      </Flex>
      <Flex>
        <Text flex={1} fontSize="18px">
          {message}
        </Text>
        {countMessage > 0 && (
          <Circle size="14px">
            <Text fontSize="10px"> {countMessage}</Text>
          </Circle>
        )}
      </Flex>
    </HStack>
  );
};

const ListMessages = () => {
  return (
    <VStack>
      {itemsDataFriend.map((item, index) => (
        <ItemMessage
          key={index} // Đặt key duy nhất cho mỗi phần tử
          avatarSrc={item.avatarSrc}
          userName={item.userName}
          message={item.message}
          timeStamp={item.timeStamp}
          countMessage={item.countMessage}
        />
      ))}
    </VStack>
  );
};

const SearchHeader = () => {
  const [value, setValue] = useState('');
  const handleChange = (event) => setValue(event.target.value);

  return (
    <Box backgroundColor="#F4F4F4">
      <HStack spacing={4}>
        <Text fontSize="20px" color="black">
          Chat
        </Text>
        <InputGroup>
          <Input onChange={handleChange} placeholder="Search" value={value}></Input>
          <InputRightElement width="2rem">
            <Icon as={AiOutlineSearch} boxSize={6} color="#9B9B9B" />
          </InputRightElement>
        </InputGroup>
      </HStack>
    </Box>
  );
};

const LeftBarMessager = () => {
  const [selectedItem, setSelectedItem] = useState(TypeMessager.Logo);
  const handleItemClick = (item) => {
    // Xử lý sự kiện click tại đây
    console.log(`Clicked on ${item}`);
  };

  return (
    <HStack>
      <Flex
        spacing={4}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        //TODO: xoá minHeight khi sử dụng.
        height="100vh">
        <Box flex={1}>
          <Button
            colorScheme="grey.300"
            onClick={() => {
              handleItemClick(TypeMessager.Logo);
              setSelectedItem(TypeMessager.Logo);
            }}>
            <Image borderRadius="full" boxSize="50px" src="/images/logoapp.png" alt="Dan Abramov" />
          </Button>
        </Box>

        <Box bg={selectedItem == TypeMessager.Message ? 'blue.200' : 'white'}>
          <Button
            colorScheme="white"
            onClick={() => {
              handleItemClick(TypeMessager.Message);
              setSelectedItem(TypeMessager.Message);
            }}>
            <Icon as={AiOutlineMessage} boxSize={6} color="#9B9B9B" />
          </Button>
        </Box>

        <Box bg={selectedItem == TypeMessager.Group ? 'blue.200' : 'white'}>
          <Button
            colorScheme="white"
            onClick={() => {
              handleItemClick(TypeMessager.Group);
              setSelectedItem(TypeMessager.Group);
            }}>
            <Icon as={FaUsers} boxSize={6} color="#9B9B9B" />
          </Button>
        </Box>

        <Box bg={selectedItem == TypeMessager.Friends ? 'blue.200' : 'white'}>
          <Button
            colorScheme="white"
            onClick={() => {
              handleItemClick(TypeMessager.Friends);
              setSelectedItem(TypeMessager.Friends);
            }}>
            <Icon as={FaUserFriends} boxSize={6} color="#9B9B9B" />
          </Button>
        </Box>
      </Flex>
      <VStack height="100vh">
        <SearchHeader />
        <ListMessages></ListMessages>
      </VStack>
    </HStack>
  );
};

export default LeftBarMessager;
