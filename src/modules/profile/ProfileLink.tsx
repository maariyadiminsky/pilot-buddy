import { type HeroIconType } from '@common/types';
import { truthyString } from '@common/utils';
import { Menu } from '@headlessui/react';
import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

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
  // Link is accessible by default
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  <Link to={link} className={className}>
    {children}
  </Link>
);

export const ProfileLink: FC<ProfileLinkProps> = ({
  isExternalLink,
  text,
  link,
  icon,
  iconClassName,
}) => {
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
