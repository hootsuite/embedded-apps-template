import { useHootsuite } from '@/context/useHootsuite';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Flex } from 'hootsuite-bento';
import { Paths } from '@/routes/routes';

export function Authorize(): React.ReactElement {
  const navigate = useNavigate();
  const { requestAuthorization, isAuthorizing, isAuthenticated } = useHootsuite();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(Paths.HOME);
    }
  }, [isAuthenticated]);

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center" padding="10" gap="6">
      <Box>
        You don't have a current Hootsuite token. Authorize with hootsuite to test authentication.
      </Box>
      <Button onClick={requestAuthorization} isLoading={isAuthorizing} isDisabled={isAuthenticated}>
        Authorize with Hootsuite
      </Button>
    </Flex>
  );
}
