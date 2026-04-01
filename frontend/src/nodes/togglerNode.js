import { BaseNode } from '../components/BaseNode';
/*
* this is a simple toggler to use in the work flow 
*/
export const TogglerNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      heading="Boolean"
      description=""
      num_of_target={1}
      num_of_source={1}
      inputs={[
        {
          "key": "toggle",
          "type": "toggle",
          "label": "Toggle:",
        },
      ]}
      functions={{
        toggle: {
          getDefault: () => false,
        },
      }}
    />
  );
};
