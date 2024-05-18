
## Introduction

This is the plugin to get rid of non-reactive dependencies in useEffect: https://react.dev/learn/separating-events-from-effects#extracting-non-reactive-logic-out-of-effects. 

For this plugin to work correctly you will have to install this package: https://www.npmjs.com/package/use-none-reactive-state

### How it transpile your code?

<b>Before transpiled</b>

```jsx
import useNoneReactiveState from 'use-none-reactive-state'

function Component() {
  const [theme, setTheme] = useNoneReactiveState('dark')

  useEffect(() => {
    connection.onConnect(() => console.log(theme))

    // If u add theme to deps list it will work like normal useState(when theme change, cleanup function is triggered)
  }, [])
}
```

<b>With [babel plugin](https://www.npmjs.com/package/babel-plugin-none-reactive-effect)</b>

```jsx
import useNoneReactiveState from 'use-none-reactive-state'

function Component() {
  const [theme, setTheme] = useNoneReactiveState('dark')

  useEffect(() => {
    connection.onConnect(() => console.log(theme))
  }, [])
}
```