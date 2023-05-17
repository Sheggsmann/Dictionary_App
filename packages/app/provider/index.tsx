import { QueryClient, QueryClientProvider } from 'react-query';
import { NavigationProvider } from './navigation';
import { SafeArea } from './safe-area';
import { ThemeContextProvider } from './theme';

const queryClient = new QueryClient();

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SafeArea>
      <NavigationProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeContextProvider>{children}</ThemeContextProvider>
        </QueryClientProvider>
      </NavigationProvider>
    </SafeArea>
  );
}
