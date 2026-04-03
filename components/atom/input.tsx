import { Dispatch, SetStateAction } from "react";

export default function Input({
  value,
  setValue,
  placeholder,
  className,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder?: string;
  className?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
}
