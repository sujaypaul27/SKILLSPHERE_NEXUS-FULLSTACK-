const StatCard = ({ label, value, sublabel, icon }) => {
    return (
        <div className="lm-stat-card">
            <div className="lm-stat-icon">{icon || '📊'}</div>
            <div>
                <div className="lm-stat-value">{value}</div>
                <div className="lm-stat-label">{label}</div>
                {sublabel && <div className="lm-stat-sub">{sublabel}</div>}
            </div>
        </div>
    );
};

export default StatCard;