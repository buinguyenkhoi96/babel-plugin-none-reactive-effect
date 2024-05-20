
  

## Introduction

  
While working on a project that need to deal with different sockets at the same time. I had a several issues with handle reactive/non-reactive value in useEffect | useCallback | useMemo with React, in differents usecase reactive value can become non-reactive and vice versa. Take a look at [this react offical document](https://react.dev/learn/separating-events-from-effects#extracting-non-reactive-logic-out-of-effects) for further explaination

## Installation
With [npm](https://www.npmjs.com):

```sh
npm install --save-dev babel-preset-env
```

Or [yarn](https://yarnpkg.com):

```sh
yarn add babel-preset-env --dev
```

after install add it as the first plugin in your babel configuration

```json
{ "plugins": ["babel-plugin-none-reactive-effect"] },
```

## How it work under the hood?

Basically this plugin will look for the value and depedencies that being used inside useEffect | useMemo | useCallback. If the value is from [use-none-reactive-state](https://www.npmjs.com/package/use-none-reactive-state) and wasn't included in depedencies list, it's gonna replace with that one with ref value from <b>useNoneReactiveState</b>


### Examples

#### Before transpiled

  

```jsx

import useNoneReactiveState from  'use-none-reactive-state';
import { useState } from 'react';

function  Component() {

  const [theme, setTheme] = useState('dark');
  const [noneReactiveTheme, setNoneReactiveTheme] = useNoneReactiveState('dark');

  useEffect(() => {
   // theme here is a reactive value, whenever theme changed the connection is reconnected, if u remove theme the callback inside connection wont get the latest value
    connection.onConnect(() =>  console.log(theme));
    return () => connection.disconnect();
  }, [theme]);

  useEffect(() => {
   // with noneReactiveTheme from useNoneReactiveState, u could still get the latest value without have to run the cleanup when noneReactiveTheme is changed
    connection.onConnect(() =>  console.log(noneReactiveTheme));
    return () => connection.disconnect();
  }, []);

  useEffect(() => {
    console.log(noneReactiveTheme);
    return () => {
      console.log('nonReactiveTheme become reactive');
    };
  // If you want, you can put the value into dependencies list and it works normally like normal useState.
  }, [nonReactiveTheme])

  const reactiveCallback = useCallback|useMemo(() => {
  // Theme change, reference change(it might not need to be like that all the time)
    console.log(theme);
  }, [theme]);

  const reactiveCallback = useCallback|useMemo(() => {
  // noneReactiveTheme changed, reference wont change(better optimization)
    console.log(noneReactiveTheme);
  }, []);
}

```

  

#### After transpiled

  

```jsx

import useNoneReactiveState from  'use-none-reactive-state';
import { useState } from 'react';

function  Component() {

  const [theme, setTheme] = useState('dark');
  const [noneReactiveTheme, setNoneReactiveTheme, noneReactiveThemeRef] = useNoneReactiveState('dark');

  useEffect(() => {
   // theme here is a reactive value, whenever theme changed the connection is reconnected, if u remove theme the callback inside connection wont get the latest value
    connection.onConnect(() =>  console.log(theme));
    return () => connection.disconnect();
  }, [theme]);

  useEffect(() => {
   // with noneReactiveTheme from useNoneReactiveState, u could still get the latest value without have to run the cleanup when noneReactiveTheme is changed
    connection.onConnect(() =>  console.log(noneReactiveThemeRef.current));
    return () => connection.disconnect();
  }, []);

  useEffect(() => {
    console.log(nonReactiveTheme)
    return () => {
      console.log('nonReactiveTheme become reactive');
    };
  // If you want, you can put the value into dependencies list and it works normally like normal useState.
  }, [nonReactiveTheme])

  const reactiveCallback = useCallback|useMemo(() => {
  // Theme change, reference change(it might not need to be like that all the time)
    console.log(theme);
  }, [theme]);

  const reactiveCallback = useCallback|useMemo(() => {
  // noneReactiveTheme changed, reference wont change(better optimization)
    console.log(noneReactiveThemeRef.current);
  }, []);
}

```

#### Note
I'm working on the transformation on JSX element and it's gonna be available soon.


