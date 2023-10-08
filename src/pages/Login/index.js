import React from "react";
import RightSideBar from "../../components/RightSideBar/index.js";
import { HStack, Box } from "@chakra-ui/react";

export default function Login() {
  return (
    <HStack align="right" w="ful">
      <Box flex="1"></Box>
      <RightSideBar></RightSideBar>
    </HStack>
  );
}
