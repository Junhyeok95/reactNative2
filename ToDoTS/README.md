# START

```
npx react-native run-ios
npx react-native run-android
```

## install

---

```
npm i
```

> tsconfig.json 생성

```
npm i -D typescript @types/react @types/react-native
```

> RN은 기본적으로 ESLint가 설치되어 있음

```
npm i -D eslint
```

> RN은 기본적으로 .eslintrc.js가 존재

```
npx eslint --init
> 3번 (style)     * 자동수정
> 1번 (esm)       * RN은 주로 import/export
> 1번 (react)     * 리액트
> 우측 (Yes)      * 타입스크립트
> 2번 (Node)      * RN은 노드환경
> 2번 (prompt)    * 나만의 스타일
> 1번 (JS)        * 덮어쓰기
> 1번 (Tabs)
> 1번 (double)
> 1번 (unix)
> 우측 (Yes)      * 세미콜론
```

> .eslintrc.js 수정

```
npm i -D eslint-plugin-react @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react-hooks
npm i -D eslint-plugin-react @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react-hooks prettier eslint-plugin-prettier husky lint-staged
```
