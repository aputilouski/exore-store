import { Provider } from 'react-redux';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { store } from '@store';
import { ThemeProvider } from '@theme';
import RootRouter from './RootRouter';

const App = () => (
  <Provider store={store}>
    <ThemeProvider>
      <Notifications />
      <ModalsProvider>
        <RootRouter />
      </ModalsProvider>
    </ThemeProvider>
  </Provider>
);

export default App;
