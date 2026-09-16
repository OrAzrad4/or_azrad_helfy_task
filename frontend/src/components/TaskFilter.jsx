const TaskFilter = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="task-filter">
      <label>Filter Tasks: </label>
      <select 
        value={currentFilter} 
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  );
};

export default TaskFilter;