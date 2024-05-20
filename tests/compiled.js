import useStateMixAlias from 'use-none-reactive-state';
import testSomething from 'test-something';
import { useState } from 'react';
const TestComponent = () => {
  const [stateWithMix, setStateWithMix, stateWithMixRef] = useStateMixAlias();
  const [test1, setTest1] = useState();
  // const doSomething = (param) => {};

  const doSomething1 = useCallback(() => {
    stateWithMix;
  }, [stateWithMix]);

  // const doSomething2 = () => {
  //   stateWithMix
  // };

  useEffect(() => {
    // doSomething({ stateWithMix });
    testSomething(stateWithMixRef.current);
    // doSomething2();
  }, [test1]);
  return /*#__PURE__*/React.createElement("div", null, stateWithMix);
};
export default TestComponent;
