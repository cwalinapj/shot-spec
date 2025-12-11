import { HomeScreen } from './screens/home/HomeScreen';
import { SelectModeScreen } from './screens/session/SelectModeScreen';
import { BagOverviewScreen } from './screens/bag/BagOverviewScreen';
import { MagicLoginScreen } from './screens/auth/MagicLoginScreen';
import { AuthProvider, useAuth } from './auth/AuthContext';

const Stack = createNativeStackNavigator();

const RootNavigator: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) return null; // TODO: splash

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user == null ? (
        <Stack.Screen name="MagicLogin" component={MagicLoginScreen} />
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SelectMode" component={SelectModeScreen} />
          <Stack.Screen name="BagOverview" component={BagOverviewScreen} />
          {/* later: Wallet, Opportunities screens, etc. */}
        </>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
