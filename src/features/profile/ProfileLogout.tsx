import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks';
import { Button } from '@/ui';

export default function ProfileLogout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="border-outline-variant/60 flex justify-end border-t p-6">
      <Button
        type="button"
        color="secondary"
        className="w-full sm:w-auto"
        BtnText="Log out"
        onClick={handleLogout}
        icon={<LogOut size={20} />}
      />
    </div>
  );
}
