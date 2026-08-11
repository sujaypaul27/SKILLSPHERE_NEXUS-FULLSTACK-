import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import learningService from '../../services/learningService';
import enrollmentService from '../../services/enrollmentService';
import certificateService from '../../services/certificateService';
import CourseCard from '../../components/learning/CourseCard';
import CertificateModal from '../../components/learning/CertificateModal';

const EmployeeLearning = () => {
    const { user } = useAuth();
    const employeeId = user?.employeeId || user?.id;

    const [courses, setCourses] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [certModalEnrollmentId, setCertModalEnrollmentId] = useState(null);

    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [coursesRes, enrollRes] = await Promise.all([
                learningService.getAllCourses(),
                enrollmentService.getByEmployeeId(employeeId),
            ]);
            setCourses(coursesRes.data);
            setEnrollments(enrollRes.data);
        } catch (err) {
            setError('Failed to load learning data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (employeeId) loadData();
    }, [employeeId]);

    const handleEnroll = async (courseId) => {
        try {
            await enrollmentService.create({ employeeId, courseId });
            loadData();
        } catch (err) {
            alert('Enrollment failed.');
        }
    };

    const handleContinue = (enrollment) => {
        alert(`Progress: ${enrollment.progressPercentage}% - ${enrollment.completionStatus}`);
    };

    const handleCertificate = (enrollmentId) => {
        setCertModalEnrollmentId(enrollmentId);
    };

    if (loading) return <p>Loading courses...</p>;
    if (error) return <p>{error}</p>;
    if (courses.length === 0) return <p>No courses found.</p>;

    return (
        <div>
            <h2>My Learning</h2>
            <div className="course-grid">
                {courses.map((course) => {
                    const enrollment = enrollments.find((e) => e.courseId === course.id);
                    return (
                        <CourseCard
                            key={course.id}
                            course={course}
                            enrollment={enrollment}
                            onEnroll={handleEnroll}
                            onContinue={handleContinue}
                            onCertificate={handleCertificate}
                        />
                    );
                })}
            </div>
            {certModalEnrollmentId && (
                <CertificateModal
                    enrollmentId={certModalEnrollmentId}
                    onClose={() => setCertModalEnrollmentId(null)}
                />
            )}
        </div>
    );
};

export default EmployeeLearning;