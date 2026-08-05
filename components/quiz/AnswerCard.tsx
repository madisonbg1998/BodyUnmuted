export default function AnswerCard({
  name,
  value,
  text,
  checked,
  onSelect,
  disabled,
}: {
  name: string;
  value: string;
  text: string;
  checked: boolean;
  onSelect: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <label
      style={{
        display: 'block',
        position: 'relative',
        cursor: disabled ? 'default' : 'pointer',
        marginBottom: '12px',
      }}
    >
      <input
        type="radio"
        className="sr-only-input"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onSelect(value)}
        disabled={disabled}
      />
      <div
        className="quiz-answer-card"
        style={{
          padding: '16px 20px',
          borderRadius: '12px',
          border: `1.5px solid ${checked ? '#525421' : 'rgba(206,150,90,0.3)'}`,
          backgroundColor: checked ? '#f1f3e2' : '#faf9f5',
          boxShadow: checked ? '0 2px 12px rgba(82,84,33,0.1)' : '0 2px 12px rgba(45,21,6,0.04)',
          transition: 'border-color 0.15s, background-color 0.15s, box-shadow 0.15s',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-inter-sans), sans-serif',
            color: '#2d1506',
            fontSize: '15px',
            lineHeight: '1.4',
          }}
        >
          {text}
        </p>
      </div>
    </label>
  );
}
