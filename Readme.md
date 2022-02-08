# 넘블 챌린지 [다른 색깔 찾기 게임]

## 상태관리 라이브러리 사용하지 않고 구현 하기

### GitHub Repository

https://github.com/jaewoong2/no-state-management-challenge/tree/master

### 프로젝트 바로가기

https://no-state-management-challenge.vercel.app/

![image](https://user-images.githubusercontent.com/63512217/152742656-42ae6333-e253-40b3-8e0b-b0c88747db89.png)

### 스타일 없는 프로젝트 바로가기

https://no-state-management-challenge.vercel.app/simple

![image](https://user-images.githubusercontent.com/63512217/152742923-0a6b48b1-d7b1-475c-b2d6-4af4c721c2f8.png)

## 상태 관리 없이?

- `App Component` 에서 `Props` 로 내려주는 `state` 들을 어떻게 최적화 하여 보내줄지 고민하게 되었다

### 시도 방법

- `React.memo(Component, PropsAreEqual)` 사용하기 ~~(실패)~~

  - `Header Component` 에서 매초 남은 시간을 카운트 다운 해줄 떄마다 `Board Component` 가 무의미하게 리렌더링 되었다.
  - `PropsAreaEqaul`을 사용해서 `Board Component` 의 무의미한 리렌더링을 방지 하고자 하였다.

    - `React.memo(Board, (prevProps, nextProps) => prevProps.stage === nextProps.stage)` `Board Component` 가 `stage가 바뀔 떄만 리렌더링 되게 하였다.`

  - 하지만, 리렌더링이 계속해서 되었다. 이유를 찾아보니 상위 컴포넌트의 리렌더링을 통한 자식 컴포넌트의 리렌더링은 막기 어렵다는 것이다. `(막는 방법이 있을 것 같긴 한데... 못찾음 )`

- `useReducer` 사용

  - 사실 `reducer` 보다 `useState` 를 통한 상태 관리가 익숙하고 편리한데, `reduecr` 를 사용 한 이유는, `Redux 와 같은 전역 상태 관리 라이브러리 를 사용하지 않기`가 이번 프로젝트의 목표 이기 떄문에 `Redux` 와 비슷한 패턴을 갖는 `useReducer` 를 사용 하면 상태 관리가 조금더 쉽지 않을까? 라는 생각에서 사용 하였다.

  - 컴포넌트들이 리렌더링 되는 것을 비교해보았는데, `useState` 를 통한 상태관리와 별 차이는 없었던 것 같다.

  - 장점: 이번 프로젝트는 `App Component` 에서 모든 상태를 내려주어야 하는데 `useState` 를 통한 상태관리는 `App.tsx`의 코드를 무의미하게 길어지게 만들었다.

  - 단점: `reduecr` 파일을 따로 만들어야 하고, 조금 더 편하게 관리 하기 위해서 `reducer` 의 코드가 무의미하게 길어지는 경향이 있다.

### 리팩토링 하며 알게된 부분

- React.Fragment `<></>` 사용 VS 기존 Html Element 사용 `<main></main>`

  - React.Fragment 를 사용 하여 각각 컴포넌트를 감쌌을 때,
    ![re-rendering-with-react fragment](https://user-images.githubusercontent.com/63512217/152949731-a1e2e00d-3e7a-42de-8ee8-7cda20a95792.gif)

    남은시간이 매초 변경 됨에 따라서 각각 컴포넌트가 모두 리랜더링 된다.

  - `<main></main>` 컴포넌트로 감싸 줬을 때,
    ![Re-rendering-with-main](https://user-images.githubusercontent.com/63512217/152949380-e3cfb21c-8ef9-4333-aa90-b817de7b9510.gif)

    남은시간이 매초 변경 됨에 따라서 각각 컴포넌트가 리랜더링 되는 대신에,
    `<main></main>` 컴포넌트만 리랜더링 된다.

    - `<Header />` 컴포넌트는 시간에 따라 바뀌어야 하기 때문에 정상적인 리렌더링

  <br />
  결론: main 컴포넌트 하나만 리렌더링이 되는게 좋은 것인지, 모든 하위 컴포넌트가 리렌더링 되는 것이 좋은 것인지 모르겠으나, 각 컴포넌트가 비용이 많이 든다면, React Fragment를 사용하지 않는 것이 좋은 것 같다.

## 주요로직

### 색상 관련 코드

```ts
// @utils/index.ts
export const getColor = ({
  r,
  g,
  b,
  a,
  weight,
}: {
  r: number;
  g: number;
  b: number;
  a: number;
  weight: number;
}) => {
  return `rgba(${r + weight}, ${g + weight}, ${b + weight}, ${a})`;
};

export const getRandomColor = (num: number) =>
  num > 1 ? Math.floor(Math.random() * num) : Math.random() * num;

export const getRgba = () => ({
  r: getRandomColor(255),
  g: getRandomColor(255),
  b: getRandomColor(255),
  a: getRandomColor(0.7) + 0.3,
});
```

- `getColor` 는 `rgba()` 값으로 변경시켜주는 코드
- `getRandomColor` 는 `0 ~ 255` 의 무작위 값을 반환 시켜주는 코드
- `getRgba` 는 `rgba` 값을 객채화 시켜주는 코드
  - `<Boards />` 의 `color State` 에 사용 위함

```tsx
// @components/Boards/Boards.tsx

useEffect(() => {
  setColor({ ...getRgba(), weight: 100 - stage ** 0.7 * 6 });
}, [stage]);
```

- `stage` 가 변경될 때마다 랜덤 `rgba` 값을 얻는다.
- `stage가` 높아질 수록,`weight가` 줄어들면서 스테이지가 높을 수록 더욱더 찾기 어렵게 된다.

```tsx
// @utils/index.ts
export const getNumbers = (stage: number) => {
  const col = Math.round((stage + 0.5) / 2) + 1;
  const area = Math.pow(col, 2);
  const answer = Math.floor(Math.random() * area);

  return {
    col,
    area,
    answer,
  };
};

// @components/Boards/Boards.tsx
const { col, answer, area } = useMemo(() => getNumbers(stage), [stage]);
```

- `stage` 에 따른 `col: 가로 사각형 갯수`, `area: 전체 사각형 갯수`, `answer: 정답 index` 를 얻는다.

```tsx
// @components/Boards/Boards.tsx

const boardStyle = useCallback(
  (isAnswer: boolean): React.CSSProperties => ({
    backgroundColor: isAnswer
      ? `${getColor(color)}`
      : `${getColor({ ...color, weight: 0 })}`,
  }),
  [color]
);

const boardWrapperStyle = useMemo(
  (): React.CSSProperties => ({
    gridTemplateColumns: `repeat(${col}, 1fr)`,
  }),
  [col]
);
```

- `stage` 에 따른 `style` 를 반환 해준다.

## 코드 내에서 고려한 특정 유저 행동과 그에 대한 대처

```tsx
weight: 100 - stage ** 0.7 * 6,
```

처음에는 `weight` 값을 `100 - stage` 로 했었는데, stage의 변화에 따라서 난이도가 눈에 띄게 변화하지 않았다.

`stage` 의 변화에 따라서 난이도를 올리 되, 정답을 잘 맞추는 유저의 경우 `weight` 값이 음수가 되는 것을 막기 위해서 `100 - stage ** 0.7 * 6` 값으로 하여 초반에 깰 때는 난이도를 올리다가, 어느정도 되면 난이도가 쉽게 바뀌지 않을 정도로 하였다.

## 활용한 라이브러리와 그 이유

- 활용한 라이브러리는 없으나 `useReducer`의 훅을 사용 하였다. 이유는 앞서 작성한 것과 같다.

## 프로젝트를 진행할 때 어려웠던 점/고민했던 부분과 해결방법

- 프로젝트를 진핼 할 때, `Board Component` 의 불필요한 리렌더링을 어떻게 막을지가 가장 고민하였던 부분이다.

- 앞서 작성 하였듯, 해결하지는 못했지만 많은 방법등을 사용해보았던 점에서 많은 경험을 하게 되었고 `관심 컴포넌트 분리화`, `전역 상태 관리 라이브러리` 등이 왜 필요하게 되었는지 깨닫게 되었다.

  - `관심 컴포넌트 분리화` : 상위 컴포넌트에서 리렌더링 하면 하위 컴포넌트도 영향을 받기 때문에 최대한 분리화를 시켜서 불필요한 리렌더링을 막아야 한다.

  - `전역 상태 관리 라이브러리 사용`: 상위컴포넌트에서 `props` 를 내리는 횟수를 줄이고, 유동적으로 상태를 관리를 함으로써 리렌더링을 막기 위함
