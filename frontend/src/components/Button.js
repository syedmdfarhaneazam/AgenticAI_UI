const Button = ({ variant = 'positive', children, onClick, ...props }) => {
  const baseStyles = {
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  };

  const variantStyles = {
    positive: {
      backgroundColor: '#10b981',
      color: '#ffffff',
      '&:hover': { backgroundColor: '#059669' },
    },
    negative: {
      backgroundColor: '#ef4444',
      color: '#ffffff',
      '&:hover': { backgroundColor: '#dc2626' },
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#ffffff',
      border: '1px solid #cbd5e1',
      '&:hover': { backgroundColor: '#f1f5f9', borderColor: '#94a3b8' },
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#475569',
      '&:hover': { backgroundColor: '#f1f5f9' },
    },
  };

  const selectedVariant = variantStyles[variant] || variantStyles.positive;
  const buttonStyles = { ...baseStyles, ...selectedVariant };
  const { '&:hover': _, ...finalStyles } = buttonStyles;

  return (
    <button
      style={finalStyles}
      onClick={onClick}
      onMouseEnter={(e) => {
        const hoverStyle = selectedVariant['&:hover'];
        if (hoverStyle) {
          Object.assign(e.target.style, hoverStyle);
        }
      }}
      onMouseLeave={(e) => {
        Object.assign(e.target.style, finalStyles);
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
