import { Menu } from '@headlessui/react';
import { truthyString } from '@common/utils';
import { Link } from 'react-router-dom';
import { type HeroIconType } from '@common/types';
import { ReactNode } from 'react';

interface ProfileLinkProps {
  text: string;
  link: string;
  isExternalLink?: boolean;
  icon?: HeroIconType;
  iconClassName?: string;
}

interface LinkWrapperProps {
  link: string;
  children: ReactNode;
  className: string;
}

const ExternalLinkWrapper = ({ link, children, className }: LinkWrapperProps) => (
  <a href={link} target="_blank" rel="noopener noreferrer" className={className}>
    {children}
  </a>
);

const InternalLinkWrapper = ({ link, children, className }: LinkWrapperProps) => (
  <Link to={link} className={className}>
    {children}
  </Link>
);

const ProfileLink = ({ isExternalLink, text, link, icon, iconClassName }: ProfileLinkProps) => {
  const Icon = icon;
  const LinkComponent = isExternalLink ? ExternalLinkWrapper : InternalLinkWrapper;

  return (
    <Menu.Item>
      {({ active }) => (
        <LinkComponent
          link={link}
          className={truthyString(
            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
            'px-4 py-2 text-sm flex flex-row hover:bg-gray-200'
          )}
        >
          {Icon && (
            <Icon className={truthyString('h-5 w-5 mr-1', iconClassName)} aria-hidden="true" />
          )}
          {text}
        </LinkComponent>
      )}
    </Menu.Item>
  );
};

export default ProfileLink;
