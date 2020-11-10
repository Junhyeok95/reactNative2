# Start

```
npx react-native run-ios
npx react-native run-android
```

## Error

---

```
watchman watch-del-all
cd ios && xcodebuild clean && cd ..
cd android && ./gradlew cleanBuildCache && cd ..

rm -rf node_modules/ && npm cache clean --force && yarn cache clean && npm install && cd ios && pod install && cd .. && npm start -- --reset-cache
```

### Library

---

```
npm i -D typescript @types/react @types/react-native @types/styled-components babel-plugin-root-import @bam.tech/react-native-make @types/react-native-vector-icons

npm i -E react-native-maps

npm i -S styled-components @react-native-community/async-storage @react-navigation/native @react-navigation/stack react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view @react-navigation/compat @react-navigation/drawer @react-navigation/bottom-tabs @react-navigation/material-bottom-tabs react-native-paper

npm i -S react-native-vector-icons react-native-geolocation-service @react-native-community/geolocation react-native-ble-manager lottie-ios react-native-splash-screen lottie-react-native react-native-status-bar-height react-interval react-i18next i18next react-native-tts react-native-sound


```

### icon, splash

---

```
react-native set-icon --path ./src/Assets/Images/icon.png --background "#FFFFFF"
react-native set-splash --path ./src/Assets/Images/splash.png --resize cover --background "#FFFFFF"
```
