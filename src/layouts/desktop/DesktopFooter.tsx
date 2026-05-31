import { AtSign, MessageSquare } from 'lucide-react';
import { IconButton } from '@/ui';
import { LogoWordMark } from '../Logo';
import { Link, useNavigate } from 'react-router-dom';
import { FOOTER_LINKS } from '../constant';

export default function DesktopFooter() {
  const navigate = useNavigate();

  return (
    <footer className="border-outline-variant/30 bg-surface-container p-container-padding-desktop z-50 flex w-full items-center justify-between shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-10 py-6">
        <div className="gap-stack-gap flex flex-col">
          <LogoWordMark onClick={() => navigate('/')} />
          <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
            Elevating the way tech communities gather, share, and grow. From local meetups to global
            stages.
          </p>
          <p className="font-body-md text-body-md text-secondary">
            © {new Date().getFullYear()} Ctrl+Alt+Meet. All rights reserved.
          </p>
        </div>
        <div className="flex gap-40">
          {FOOTER_LINKS.map(link => (
            <div className="flex flex-col gap-3" key={link.label}>
              <h3 className="font-label-md text-label-md text-on-surface font-bold">
                {link.label}
              </h3>
              {link.links.map(linkItem => (
                <Link
                  key={linkItem.id}
                  className="font-body-md text-body-md text-on-surface-variant hover:text-tertiary transition-all duration-300"
                  to={linkItem.to}
                >
                  {linkItem.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <IconButton icon={<AtSign size={20} />} type="button" onClick={() => {}} />
          <IconButton icon={<MessageSquare size={20} />} type="button" onClick={() => {}} />
        </div>
      </div>
    </footer>
  );
}
