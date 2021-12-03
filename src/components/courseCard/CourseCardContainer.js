import React from 'react';
import { useGetCourses } from '../../query';
import CourseCard from './CourseCard';
import styles from './CourseCard.module.css';
import { useNavigate } from 'react-router-dom';
import routes from '../../constants/routes';
import { CircularProgress } from '@mui/material';

const CourseCardContainer = () => {
  const { data, isLoading, isError } = useGetCourses();
  const navigate = useNavigate();

  const onCourseClick = (courseId) => navigate(`${routes.Courses}${courseId}`);

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  } else if (isError) {
    return <div>An unkown error has occured</div>;
  } else if (data.length === 0) {
    return <div>No courses were found</div>;
  }

  const coursesJSX = data.map(({ courseName, id }) => (
    <CourseCard
      courseName={courseName}
      key={id}
      onClick={() => onCourseClick(id)}
    />
  ));

  return <div className={styles.cardsContainer}>{coursesJSX}</div>;
};

CourseCardContainer.propTypes = {};

export default CourseCardContainer;
