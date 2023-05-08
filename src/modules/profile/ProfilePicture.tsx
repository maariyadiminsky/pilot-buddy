import { Loader } from '@common/loader';
import { WrapperTypeEnum } from '@common/types';
import { UserCircleIcon } from '@heroicons/react/20/solid';
import { FC } from 'react';

interface ProfilePictureProps {
  wrapperType: keyof typeof WrapperTypeEnum;
  src?: string;
}

const styles = {
  sidebar: 'h-10 w-10 flex-shrink-0 rounded-full bg-gray-300',
  header: 'h-8 w-8 rounded-full',
};

export const ProfilePicture: FC<ProfilePictureProps> = ({ wrapperType, src }) => {
  const styleVariant = styles[wrapperType];

  if (src === undefined) {
    return <Loader size="small" />;
  }

  return src ? (
    <img
      src={src}
      alt="User profile"
      className={`${styleVariant} h-12 w-12 hover:opacity-90 rounded-full object-cover`}
    />
  ) : (
    <UserCircleIcon
      className="h-12 w-12 flex-shrink-0 text-gray-500 hover:text-sky-600"
      aria-hidden="true"
    />
  );
};
