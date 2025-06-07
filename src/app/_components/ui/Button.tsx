const Button = ({ variant = 'primary', className = '', ...props }) => {
  const baseClasses = variant === 'primary'
    ? 'bg-purple-600 text-white hover:bg-purple-800 hover:shadow-lg hover:scale-[1.02] transition-all duration-200'
    : 'bg-white border border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white';

  return <button className={`p-2 rounded ${baseClasses} ${className}`} {...props} />;
};

export default Button;
