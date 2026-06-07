import { Link, useNavigate } from 'react-router-dom';
import { LogoWordMark } from '../Logo';
import { FOOTER_LINKS } from '../constant';

export default function MobileFooter() {
  const navigate = useNavigate();

  return (
    <footer className="border-outline-variant/30 bg-surface-container gap-gutter text-body-lg font-body-md z-50 mx-auto flex w-full flex-col items-center justify-center p-14 pb-24 text-center shadow-sm backdrop-blur-xl">
      <LogoWordMark onClick={() => navigate('/')} />
      <p className="text-on-surface-variant max-w-sm">
        Elevating the way tech communities gather, share, and grow. From local meetups to global
        stages.
      </p>
      <p className="text-secondary">
        © {new Date().getFullYear()} Ctrl+Alt+Meet. All rights reserved.
      </p>
      {FOOTER_LINKS.map(link => (
        <div className="flex gap-8" key={link.label}>
          {link.links.map(linkItem => (
            <Link
              key={linkItem.id}
              className="text-on-surface-variant hover:text-tertiary transition-all duration-300"
              to={linkItem.to}
            >
              {linkItem.label}
            </Link>
          ))}
        </div>
      ))}
    </footer>
  );
}
