import { BaseNode } from '../components/BaseNode';
/* 
* this node will be used to select a date and pass it to other nodes
* this will have only othe left handeller to give in the required date
*/
export const DateNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      heading="Select Date"
      description=""
      num_of_target={0}
      num_of_source={1}
      inputs={[
        {
          "key": "date",
          "type": "date",
          "label": "Date:",
        },
      ]}
      functions={{
        date: {
          getDefault: () => '',
        },
      }}
      sourceIds={[`${id}-output`]}
    />
  );
};
