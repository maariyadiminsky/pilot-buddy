import { logError } from '@common/error-monitoring';
import CryptoJS from 'crypto-js';

const getEncryptionKey = () => {
  if (!process.env.REACT_APP_DB_ENCRYPTION_KEY) {
    throw new Error('No Encryption Key set');
  }

  return CryptoJS.enc.Hex.parse(process.env.REACT_APP_DB_ENCRYPTION_KEY);
};

export const ENCRYPTION_KEY = getEncryptionKey();

export const encryptData = (data: string): string | null => {
  try {
    return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), ENCRYPTION_KEY, {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: ENCRYPTION_KEY,
    }).toString();
  } catch (error) {
    logError('Error encrypting data:', error);
    return null;
  }
};

export const decryptData = (data: string): string | null => {
  try {
    return CryptoJS.AES.decrypt(data, ENCRYPTION_KEY, {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: ENCRYPTION_KEY,
    }).toString(CryptoJS.enc.Utf8);
  } catch (error) {
    logError('Error decrypting data:', error);
    return null;
  }
};
