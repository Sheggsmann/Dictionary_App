import { NativeNavigation } from 'app/navigation/native';
import { Provider } from 'app/provider';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <Provider>
      <NativeNavigation />
    </Provider>
  );
}
