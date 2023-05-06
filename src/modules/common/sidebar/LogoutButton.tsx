import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';

interface LogoutButtonProps {
  handleLogout: () => void;
}

export const LogoutButton: FC<LogoutButtonProps> = ({ handleLogout }) => (
  <button
    type="button"
    onClick={handleLogout}
    className="flex flex-row space-x-2 rounded-lg border border-gray-300 py-2 px-12 hover:bg-gray-300 hover:text-gray-900"
  >
    <ArrowRightOnRectangleIcon className="h-5 w-5" />
    <span>Logout</span>
  </button>
);
