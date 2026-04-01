import { BaseNode } from '../components/BaseNode';
/* 
* here dynamically we display the input feilds
* this code is more sleak and manageble
* 
*/
export const InputNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      heading="Input"
      description=""
      num_of_target={0}
      num_of_source={1}
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
            { "key": "File", "value": "File" }
          ],
        },
      ]}
      functions={{
        name: {
          getDefault: (id) => id.replace('customInput-', 'input_'),
        },
        type: {
          getDefault: () => 'Text',
        },
      }}
    />
  );
};