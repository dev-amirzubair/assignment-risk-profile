import 'react-native-gesture-handler/jestSetup';

// Mock the required native modules
jest.mock('react-native', () => {
    const actualReactNative = jest.requireActual('react-native');

    return {
        ...actualReactNative,
        BackHandler: {
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        },
        NativeModules: {
            ...actualReactNative.NativeModules, // Ensure you keep the original NativeModules
            SettingsManager: {
                // For iOS
                settings: { AppleLocale: 'en_US' },
                // For Android
                getConstants: () => ({ settings: { locale: 'en_US' } }),
            },
            // Add other necessary mocks for native modules if needed
        },
    };
});

// Mock other required modules
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
