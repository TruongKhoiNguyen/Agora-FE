/* eslint-disable react/prop-types */
import { Flex, Text, Tooltip, Image } from '@chakra-ui/react';

import moment from 'moment';

export default function CurrUserMessage({ message, scrollRef }) {
  const getTimeStamp = () => {
    const time = moment(message.createdAt).format('h:mm a DD/MM/YYYY');
    return time.toString();
  };

  return (
    <Flex
      flexDir="column"
      ref={scrollRef}
      pr={4}
      pt={1}
      w="100%"
      justifyContent="flex-end"
      alignItems="flex-end">
      <Tooltip label={getTimeStamp()} bg="gray.500" aria-label="A tooltip">
        <>
          <Text maxW="60%" bg="blue.300" borderRadius="2xl" px={4} py={1}>
            {message.content}
          </Text>
          <Flex flexDir="column">
            {message.images.map((image, index) => {
              return (
                <Tooltip
                  loading="lazy"
                  key={index}
                  placement="left"
                  label={getTimeStamp()}
                  bg="gray.500"
                  aria-label="A tooltip">
                  <Image w="fit-content" maxBlockSize={300} src={image} borderRadius="2xl" />
                </Tooltip>
              );
            })}
          </Flex>
        </>
      </Tooltip>
    </Flex>
  );
}
