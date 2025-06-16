export default function PageContainer({
  children,
  classes,
}: {
  children: React.ReactNode,
  classes?: string,
 }) {
  return (
    <div className={`w-full px-4 py-16 sm:px-6 lg:px-8 ${classes}`}>
      {children}
    </div>
  );
}