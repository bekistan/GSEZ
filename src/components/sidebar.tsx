// components/Sidebar.tsx
import Link from 'next/link';

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white h-full w-64 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-bold">Admin Dashboard</h2>
      </div>
      <nav className="flex-1">
        <ul className="py-4">
          <li className="px-4 py-2 hover:bg-gray-700">
            <Link href="/admin/dashboard">
              Dashboard
            </Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700">
            <Link href="/admin/users">
              Users
            </Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700">
            <Link href="/admin/content">
              Content
            </Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700">
            <Link href="/admin/settings">
              Settings
            </Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700">
            <Link href="/admin/analytics">
              Analytics
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
