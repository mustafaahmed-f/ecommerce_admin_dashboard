export default function QuickTransferSection({ className = "" }) {
  const people = [
    { name: "Livia Bator", role: "CEO" },
    { name: "Randy Press", role: "Director" },
    { name: "Workman", role: "Designer" },
  ];

  return (
    <div className={`rounded-xl bg-white p-4 shadow ${className}`}>
      <div className="flex h-full flex-col justify-between">
        <div>
          <h3 className="mb-4 text-lg font-bold">Quick Transfer</h3>
          <div className="flex gap-4">
            {people.map((p, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-gray-300"></div>
                <span className="mt-1 text-xs font-bold">{p.name}</span>
                <span className="text-xs text-gray-500">{p.role}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5">
          <div className="flex flex-wrap gap-2">
            <input
              placeholder="Write Amount"
              className="flex-1 rounded border px-3 py-2 text-sm"
            />
            <button className="rounded bg-blue-600 px-4 py-2 text-white max-sm:mx-auto">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
