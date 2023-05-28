import { logError } from '@common/error-monitoring';
import CryptoJS from 'crypto-js';

const getEncryptionKey = () => {
  if (!process.env.REACT_APP_DB_ENCRYPTION_KEY) {
    throw new Error('No Encryption Key set');
  }

  return CryptoJS.enc.Hex.parse(process.env.REACT_APP_DB_ENCRYPTION_KEY);
};

export const encryptData = (data: string): string | null => {
  const encryptionKey = getEncryptionKey();

  try {
    return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), encryptionKey, {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: encryptionKey,
    }).toString();
  } catch (error) {
    logError('Error encrypting data:', error);
    return null;
  }
};

export const decryptData = (data: string): string | null => {
  const encryptionKey = getEncryptionKey();

  try {
    return CryptoJS.AES.decrypt(data, encryptionKey, {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: encryptionKey,
    }).toString(CryptoJS.enc.Utf8);
  } catch (error) {
    logError('Error decrypting data:', error);
    return null;
  }
};
