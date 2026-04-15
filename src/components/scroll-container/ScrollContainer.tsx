import { Box } from 'hootsuite-bento';

export function ScrollContainer({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <Box
      attributes={{
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
        },
      }}
    >
      {children}
    </Box>
  );
}
