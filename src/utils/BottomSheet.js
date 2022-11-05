import React from "react";
import { Actionsheet, Box } from "native-base";

export default function BottomSheet({ children, isOpen, onOpen, onClose }) {
  return (
    <Box>
      <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
        <Actionsheet.Content>{children}</Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
}
