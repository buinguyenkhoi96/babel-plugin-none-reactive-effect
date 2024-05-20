import useStateMixAlias from 'use-none-reactive-state';
import testSomething from 'test-something';
import { useState } from 'react';
const TestComponent = () => {
  const [stateWithMix, setStateWithMix, stateWithMixRef] = useStateMixAlias();
  const [test1, setTest1] = useState();
  const doSomething = param => {};
  const doSomething1 = useMemo(() => {
    stateWithMixRef.current;
  }, []);
  useEffect(() => {
    domeSomething({
      stateWithMixRef.current
    });
    testSomething(stateWithMixRef.current);
    doSomething1();
  }, [test1]);
  return /*#__PURE__*/React.createElement("div", null, stateWithMix);
};
export default TestComponent;
