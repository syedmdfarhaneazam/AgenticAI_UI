import { useEffect, useRef, useState } from 'react';
import { TimerCountDown } from './timerCountDown';
import { useStore } from '../store';
import { MarkerType } from 'reactflow';
/*
* HIGHER ORDER COMPONENT
* this component will be displaying the desired type of input feilds
* also handel the changes in it
* it also dynamically checks for SQL INJECTIONS 
* it can be used for input feilds validation
* it also has custom styles for each type of input
*/
const FieldRenderer = ({ field, value, onChange, nodeId }) => {
  const textareaRef = useRef(null);
  const [isInvalid, setIsInvalid] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [tagStart, setTagStart] = useState(-1);
  const [currentQuery, setCurrentQuery] = useState('');

  const checkSQLInjection = (input) => {
    // here i will be cheking the sql injection patterns
    if (typeof input !== 'string') return false;
    const sqlInjectionPatterns = [
      /(\b(UNION|SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|SCRIPT)\b)/gi,
      /(-{2}|\/\*|\*\/|;)/,
      /['"]/
    ];
    return sqlInjectionPatterns.some(pattern => pattern.test(input));
  };

  const handleVariableChange = (e) => {
    const newValue = e.target.value;
    const cursor = e.target.selectionStart;

    // adjust height like textarea
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;

    // check for SQL injection
    if (checkSQLInjection(newValue)) {
      console.warn('Potential SQL injection detected:', newValue);
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }

    // detect open '{{'
    let inTag = false;
    let start = -1;
    let query = '';
    for (let i = cursor - 1; i >= 0; i--) {
      if (newValue.substring(i, i + 2) === '{{') {
        const substr = newValue.substring(i, cursor);
        if (!substr.includes('}}')) {
          inTag = true;
          start = i;
          query = newValue.substring(i + 2, cursor);
          break;
        }
      }
    }

    const nodes = useStore.getState().nodes;
    const available = nodes.filter(n => n.id !== nodeId && n.id.toLowerCase().includes(query.toLowerCase()));
    setSuggestions(available);
    setShowSuggestions(inTag && available.length > 0);
    setTagStart(start);
    setCurrentQuery(query);

    onChange(newValue);
  };

  const handleSelect = (selectedId) => {
    // replace the open tag with '{{Id}}'
    const replaceStart = tagStart;
    const replaceEnd = tagStart + 2 + currentQuery.length;
    const newText = value.substring(0, replaceStart) + `{{${selectedId}}}` + value.substring(replaceEnd);

    onChange(newText);
    setShowSuggestions(false);

    // create the edge
    const state = useStore.getState();
    const connection = {
      source: selectedId,
      sourceHandle: `${selectedId}-output`,
      target: nodeId,
      targetHandle: selectedId,
      type: 'smoothstep',
      animated: true,
      markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px' }
    };
    state.onConnect(connection);
  };

  const handleChange = (e) => {
    let newValue = e.target.value;
    if (field.type === 'textarea' || field.type === 'BigTextarea') {
      e.target.style.height = 'auto';
      e.target.style.height = `${e.target.scrollHeight}px`;
    }
    // check for vulanarable input
    if (checkSQLInjection(newValue)) {
      console.warn('Potential SQL injection detected:', newValue);
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
    
    onChange(newValue);
  };

  useEffect(() => {
    if (textareaRef.current && (field.type === 'textarea' || field.type === 'BigTextarea' || field.type === 'variabletext')) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, field.type]);

  // here i will be runing a switch case for each type of input given by the parent component
  switch (field.type) {
    case 'variabletext':
      return (
        <div className="m-2.5 relative min-w-[200px]">
          <label className="text-xs font-bold text-muted">
            {field.label}
            {field.required && <span className="text-negative ml-0.5">*</span>}
          </label>
          <div className="relative w-full">
            {/* Highlight layer */}
            <div className="absolute inset-0 pointer-events-none whitespace-pre-wrap p-1 mt-0.5 border rounded box-border text-textPrimary">
              {value.split(/(\{\{.*?\}\})/).map((part, i) =>
                part.startsWith("{{") && part.endsWith("}}") ? (
                  <span key={i} className="bg-primary text-muted rounded-lg px-1">{part.substring(2, part.length - 2)}</span>
                ) : (
                  part
                )
              )}
            </div>
            <textarea
              ref={textareaRef}
              value={value || ""}
              onChange={handleVariableChange}
              placeholder={field.label}
              className="w-full p-1 mt-0.5 border rounded box-border overflow-hidden resize-none min-h-[20px] bg-transparent text-transparent caret-white relative"
              rows={1}
            />
          </div>

          {showSuggestions && (
            <div className="absolute z-10 bg-secondary border border-gray-300 mt-1 max-h-40 overflow-auto w-full rounded">
              <ul>
                {suggestions.map(node => (
                  <li
                    key={node.id}
                    onClick={() => handleSelect(node.id)}
                    className="p-2 hover:bg-accent cursor-pointer text-sm"
                  >
                    {node.type} ({node.id})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    case 'textarea':
    case 'BigTextarea':
      return (
        <div className="m-2.5">
          <label className="text-xs font-bold text-muted">
            {field.label}
            {field.required && <span className="text-negative ml-0.5">*</span>}
          </label>
          <textarea
            ref={textareaRef}
            value={value || ''}
            onChange={handleChange}
            placeholder={field.label}
            className={`w-full p-1 mt-0.5 border rounded box-border overflow-hidden resize-none min-h-[20px] ${isInvalid ? 'border-negative border-2 focus:border-negative' : 'border-muted focus:border-accent'} ${value ? 'bg-transparent text-textPrimary' : 'bg-accent text-surface'}`}
            rows={field.type === 'BigTextarea' ? 3 : 1}
          />
        </div>
      );
    case 'text':
      return (
        <div className="m-2.5">
          <label className="text-xs font-bold text-muted">
            {field.label}
            {field.required && <span className="text-negative ml-0.5">*</span>}
          </label>
          <input
            type="text" value={value || ''}
            onChange={handleChange}
            placeholder={field.label}
            className={`w-full p-1 mt-0.5 border rounded box-border ${isInvalid ? 'border-negative border-2 focus:border-negative' : 'border-muted focus:border-accent'} ${value ? 'bg-transparent text-textPrimary' : 'bg-accent text-surface'}`}
          />
        </div>
      );
    case 'dropdown':
      return (
        <div className="m-2.5">
          <label className="text-xs font-bold text-muted">
            {field.label}
            {field.required && <span className="text-negative ml-0.5">*</span>}
          </label>
          <select value={value || ''} onChange={handleChange} className={`w-full p-1 mt-0.5 border rounded box-border ${isInvalid ? 'border-negative border-2 focus:border-negative' : 'border-muted focus:border-accent'} ${value ? 'bg-secondary text-textPrimary' : 'bg-accent text-surface'}`}>
            <option value="">Select...</option>
            {field.options?.map((option) => (
              <option key={option.key} value={option.key}>
                {option.value}
              </option>
            ))}
          </select>
        </div>
      );
    // an extra date component
    case 'date':
      return (
        <div className="m-2.5">
          <label className="text-xs font-bold text-muted">
            {field.label}
            {field.required && <span className="text-negative ml-0.5">*</span>}
          </label>
          <input
            type="date"
            value={value || ''}
            onChange={handleChange}
            className={`w-full p-1 mt-0.5 border rounded box-border ${isInvalid ? 'border-negative border-2 focus:border-negative' : 'border-muted focus:border-accent'} ${value ? 'bg-secondary text-textPrimary' : 'bg-accent text-surface'}`}
          />
        </div>
      );
      // extra toggler component
    case 'toggle':
      return (
        <div className="m-2.5">
          <label className="text-xs font-bold text-muted">
            {field.label}
            {field.required && <span className="text-negative ml-0.5">*</span>}
          </label>
          <input
            type="checkbox"
            checked={value || false}
            onChange={(e) => onChange(e.target.checked)}
            className="appearance-none w-4 h-4 bg-secondary border border-muted rounded checked:bg-accent checked:border-accent relative checked:after:absolute checked:after:top-0.5 checked:after:left-0.5 checked:after:content-['\u2713'] checked:after:text-textPrimary checked:after:text-xs focus:outline-none cursor-pointer ml-1"
          />
        </div>
      );
      // extra timer component
    case 'countdown':
      return ( <div className="m-2.5"><TimerCountDown/></div> );
    default:
      return null;
  }
};

export default FieldRenderer;
