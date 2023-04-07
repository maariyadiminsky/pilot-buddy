import { HeroIconType } from '@common/types';
import { truthyString } from '@common/utils';

interface NoteIconProps {
  icon: HeroIconType;
  bgColor: string;
  iconColor: string;
  name: string;
  className?: string;
  shouldIncludeName?: boolean;
}

const NoteIcon = ({
  bgColor,
  iconColor,
  name,
  icon,
  className,
  shouldIncludeName = false,
}: NoteIconProps) => {
  const Icon = icon;

  return (
    <>
      <span
        className={truthyString(
          bgColor,
          'flex h-6 w-6 items-center justify-center rounded-full',
          className
        )}
      >
        <Icon className={truthyString(iconColor, 'h-4 w-4 flex-shrink-0')} aria-hidden="true" />
      </span>
      {shouldIncludeName && (
        <span className="ml-3 block truncate font-medium text-gray-900 text-sm">{name}</span>
      )}
      <span className="sr-only">{name}</span>
    </>
  );
};

export default NoteIcon;
