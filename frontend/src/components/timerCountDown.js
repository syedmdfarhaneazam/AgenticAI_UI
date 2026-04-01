import { useState, useEffect } from 'react';
/*
* simple timer component for count down 
*/
export const TimerCountDown = () => {
  const [seconds, setSeconds] = useState('');
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  useEffect(() => {
    if (!isCountingDown || remainingSeconds <= 0) return;

    const interval = setInterval(() => {
      setRemainingSeconds(prev => {
        if (prev <= 1) {
          setIsCountingDown(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isCountingDown, remainingSeconds]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && seconds > 0) {
      setRemainingSeconds(parseInt(seconds));
      setIsCountingDown(true);
      setSeconds('');
    }
  };

  return (
    <div>
      {!isCountingDown ? (
        <input
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter seconds"
          className="w-full p-1 mt-0.5 border rounded box-border border-muted focus:border-accent bg-accent text-surface"
          style={{ width: '100%', padding: '5px', marginTop: '2px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
        />
      ) : (
        <div style={{ padding: '5px', marginTop: '2px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '4px' }}>
          {remainingSeconds}s
        </div>
      )}
    </div>
  );
};
