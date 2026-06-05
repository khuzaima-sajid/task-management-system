const statuses = ['All', 'Pending', 'In Progress', 'Completed'];

const SearchFilter = ({ search, setSearch, status, setStatus }) => {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <input
        type="text"
        placeholder="Search by title or description"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="mb-3 w-full rounded-md border border-slate-300 p-2 outline-none ring-blue-500 focus:ring"
      />
      <div className="flex flex-wrap gap-2">
        {statuses.map((item) => (
          <button
            key={item}
            onClick={() => setStatus(item)}
            className={`rounded-md px-3 py-1 text-sm ${
              status === item ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchFilter;
