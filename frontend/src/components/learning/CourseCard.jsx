const CourseCard = ({ course, onEnroll, onContinue, onCertificate, enrollment }) => {
    const status = enrollment?.completionStatus;

    return (
        <div className="course-card">
            <div className="course-card-banner">
                <span className="course-type-badge">{course.courseType}</span>
                {course.rating && (
                    <span className="course-rating-badge">★ {course.rating}</span>
                )}
            </div>

            <div className="course-card-body">
                <h3>{course.courseTitle}</h3>
                <p className="course-card-desc">{course.description}</p>

                <div className="course-meta-row">
                    <span>⏱ {course.durationHours}h</span>
                    <span>👤 {course.instructor}</span>
                    {course.category && <span>🏷 {course.category}</span>}
                </div>

                <div className="course-card-footer">
                    {enrollment && (
                        <span className={`course-status-pill ${status === 'COMPLETED' ? 'completed' : status === 'IN_PROGRESS' ? 'in-progress' : 'enrolled'}`}>
              {status === 'COMPLETED' ? 'Completed' : status === 'IN_PROGRESS' ? 'In Progress' : 'Enrolled'}
            </span>
                    )}
                    {!enrollment && <span />}

                    {!enrollment && (
                        <button className="course-btn enroll" onClick={() => onEnroll(course.id)}>Enroll</button>
                    )}

                    {enrollment && status !== 'COMPLETED' && (
                        <button className="course-btn continue" onClick={() => onContinue(enrollment)}>Continue</button>
                    )}

                    {enrollment && status === 'COMPLETED' && (
                        <button className="course-btn certificate" onClick={() => onCertificate(enrollment.id)}>Certificate</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseCard;