export default function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="flex h-10 w-full rounded p-2 my-2 text-sm border-1 border-purple-300 focus:border-purple-400"
      {...props}
    />
  );
};