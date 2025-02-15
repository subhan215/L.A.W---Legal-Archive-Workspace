export default function CustomTextarea({ label, className = "", ...props }) {
    return (
      <div className="space-y-2">
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
        <textarea
          className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
          {...props}
        />
      </div>
    );
  }
  