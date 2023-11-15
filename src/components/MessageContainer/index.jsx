/* eslint-disable react/prop-types */
import { useState } from 'react';

import { Flex } from '@chakra-ui/react';

import InfomationContainer from './InfomationContainer';
import InputContainer from './InputContainer';
import InformationSideBar from './InformationSideBar';

export default function MessageContainer({ currConversation }) {
  const [showInfomationSideBar, setShowInformationSideBar] = useState(true);
  const handleShowInformationSideBar = () => {
    setShowInformationSideBar(!showInfomationSideBar);
  };
  return (
    <Flex w="full">
      <Flex
        flex={1}
        bg="gray.100"
        h="99vh"
        borderRadius="xl"
        my="auto"
        flexDir="column"
        justifyContent="space-between">
        <InfomationContainer
          currConversation={currConversation}
          handleShowInformationSideBar={handleShowInformationSideBar}
        />
        <Flex flex={1} w="full" bg="white" borderRadius="xl" my={1}></Flex>
        <InputContainer />
      </Flex>
      {showInfomationSideBar ? <InformationSideBar /> : null}
    </Flex>
  );
}
