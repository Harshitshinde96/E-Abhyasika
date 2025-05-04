export const CourseInfo = (courses) => {
  if (!courses || !Array.isArray(courses) || courses.length === 0) {
    return {
      ratingAvg: 0,
      ratingLength: 0
    };
  }

  const course = courses[0];
  return {
    ratingAvg: course.ratingAvg || 0,
    ratingLength: course.ratingLength || 0
  };
};
