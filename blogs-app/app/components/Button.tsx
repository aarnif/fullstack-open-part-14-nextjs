const Button = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer font-semibold shadow-[0px_2px] shadow-blue-700 active:shadow-[0px_0px] active:translate-y-0.5 transition duration-200"
  >
    {children}
  </button>
);

export default Button;
