import { useEffect } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { useStore } from './store';
import ResponseDisplay from './components/ResponseDisplay';

function App() {
  useEffect(() => {
    useStore.getState().initializeFromLocalStorage();
  }, []);
  const showResponse = useStore((state) => state.showResponse);
  const response = useStore((state) => state.response);

  return (
    <div className='bg-radial-dark h-screen w-full flex flex-col'>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
      {showResponse && <ResponseDisplay response={response} /> }
    </div>
  );
}

export default App;
