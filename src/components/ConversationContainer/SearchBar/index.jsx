import React from 'react';

import {
  Flex,
  Heading,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  Button
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react';

import { AiOutlineSearch } from 'react-icons/ai';
import { BsPlusLg } from 'react-icons/bs';

export default function SearchBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new conversation</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button colorScheme="facebook" variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="facebook" variant="solid">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
