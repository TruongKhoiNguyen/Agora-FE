import { useRef } from 'react';

import { Button, Input, useToast } from '@chakra-ui/react';
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

import { AiOutlineEdit } from 'react-icons/ai';
import requestApi from '../../../../../utils/fetchData';
import useChatStore from '../../../../../hooks/useChatStore';

export default function ChangeConversationName() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const conversationNameRef = useRef();
  const currConv = useChatStore((state) => state.currConversation);

  const toast = useToast();

  const handleUpdateConversationName = async () => {
    if (conversationNameRef.current.value.length < 4) {
      return toast({
        title: 'Error.',
        description: 'Conversation name must be at least 4 characters.',
        status: 'error',
        position: 'bottom-right',
        duration: 9000,
        isClosable: true
      });
    }
    if (conversationNameRef.current.value.length > 20) {
      return toast({
        title: 'Error.',
        description: 'Conversation name must be less than 20 characters.',
        status: 'error',
        position: 'bottom-right',
        duration: 9000,
        isClosable: true
      });
    }
    try {
      await requestApi(`conversations/update-info/${currConv._id}`, 'PATCH', {
        name: conversationNameRef.current.value
      });
      onClose();
      conversationNameRef.current.value = '';
      toast({
        title: 'Success',
        description: 'Change conversation name successfully.',
        status: 'success',
        duration: 9000,
        position: 'bottom-right',
        isClosable: true
      });
    } catch (err) {
      toast({
        title: 'Error.',
        description: 'You cannot change conversation name.',
        status: 'info',
        position: 'bottom-right',
        duration: 9000,
        isClosable: true
      });
    }
  };

  return (
    <>
      <Button w="full" onClick={onOpen} leftIcon={<AiOutlineEdit />}>
        Change conversation name
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change conversation name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input ref={conversationNameRef} placeholder="Conversation's name..." />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="facebook" onClick={onClose} variant="outline">
              Close
            </Button>
            <Button colorScheme="facebook" ml={3} onClick={handleUpdateConversationName}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
