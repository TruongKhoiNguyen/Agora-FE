import { Box, Flex, List, ListItem, Button, HStack, Text, Icon } from '@chakra-ui/react';
import { MdPeopleAlt, MdOndemandVideo } from 'react-icons/md';
import { FaPeopleRoof } from 'react-icons/fa6';
import { RiMemoriesFill } from 'react-icons/ri';
import { BsBookmarkHeart } from 'react-icons/bs';
import { BiMessageDetail } from 'react-icons/bi';
import { useState, React } from 'react';

const TypePage = {
  Friends: 'Friends',
  Groups: 'Groups',
  Video: 'Video',
  Memories: 'Memories',
  Saved: 'Saved',
  Messenger: 'Messenger'
};

const LeftSideBar = () => {
  const [selectedItem, setSelectedItem] = useState(TypePage.Friends);
  const handleItemClick = (item) => {
    // Xử lý sự kiện click tại đây
    console.log(`Clicked on ${item}`);
  };

  return (
    <Flex>
      <Box w="250px" bg="white" borderRadius="10px" p="20px" mr="20px" position="fixed" left={0}>
        <List spacing="8" mt="4">
          <ListItem cursor="pointer" bg={selectedItem === TypePage.Friends ? 'blue.200' : 'white'}>
            <Button
              colorScheme="grey.300"
              onClick={() => {
                handleItemClick(TypePage.Friends);
                setSelectedItem(TypePage.Friends);
              }}>
              <HStack spacing={2}>
                <Icon as={MdPeopleAlt} boxSize={6} color="blue.500" />
                <Text fontSize="20px" color="black">
                  Friends
                </Text>
              </HStack>
            </Button>
          </ListItem>
          <ListItem cursor="pointer" bg={selectedItem === TypePage.Groups ? 'blue.200' : 'white'}>
            <Button
              colorScheme="white"
              onClick={() => {
                handleItemClick(TypePage.Groups);
                setSelectedItem(TypePage.Groups);
              }}>
              <HStack spacing={2}>
                <Icon as={FaPeopleRoof} boxSize={6} color="blue.500" />
                <Text fontSize="20px" color="black">
                  Groups
                </Text>
              </HStack>
            </Button>
          </ListItem>
          <ListItem cursor="pointer" bg={selectedItem === TypePage.Video ? 'blue.200' : 'white'}>
            <Button
              colorScheme="white"
              onClick={() => {
                handleItemClick(TypePage.Video);
                setSelectedItem(TypePage.Video);
              }}>
              <HStack spacing={2}>
                <Icon as={MdOndemandVideo} boxSize={6} color="blue.500" />
                <Text fontSize="20px" color="black">
                  Video
                </Text>
              </HStack>
            </Button>
          </ListItem>
          <ListItem cursor="pointer" bg={selectedItem === TypePage.Memories ? 'blue.200' : 'white'}>
            <Button
              colorScheme="white"
              onClick={() => {
                handleItemClick(TypePage.Memories);
                setSelectedItem(TypePage.Memories);
              }}>
              <HStack spacing={2}>
                <Icon as={RiMemoriesFill} boxSize={6} color="blue.500" />
                <Text fontSize="20px" color="black">
                  Memories
                </Text>
              </HStack>
            </Button>
          </ListItem>
          <ListItem cursor="pointer" bg={selectedItem === TypePage.Saved ? 'blue.200' : 'white'}>
            <Button
              colorScheme="white"
              onClick={() => {
                handleItemClick(TypePage.Saved);
                setSelectedItem(TypePage.Saved);
              }}>
              <HStack spacing={2}>
                <Icon as={BsBookmarkHeart} boxSize={6} color="blue.500" />
                <Text fontSize="20px" color="black">
                  Saved
                </Text>
              </HStack>
            </Button>
          </ListItem>
          <ListItem
            cursor="pointer"
            bg={selectedItem === TypePage.Messenger ? 'blue.200' : 'white'}>
            <Button
              colorScheme="white"
              onClick={() => {
                handleItemClick(TypePage.Messenger);
                setSelectedItem(TypePage.Messenger);
              }}>
              <HStack spacing={2}>
                <Icon as={BiMessageDetail} boxSize={6} color="blue.500" />
                <Text fontSize="20px" color="black">
                  Messenger
                </Text>
              </HStack>
            </Button>
          </ListItem>
        </List>
      </Box>
    </Flex>
  );
};

export default LeftSideBar;
