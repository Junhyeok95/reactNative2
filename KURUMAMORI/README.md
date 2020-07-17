## library
```
npm i -D typescript @types/react @types/react-native
npm i -D @types/styled-components
npm i -D babel-plugin-root-import
npm i -D @bam.tech/react-native-make

npm i -E react-native-maps

npm i -S styled-components
npm i -S @react-native-community/async-storage
npm i -S @react-navigation/native
npm i -S react-native-reanimated react-native-gesture-handler
npm i -S react-native-screens react-native-safe-area-context @react-native-community/masked-view
npm i -S @react-navigation/compat @react-navigation/stack @react-navigation/drawer @react-navigation/bottom-tabs
npm i -S @react-navigation/material-bottom-tabs react-native-paper
npm i -S react-native-vector-icons
npm i -S react-native-geolocation-service @react-native-community/geolocation
npm i -S react-native-ble-manager
npm i -S react-native-splash-screen
npm i -S lottie-react-native lottie-ios@3.1.3
npm i -S react-native-status-bar-height
npm i -S react-interval
npm i -S react-i18next i18next
npm i -S react-native-tts
```

## clean
```
cd ios
xcodebuild clean
rm -rf ios/build
rm -rf ios/Pods

cd android
./gradlew clean
rm -rf android/build
rm -rf android/app/build
rm -rf android/.gradle

rm -rf node_modules
watchman watch-del-all

cd ios && pod install && cd ..
```

### tip
```
android -> app -> build.gradle
apply from: "../../node_modules/react-native/react.gradle" // 중복주의
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"

react-native set-icon --path ./src/Assets/images/app_icon.png --background "#FFFFFF"
react-native set-splash --path ./src/Assets/images/splash.png --resize cover --background "#FFFFFF"
#import "RNSplashScreen.h"  // here
[RNSplashScreen show];  // here  + 스토리보드 생성 SplashScreen
```