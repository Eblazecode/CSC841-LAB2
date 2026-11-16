import Card from "../../components/ui/Card";
import StatusBadge from "../../components/ui/StatusBadge";
import Button from "../../components/ui/Button";

export default function CourseCard({ course, selected, alreadyRegistered, onSelect }) {
  const disabled = !course.available || alreadyRegistered;
  return <Card className="course-card">
    <div className="course-card-top"><span className="course-code">{course.code}</span><StatusBadge tone={course.available ? "green" : "amber"}>{course.available ? "Available" : "Closed"}</StatusBadge></div>
    <h3>{course.title}</h3>
    <p>{course.lecturer}</p>
    <div className="course-meta"><span>{course.units} units</span><span>{course.level} level</span><span>{course.semester} semester</span></div>
    <Button variant={selected ? "selected" : "secondary"} disabled={disabled} onClick={() => onSelect(course)}>
      {alreadyRegistered ? "Registered" : selected ? "Selected" : course.available ? "Select course" : "Unavailable"}
    </Button>
  </Card>;
}
