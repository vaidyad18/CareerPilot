const StepPersonal = ({ form, setForm }) => {
  if (!form) return null;

  return (
    <div
      className="py-8 px-8 bg-white rounded-2xl shadow-xl border border-gray-200 border-t-10"
      style={{ borderTopColor: "#2b7fff" }}
    >
      <p className="text-2xl font-bold text-gray-900">Personal Details</p>
      <p className="text-sm text-gray-500 mt-1">
        Add the key information about yourself.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mt-6">
        <div className="relative">
          <input
            type="text"
            value={form.title || ""}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 pt-5 pb-2 rounded-xl bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
          />
          <label className="absolute left-4 top-1 text-xs text-gray-600 peer-focus:text-blue-600 peer-focus:font-medium transition-all">
            Full Name
          </label>
        </div>

        <div className="relative">
          <input
            type="text"
            value={form.role || ""}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full px-4 pt-5 pb-2 rounded-xl bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
          />
          <label className="absolute left-4 top-1 text-xs text-gray-600 peer-focus:text-blue-600 peer-focus:font-medium transition-all">
            Job Role
          </label>
        </div>

        <div className="relative">
          <input
            type="text"
            value={form.contact || ""}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            className="w-full px-4 pt-5 pb-2 rounded-xl bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
          />
          <label className="absolute left-4 top-1 text-xs text-gray-600 peer-focus:text-blue-600 peer-focus:font-medium transition-all">
            Contact Number
          </label>
        </div>

        <div className="relative">
          <input
            type="email"
            value={form.email || ""}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 pt-5 pb-2 rounded-xl bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
          />
          <label className="absolute left-4 top-1 text-xs text-gray-600 peer-focus:text-blue-600 peer-focus:font-medium transition-all">
            Email
          </label>
        </div>

        <div className="relative sm:col-span-2">
          <input
            type="text"
            value={form.address || ""}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full px-4 pt-5 pb-2 rounded-xl bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
          />
          <label className="absolute left-4 top-1 text-xs text-gray-600 peer-focus:text-blue-600 peer-focus:font-medium transition-all">
            Address
          </label>
        </div>

        <div className="relative sm:col-span-2">
          <input
            type="text"
            value={form.links?.linkedin || ""}
            onChange={(e) =>
              setForm({ ...form, links: { ...form.links, linkedin: e.target.value } })
            }
            className="w-full px-4 pt-5 pb-2 rounded-xl bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
          />
          <label className="absolute left-4 top-1 text-xs text-gray-600 peer-focus:text-blue-600 peer-focus:font-medium transition-all">
            LinkedIn Profile URL
          </label>
        </div>

        <div className="relative sm:col-span-2">
          <input
            type="text"
            value={form.links?.github || ""}
            onChange={(e) =>
              setForm({ ...form, links: { ...form.links, github: e.target.value } })
            }
            className="w-full px-4 pt-5 pb-2 rounded-xl bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
          />
          <label className="absolute left-4 top-1 text-xs text-gray-600 peer-focus:text-blue-600 peer-focus:font-medium transition-all">
            GitHub URL
          </label>
        </div>

        <div className="relative sm:col-span-2">
          <input
            type="text"
            value={form.links?.portfolio || ""}
            onChange={(e) =>
              setForm({ ...form, links: { ...form.links, portfolio: e.target.value } })
            }
            className="w-full px-4 pt-5 pb-2 rounded-xl bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
          />
          <label className="absolute left-4 top-1 text-xs text-gray-600 peer-focus:text-blue-600 peer-focus:font-medium transition-all">
            Portfolio / Personal Website
          </label>
        </div>
      </div>
    </div>
  );
};

export default StepPersonal;
