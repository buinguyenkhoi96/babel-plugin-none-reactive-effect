import useStateMixAlias from 'use-none-reactive-state';
import testSomething from 'test-something';
import { useState } from 'react';

const TestComponent = () => {
  const [stateWithMix, setStateWithMix] = useStateMixAlias();
  const [test1, setTest1] = useState();
  const doSomething = (param) => {};

  const doSomething1 = useMemo(() => {
    stateWithMix
  }, []);

  useEffect(() => {
    domeSomething({ stateWithMix });
    testSomething(stateWithMix);
    doSomething1();
  }, [test1]);

  return <div>{stateWithMix}</div>;
};

export default TestComponent;