import { BaseNode } from '../components/BaseNode';
/*
* this code is more sleek and understandable now
*/
export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      heading="LLM"
      description="This is a LLM."
      num_of_target={2}
      num_of_source={1}
      inputs={[]}
      functions={{}}
    />
  );
};