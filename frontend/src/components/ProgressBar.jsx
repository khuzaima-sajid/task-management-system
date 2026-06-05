const ProgressBar = ({ percentage }) => (
  <div className="rounded-lg bg-white p-4 shadow-sm">
    <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
      <span>Completion Progress</span>
      <span>{percentage}%</span>
    </div>
    <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
      <div
        className="h-full rounded-full bg-blue-600 transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);

export default ProgressBar;
