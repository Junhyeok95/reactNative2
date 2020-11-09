# START

```
npx react-native run-ios
npx react-native run-android
```

# ERROR

```
watchman watch-del-all
cd ios && xcodebuild clean && cd ..
cd android && ./gradlew cleanBuildCache && cd ..

rm -rf node_modules/ && npm cache clean --force && yarn cache clean && npm install && cd ios && pod install && cd .. && npm start -- --reset-cache
```

## library

> 시작

---

```
npx react-native init ToDoTS2
```

> Styled Components

---

```
npm i -D styled-components
```

> TS, Babel, AsyncStorage \_\_ tsconfig.json 생성 \_\_ babel.config.js 수정

---

```
npm i -D typescript @types/react @types/react-native
npm i -D @types/styled-components
npm i -D babel-plugin-root-import
npm i -D @react-native-community/async-storage
```
