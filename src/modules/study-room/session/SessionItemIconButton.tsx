import { type HeroIconType } from '@common/types';
import { FC, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface SessionButtonProps {
  icon: HeroIconType;
  srText: string;
  isDisabled?: boolean;
  color?: string;
  handleOnClick?: () => void;
}

interface SessionItemButtonWithPossibleWrapperProps extends SessionButtonProps {
  link?: string;
}

interface SessionButtonWrapperProps {
  link: string;
  children: ReactNode;
}

const Button: FC<SessionButtonProps> = ({ icon, srText, color, isDisabled, handleOnClick }) => {
  const Icon = icon;

  return (
    <button
      type="button"
      onClick={handleOnClick}
      disabled={isDisabled}
      className="inline-flex items-center bg-white mx-0 px-1 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
    >
      <Icon
        className={`h-6 w-6 xl:h-7 xl:w-7 flex-shrink-0 ${
          color || 'text-gray-600'
        } enabled:hover:text-sky-600`}
        aria-hidden="true"
      />
      <span className="sr-only">{srText}</span>
    </button>
  );
};

const Wrapper = ({ link = '/', children }: SessionButtonWrapperProps) => (
  // Link is accessible by default
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  <Link to={link}>{children}</Link>
);

export const SessionItemIconButton = (props: SessionItemButtonWithPossibleWrapperProps) => {
  const { link, isDisabled } = props;

  return link && !isDisabled ? (
    <Wrapper link={link}>
      <Button {...props} />{' '}
    </Wrapper>
  ) : (
    <Button {...props} />
  );
};

export default SessionItemIconButton;
