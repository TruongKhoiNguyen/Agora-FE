import { useState } from 'react';

import {
  Button,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Checkbox,
  CheckboxGroup,
  Avatar,
  Text,
  ModalFooter,
  useToast
} from '@chakra-ui/react';

import useChatStore from '../../../../../hooks/useChatStore';

import requestApi from '../../../../../utils/fetchData';

export default function AddConvMem() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const friends = useChatStore((state) => state.friends);
  const currConv = useChatStore((state) => state.currConversation);

  const [checkedUsers, setCheckedUsers] = useState([]);

  const handleSubmit = async () => {
    const resetModal = () => {
      setCheckedUsers([]);
      onClose();
    };

    try {
      await requestApi(`conversations/add-members/${currConv._id}`, 'PATCH', {
        members: checkedUsers
      });
      resetModal();
    } catch (err) {
      toast({
        title: 'Error',
        description: err.response.data.message,
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
  };

  return (
    <Flex my={2} w="full">
      <Button onClick={onOpen} colorScheme="facebook" w="full">
        Add new members
      </Button>

      <Modal size="lg" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Members</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mt={4}>
              <Box maxHeight={200} overflowY="auto">
                <CheckboxGroup colorScheme="facebook">
                  <Flex gap={4} flexDir="column" ml={4}>
                    {friends === null
                      ? null
                      : friends.map((user, index) =>
                          currConv.members.find((mem) => mem._id === user._id) ? null : (
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
