import Link from "next/link";

interface NavLinkProps {
  href: string;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

const NavLink = ({ href, variant = "secondary", children }: NavLinkProps) => {
  const variantClasses = {
    primary:
      "bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer font-semibold shadow-[0px_2px] shadow-blue-700 active:shadow-[0px_0px] active:translate-y-0.5 transition duration-200",
    secondary: "hover:underline font-medium",
  };

  return (
    <Link href={href} className={variantClasses[variant]}>
      {children}
    </Link>
  );
};

export default NavLink;
