function StatusFilter({
  onFilter
}) {
  return (
    <div className="flex gap-3 mb-6">

      <button
        onClick={() => onFilter("")}
        className="px-4 py-2 bg-slate-200 rounded-lg"
      >
        All
      </button>

      <button
        onClick={() => onFilter("Open")}
        className="px-4 py-2 bg-blue-100 rounded-lg"
      >
        Open
      </button>

      <button
        onClick={() => onFilter("In Progress")}
        className="px-4 py-2 bg-yellow-100 rounded-lg"
      >
        In Progress
      </button>

      <button
        onClick={() => onFilter("Closed")}
        className="px-4 py-2 bg-green-100 rounded-lg"
      >
        Closed
      </button>

    </div>
  );
}

export default StatusFilter;