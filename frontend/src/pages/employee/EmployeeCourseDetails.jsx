import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import learningService from '../../services/learningService';

const EmployeeCourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    const loadCourse = useCallback(async () => {
        try {
            const res = await learningService.getCourseById(id);
            setCourse(res.data);
        } catch (error) {
            console.error('Error loading course:', error);
        }
    }, [id]);

    useEffect(() => {
        loadCourse();
    }, [loadCourse]);

    if (!course) return <p>Loading...</p>;

    return (
        <div>
            <h2>{course.courseTitle}</h2>
            <p>{course.description}</p>
            <p>Instructor: {course.instructor}</p>
            <p>Category: {course.category}</p>
            <p>Duration: {course.durationHours} hrs</p>
            <p>Difficulty: {course.difficultyLevel}</p>
            <p>Modules: {course.totalModules}</p>
            <p>Passing Score: {course.passingScore}</p>
        </div>
    );
};

export default EmployeeCourseDetails;