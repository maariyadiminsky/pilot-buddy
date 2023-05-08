import { truthyString } from '@common/utils';
import { getNoteIconFromName } from '@modules/session/constants';
import { FC } from 'react';

interface NoteIconProps {
  bgColor: string;
  iconColor: string;
  name: string;
  className?: string;
  shouldIncludeName?: boolean;
}

export const NoteIcon: FC<NoteIconProps> = ({
  bgColor,
  iconColor,
  name,
  className,
  shouldIncludeName = false,
}) => {
  const Icon = getNoteIconFromName(name);

  return (
    <div className="flex flex-row justify-center items-center">
      <span
        className={truthyString(
          bgColor,
          'flex h-7 w-7 xl:h-6 xl:w-6 items-center justify-center rounded-full',
          className
        )}
      >
        <Icon
          className={truthyString(iconColor, 'w-5 h-5 xl:h-4 xl:w-4 flex-shrink-0')}
          aria-hidden="true"
        />
      </span>
      {shouldIncludeName && (
        <span className="ml-3 block truncate font-medium text-gray-900 text-sm">{name}</span>
      )}
      <span className="sr-only">{name}</span>
    </div>
  );
};
