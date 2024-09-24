This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

Here’s the complete answer formatted properly for a README file:

## Running iOS Code on M1 Macs

To ensure compatibility with M1 Macs when running iOS code, follow these steps:

### 1. Install Rosetta 2 (if not installed)
Some dependencies still require Rosetta 2 for compatibility with x86 architecture:

```bash
softwareupdate --install-rosetta
```

### 2. Update React Native to the Latest Version
Ensure you're using the latest stable version of React Native to prevent compatibility issues:

```bash
npm install react-native@latest
```

### 3. Modify the Podfile for Apple Silicon Support
Open the `ios/Podfile` and add the following lines to exclude the `arm64` architecture for iOS simulators on M1 Macs:

```ruby
platform :ios, '11.0'

post_install do |installer|
  installer.pods_project.build_configurations.each do |config|
    config.build_settings['EXCLUDED_ARCHS[sdk=iphonesimulator*]'] = 'arm64'
  end
end
```

This prevents the build from targeting `arm64` architecture for the iOS simulator.

### 4. Install iOS Dependencies Using CocoaPods
Navigate to the `ios` directory and run:

```bash
cd ios
arch -x86_64 pod install
```

This ensures that CocoaPods runs under Rosetta, which may still be required for some dependencies.

### 5. Configure Xcode for M1 Compatibility
- Open your project in Xcode by navigating to `ios/<YourProjectName>.xcworkspace`.
- In **Build Settings**, search for **Excluded Architectures**.
- Ensure that `arm64` is added under **Any iOS Simulator SDK** to prevent simulator issues on M1.

### 6. Run the App on the iOS Simulator
Finally, run the app using the following command:

```bash
npx react-native run-ios
```

This will launch the iOS simulator and run your app. Make sure that everything works as expected on both Intel and M1 Macs.


## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

## Step 3: Change Questions

You can add and remove questions, and you can also add or change options from the store.

1. Naviage to src>store>QuestionSice 
2. In the initial state, there is a state for the questions array. We can populate the questions using any API, but currently, they are loaded statically.


### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

