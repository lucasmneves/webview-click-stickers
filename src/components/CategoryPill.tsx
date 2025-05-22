
import { Link } from "react-router-dom";

interface CategoryPillProps {
  name: string;
  path: string;
  icon: string;
  color: string;
}

const CategoryPill = ({ name, path, icon, color }: CategoryPillProps) => {
  return (
    <Link
      to={path}
      className={`category-pill flex items-center justify-center flex-col rounded-lg p-4 ${color} text-white text-center`}
    >
      <img src={icon} alt={name} className="w-12 h-12 mb-2" />
      <span className="font-medium">{name}</span>
    </Link>
  );
};

export default CategoryPill;
