import { BaseNode } from '../components/BaseNode';
/*
* this is a simple timmer to use in the work flow 
*/
export const TimerNode = ({ id, data }) => {

  return (
    <BaseNode
          id={id}
          data={data}
          heading="Timer"
          description="Run a Timmer"
          num_of_target={1}
          num_of_source={1}
          inputs={[
            {
              "key": "timer",
              "type": "countdown",
              "label": "Timer (seconds):",
            },
          ]}
          functions={{
            timer: {
              getDefault: () => 0,
            },
          }}
        />
  );
};
