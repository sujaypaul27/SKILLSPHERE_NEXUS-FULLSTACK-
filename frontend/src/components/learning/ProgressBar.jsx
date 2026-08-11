
const ProgressBar = ({ percentage = 0 }) => {
    const value = Math.min(100, Math.max(0, percentage));
    return (
        <div style={{ background: '#e5e7eb', borderRadius: '6px', height: '8px', width: '100%' }}>
            <div
                style={{
                    width: `${value}%`,
                    background: '#4f46e5',
                    height: '100%',
                    borderRadius: '6px',
                    transition: 'width 0.3s ease',
                }}
            />
        </div>
    );
};

export default ProgressBar;