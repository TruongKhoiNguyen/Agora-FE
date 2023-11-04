import { Flex } from '@chakra-ui/react';

import InfomationContainer from './InfomationContainer';
import InputContainer from './InputContainer';

export default function MessageContainer() {
  return (
    <Flex
      bg="gray.100"
      w="full"
      h="99vh"
      borderRadius="xl"
      my="auto"
      flexDir="column"
      justifyContent="space-between">
      <InfomationContainer />
      <Flex></Flex>
      <InputContainer />
    </Flex>
  );
}
