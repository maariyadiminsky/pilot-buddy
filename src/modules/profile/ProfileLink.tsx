import { type HeroIconType } from '@common/types';
import { truthyString } from '@common/utils';
import { Menu } from '@headlessui/react';
import { FC, forwardRef, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ProfileLinkProps {
  text: string;
  link: string;
  isExternalLink?: boolean;
  icon?: HeroIconType;
  iconClassName?: string;
  handleMenuItemClick: () => void;
}

interface LinkWrapperProps {
  link: string;
  children: ReactNode;
  className: string;
  onClick?: () => void;
}

const ExternalLinkWrapper = forwardRef<HTMLAnchorElement, LinkWrapperProps>(
  ({ link, children, className, onClick }, ref) => (
    <a
      href={link}
      ref={ref}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={onClick}
    >
      {children}
    </a>
  )
);
ExternalLinkWrapper.displayName = 'InternalLinkWrapper';

const InternalLinkWrapper = forwardRef<HTMLAnchorElement, LinkWrapperProps>(
  ({ link, children, className, onClick }, ref) => (
    // Link is accessible by default
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <Link ref={ref} to={link} className={className} onClick={onClick}>
      {children}
    </Link>
  )
);
InternalLinkWrapper.displayName = 'InternalLinkWrapper';

export const ProfileLink: FC<ProfileLinkProps> = ({
  isExternalLink,
  text,
  link,
  icon,
  iconClassName,
  handleMenuItemClick,
}) => {
  const Icon = icon;
  const LinkComponent = isExternalLink ? ExternalLinkWrapper : InternalLinkWrapper;

  return (
    <Menu.Item>
      {({ active }) => (
        <LinkComponent
          link={link}
          onClick={handleMenuItemClick}
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
