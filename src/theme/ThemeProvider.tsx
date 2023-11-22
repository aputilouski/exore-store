import { MantineProvider } from '@mantine/core';
import { theme } from './mantine-theme';
import './tailwind.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <MantineProvider theme={theme}>{children}</MantineProvider>
);

export default ThemeProvider;
