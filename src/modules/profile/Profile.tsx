import BrandButton from '@modules/common/button/BrandButton';
import { UserCircleIcon } from '@heroicons/react/20/solid';
import { SyntheticEvent, useState, useEffect, useContext } from 'react';
import { useDatabase, useImageUpload, type UserType } from '@common/hooks';
import { PageContext } from '@common/page/PageProvider';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@modules/app/constants';
import { captureException } from '@modules/common/error-monitoring';

const Profile = () => {
  const [userProfile, setUserProfile] = useState<UserType>();

  const { setPageTitle } = useContext(PageContext);
  const navigate = useNavigate();
  const { getUserProfileData, setUserProfileData } = useDatabase();
  const { imageSrc, handleImageChange, fileSizeError, setFileSizeError } = useImageUpload();

  useEffect(() => {
    setPageTitle('Profile');
  }, []);

  const handleSetUserProfileData = (event: SyntheticEvent) => {
    event.preventDefault();

    if (!fileSizeError) {
      setUserProfileData({ ...userProfile, image: imageSrc || '' } as UserType);
      navigate('/');
    }
  };

  const setUserName = (name: string) => {
    setFileSizeError('');
    setUserProfile({ ...userProfile, ...{ name } } as UserType);
  };

  useEffect(() => {
    let user: UserType;

    const getUser = async () => {
      let hasError = null;
      try {
        user = await getUserProfileData();

        if (!user) {
          navigate(ROUTES.NOT_FOUND_ROUTE);
        }
      } catch (error) {
        hasError = error;
        if (error instanceof Error) {
          captureException(error);
        }
      } finally {
        if (!hasError && user) {
          setUserProfile(user);
        }
      }
    };

    getUser();
  }, []);

  const image = imageSrc || userProfile?.image;

  return (
    <>
      <form
        onSubmit={handleSetUserProfileData}
        className="flex flex-col justify-center items-center pt-6"
      >
        <div className="flex flex-row justify-between items-center">
          <h2 className="flex flex-row items-center pt-4 text-gray-900 font-medium">
            Edit Your Profile
          </h2>
        </div>

        <div className="flex flex-col justify-center items-center space-y-4">
          <div className="h-5 pt-4">
            {fileSizeError && <div className="text-red-600 text-sm">{fileSizeError}</div>}
          </div>
          <div>
            <label htmlFor="imageUpload" className="cursor-pointer">
              {image ? (
                <img
                  src={image}
                  alt="User profile"
                  className="h-24 w-24 rounded-full object-cover"
                />
              ) : (
                <UserCircleIcon
                  className="h-24 w-24 flex-shrink-0 text-gray-500 hover:text-sky-600"
                  aria-hidden="true"
                />
              )}
            </label>
            <input
              type="file"
              id="imageUpload"
              name="imageUpload"
              className="hidden"
              onChange={handleImageChange}
              accept="image/png, image/jpeg"
            />
          </div>
          <div className="flex flex-col mb-6">
            <label
              htmlFor="name"
              className="justify-start items-start block text-sm font-semibold leading-6 text-sky-600"
            >
              Name
            </label>
            <div className="h-9">
              <div className="relative flex rounded-md shadow-sm w-72">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="flex w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  placeholder="Add your name."
                  value={userProfile?.name || ''}
                  onChange={(event) => setUserName(event.target.value)}
                  aria-label="name"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end items-end pt-4">
            <BrandButton
              buttonType="submit"
              text="Submit"
              srText="Update your profile"
              buttonClassType="solid"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default Profile;
