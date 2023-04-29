interface CookieOptionsType {
  path?: string;
  secure?: boolean;
  sameSite?: string;
}

export const setCookie = (name: string, value: string, options?: CookieOptionsType) => {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (options) {
    const validKeys: (keyof CookieOptionsType)[] = ['path', 'secure', 'sameSite'];

    validKeys.forEach((optionKey) => {
      if (Object.prototype.hasOwnProperty.call(options, optionKey)) {
        cookieString += `; ${optionKey}`;
        const optionValue = options[optionKey];
        if (optionValue !== true) {
          cookieString += `=${optionValue}`;
        }
      }
    });
  }

  window.document.cookie = cookieString;
};

export const getCookie = (name: string): string => {
  const encodedName = encodeURIComponent(name);
  const cookies = window.document.cookie.split(';');

  const foundCookie = cookies.find((cookie) => {
    const trimmedCookie = cookie.trim();
    return trimmedCookie.startsWith(`${encodedName}=`);
  });

  return foundCookie ? decodeURIComponent(foundCookie.split('=')[1]) : '';
};

export const removeCookie = (name: string, options?: CookieOptionsType) => {
  let cookieString = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;

  if (options?.path) {
    cookieString += ` path=${options.path};`;
  }

  window.document.cookie = cookieString;
};
