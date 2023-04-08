import { WrapperTypeEnum } from '@common/types';

interface ProfilePictureProps {
  wrapperType: keyof typeof WrapperTypeEnum;
  isMobile?: boolean;
}

const styles = {
  sidebar: 'h-10 w-10 flex-shrink-0 rounded-full bg-gray-300',
  header: 'h-8 w-8 rounded-full',
};

// todo: get profile picture from db
// image needs to be adjusted later, example image is way to big
const ProfilePicture = ({ wrapperType, isMobile = false }: ProfilePictureProps) => (
  <img
    className={styles[wrapperType]}
    src={`https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=${
      isMobile ? 2 : 3
    }&w=256&h=256&q=80`}
    alt=""
  />
);

export default ProfilePicture;
