/* eslint-disable react/prop-types */
import {
  Box,
  ModalFooter,
  ModalHeader,
  Avatar,
  Flex,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Textarea,
  Image,
  SimpleGrid
} from '@chakra-ui/react';

import ImageUploading from 'react-images-uploading';

import { useState } from 'react';

import { AiOutlineUpload, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';

export default function CreatePost() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [images, setImages] = useState([]);
  const maxNumber = 69;

  const onChangeImagesData = (imageList) => {
    setImages(imageList);
  };

  const handleUpload = async () => {
    try {
      console.log('submit');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box w="100%" bg="white" rounded="md">
      <Flex alignItems="center" my={4}>
        <Avatar ml="0.8rem" size="sm" name={'test user'} />
        <Button onClick={onOpen} rounded="2xl" mx="0.8rem" w="100%" color="gray.600">
          Test user what do you think ?
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight="bold">Create your post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <Textarea id="content" name="content" type="text" placeholder="Content" />
            </FormControl>
            <ImageUploading
              multiple
              value={images}
              onChange={onChangeImagesData}
              maxNumber={maxNumber}
              dataURLKey="data_url">
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                dragProps
              }) => (
                <Box mt={4}>
                  <Button w="78%" mr="4" colorScheme="teal" onClick={onImageUpload} {...dragProps}>
                    <AiOutlineUpload />
                  </Button>
                  <Button colorScheme="red" w="18%" onClick={onImageRemoveAll}>
                    <AiOutlineDelete />
                  </Button>
                  <SimpleGrid overflowY="auto" columns={4} gap={2} mt={2}>
                    {imageList.map((image, index) => (
                      <Flex
                        justifyItems="center"
                        alignItems="center"
                        flexDirection="column"
                        key={index}
                        p={1}
                        border="1px"
                        borderRadius="md"
                        borderColor="gray.300">
                        <Image src={image['data_url']} alt="" boxSize="100" />
                        <Flex mt={1} gap={2} justifyContent="space-evenly">
                          <Button size="sm" onClick={() => onImageUpdate(index)}>
                            <AiOutlineEdit />
                          </Button>
                          <Button size="sm" onClick={() => onImageRemove(index)}>
                            <GrClose />
                          </Button>
                        </Flex>
                      </Flex>
                    ))}
                  </SimpleGrid>
                </Box>
              )}
            </ImageUploading>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleUpload} mx="auto" w="100%" colorScheme="blue">
              Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
