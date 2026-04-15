import React from 'react';
import { Box, Flex, FormControl } from 'hootsuite-bento';
import { useHootsuite } from '@/context/useHootsuite';
import { ScrollContainer } from '../scroll-container/ScrollContainer';

export function Home(): React.ReactElement {
  const { appContext } = useHootsuite();

  function getConversationId() {
    if (appContext && 'conversationId' in appContext) {
      return appContext.conversationId;
    }
    return undefined;
  }

  return (
    <ScrollContainer>
      <Flex gap="4" flexDirection="column" padding="4">
        <Box typography="hs-sys-title-subsection">Inbox Context</Box>
        <FormControl>
          <FormControl.Label text="Conversation ID" />
          <FormControl.Field>{getConversationId()}</FormControl.Field>
        </FormControl>
        {appContext &&
          'contactAttributes' in appContext &&
          appContext.contactAttributes?.map((attribute) => (
            <FormControl key={attribute.alias as string}>
              <FormControl.Label text={attribute.alias as string} />
              <FormControl.Field>
                <Box
                  maxWidth="100%"
                  overflow="hidden"
                  attributes={{ style: { textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }}
                >
                  {attribute.value as string}
                </Box>
              </FormControl.Field>
            </FormControl>
          ))}
      </Flex>
    </ScrollContainer>
  );
}
