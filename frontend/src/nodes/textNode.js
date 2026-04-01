import { BaseNode } from '../components/BaseNode';
import { useUpdateNodeInternals } from 'reactflow';
import { useEffect } from 'react';
/*
* i had to detec the number of variable used and
* then create custom number of left side handllers
*/
export const TextNode = ({ id, data }) => {
  const updateNodeInternals = useUpdateNodeInternals();
  useEffect(() => {
    updateNodeInternals(id);
  }, [data?.text, updateNodeInternals, id]);
  return (
    <BaseNode
      id={id}
      data={data}
      heading="Text"
      description="Enter the Context"
      inputs={[
        {
          "key": "text",
          "type": "variabletext",
          "label": "Text:",
        },
      ]}
      functions={{
        text: {
          getDefault: () => '{{input}}',
        },
      }}
      sourceIds={[`${id}-output`]}
      getDynamicTargetIds={(form) => {
        const text = form.text || '';
        const matches = text.matchAll(/\{\{([^}]+)\}\}/g);
        const variables = Array.from(matches, m => m[1].trim());
        return [...new Set(variables)];
      }}
    />
  );
};