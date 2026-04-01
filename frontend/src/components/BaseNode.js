import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import FieldRenderer from './FieldRenderer';
/*
* HIGER ORDER COMPONENT
* this componnet shall be used in rendering all sor of nodes
* parameters: id , data , heading , description , num_of_target , num_of_source , inputs , functions , targetIds , sourceIds , getDynamicTargetIds
* it uses Feild rendere that dynamically renders the desired type of input
*/
export const BaseNode = ({ 
  id, 
  data, 
  heading = null, 
  description = "", 
  num_of_target = 0, 
  num_of_source = 0, 
  inputs = [], 
  functions = {}, 
  targetIds, 
  sourceIds, 
  getDynamicTargetIds 
}) => {
  const [form, setForm] = useState(() => {
    const initial = {};
    inputs.forEach(field => {
      let defaultValue = data?.[field.key];
      if (defaultValue === undefined) {
        if (functions[field.key]?.getDefault) {
          defaultValue = functions[field.key].getDefault(id);
        } else {
          defaultValue = '';
        }
      }
      initial[field.key] = defaultValue;
    });
    return initial;
  });

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (functions[key]?.onChange) {
      functions[key].onChange(value, id, data);
    }
  };

  const computedTargetIds = getDynamicTargetIds ? getDynamicTargetIds(form) : null;
  const targetIdsToUse = computedTargetIds || targetIds || Array.from({ length: num_of_target }, (_, i) => `${id}-target${i}` );
  const sourceIdsToUse = sourceIds || Array.from({ length: num_of_source }, (_, i) => `${id}-source${i}` );

  const targetHandles = targetIdsToUse.map((tid, i) => (
    <Handle
      key={tid}
      type="target"
      position={Position.Left}
      id={tid}
      style={{ top: `${(i + 1) / (targetIdsToUse.length + 1) * 100}%` }}
    />
  ));

  const sourceHandles = sourceIdsToUse.map((sid, i) => (
    <Handle
      key={sid}
      type="source"
      position={Position.Right}
      id={sid}
      style={{ top: `${(i + 1) / (sourceIdsToUse.length + 1) * 100}%` }}
    />
  ));

  return (
    <div className="w-77 border border-accentLight rounded-lg text-textPrimary backdrop-blur-xs shadow-purpleGlow p-0 bg-card bg-opacity-50">
      {targetHandles}
      {heading && (
        <div className="my-1.25 bg-accentLight p-2 rounded-tl-lg rounded-tr-lg">
          <span>{heading}</span>
        </div>
      )}
      {description && (
        <div className='p-4'>
          <span>{description}</span>
        </div>
      )}
      {inputs.map(field => (
        <FieldRenderer
          key={field.key}
          field={field}
          value={form[field.key]}
          onChange={(value) => handleChange(field.key, value)}
          nodeId={id}
        />
      ))}
      {sourceHandles}
    </div>
  );
};