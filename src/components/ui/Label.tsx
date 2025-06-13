export const Label = (props: React.LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label
      className="text-sm font-medium"
      {...props} />
  );
};