import { useEffect } from 'react';

const SampleComponent = () => {
  const [state1, setState1] = useState(0);
  const [state2, setState2] = useState(0);
  const [state3, setState3] = useState(0);
  const [state4, setState4] = useState(0);

  useEffect(() => {
    console.log(state2);
    console.log(state3);
    console.log(state4);
  }, [state1]);
};

// Expected to be transformed to:
// const SampleComponent = () => {
//   const [state1, setState1] = useState(0);
//   const [state2, setState2, state2Ref] = useStateMix(0);
//   const [state3, setState3, state3Ref] = useStateMix(0);
//   const [state4, setState4, state4Ref] = useStateMix(0);

//   useEffect(() => {
//     console.log(state2Ref.current);
//     console.log(state3Ref.current);
//     console.log(state4Ref.current);
//   }, [state1]);
// };

export default SampleComponent;