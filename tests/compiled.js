import useStateMix from 'useStateMix';
import { useState } from 'react';
const TestComponent = () => {
  const [stateWithMix, setStateWithMix, stateWithMixRef] = useStateMix();
  const [test1, setTest1] = useState();
  const doSomething = param => {};
  useEffect(() => {
    console.log(test1);
    doSomething(stateWithMix);
    console.log(stateWithMix);
  }, [test1]);

  // return <div>Test Component</div>;
};
export default TestComponent;
