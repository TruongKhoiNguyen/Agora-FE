/* eslint-disable no-unused-vars */
import { useRef, useState } from 'react';
import {
  Flex,
  Heading,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  Button,
  useToast
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  CheckboxGroup,
  Box,
  Avatar,
  Checkbox
} from '@chakra-ui/react';

import useChatStore from '../../../../hooks/useChatStore';

import { AiOutlineSearch } from 'react-icons/ai';
import { BsPlusLg } from 'react-icons/bs';

import requestApi from '../../../../utils/fetchData';

export default function SearchBar() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const friends = useChatStore((state) => state.friends);
  const userId = localStorage.getItem('userId');

  const [checkedUsers, setCheckedUsers] = useState([]);
  const conversationNameRef = useRef();

  const handleSubmit = async () => {
    const resetModal = () => {
      setCheckedUsers([]);
      conversationNameRef.current.value = '';
      onClose();
    };

    if (checkedUsers.length === 1) {
      try {
        await requestApi('conversations', 'POST', {
          name: '2MemsConversation',
          isGroup: false,
          members: checkedUsers
        });
        resetModal();
      } catch (err) {
        toast({
          title: 'Error',
          description: err.response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom-right'
        });
      }
    } else {
      try {
        await requestApi('conversations', 'POST', {
          isGroup: true,
          name: conversationNameRef.current.value,
          members: checkedUsers
        });
        resetModal();
      } catch (err) {
        toast({
          title: 'Error',
          description: err.response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true
        });
      }
    }
  };

  return (
    <Flex
      w="98%"
      mt={1}
      boxShadow="sm"
      h="16"
      alignItems="center"
      bg="white"
      borderRadius="xl"
      gap={4}
      justifyContent="center">
      <Heading size="sm">Chat</Heading>
      <InputGroup size="sm" w="56%">
        <Input borderRadius="2xl" placeholder="Search" border="1px" borderColor="gray.400" />
        <InputRightElement>
          <AiOutlineSearch />
        </InputRightElement>
      </InputGroup>
      <IconButton
        onClick={onOpen}
        borderRadius="full"
        colorScheme="blue"
        size="sm"
        icon={<BsPlusLg />}
      />
      <Modal size="lg" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a conversation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              disabled={checkedUsers.length < 2}
              ref={conversationNameRef}
              placeholder="Conversation's name..."
            />
            <Box mt={4}>
              <Heading mb={4} ml={2} size="sm">
                Add members
              </Heading>
              <Box maxHeight={200} overflowY="auto">
                <CheckboxGroup colorScheme="facebook">
                  <Flex gap={4} flexDir="column" ml={4}>
                    {friends === null
                      ? null
                      : friends.map((user, index) =>
                          user._id === userId ? null : (
                            <Checkbox
                              key={index}
                              isChecked={checkedUsers.includes(user._id)}
                              onChange={() =>
                                checkedUsers.includes(user._id)
                                  ? setCheckedUsers(
                                      checkedUsers.filter((param) => param !== user._id)
                                    )
                                  : setCheckedUsers([...checkedUsers, user._id])
                              }>
                              <Flex gap={2} mx={2} alignItems="center">
                                <Avatar
                                  borderRadius={0}
                                  size="sm"
                                  name={user.displayName}
                                  src={user.avatar}
                                />
                                <Text>{user.displayName}</Text>
                              </Flex>
                            </Checkbox>
                          )
                        )}
                  </Flex>
                </CheckboxGroup>
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              isDisabled={checkedUsers.length === 0}
              onClick={() => handleSubmit()}
              colorScheme="facebook">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
