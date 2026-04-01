import { BaseNode } from '../components/BaseNode';

export const OutputNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      heading="Output"
      description=""
      num_of_target={1}
      num_of_source={0}
      inputs={[
        {
          "key": "name",
          "type": "text",
          "label": "Name:",
        },
        {
          "key": "type",
          "type": "dropdown",
          "label": "Type:",
          "options": [
            { "key": "Text", "value": "Text" },
            { "key": "File", "value": "Image" }
          ],
        },
      ]}
      functions={{
        // we can even pass desirable funcitions here
        name: {
          getDefault: (id) => id.replace('customOutput-', 'output_'),
        },
        type: {
          getDefault: () => 'Text',
        },
      }}
    />
  );
};