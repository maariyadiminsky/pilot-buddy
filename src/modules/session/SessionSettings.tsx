import SettingToggle from '@modules/session/settings/SettingToggle';
import SpeechSynthesis from '@modules/speech-synthesis/SpeechSynthesis';
import TimeSelectMenu from './settings/TimeSelectMenu';
import OrderSelectMenu from './settings/OrderSelectMenu';
import { useState, useEffect } from 'react';
import { type SelectMenuItemType } from '@common/components/dropdown/SelectMenu';
import { SESSION_DATA_INITIAL_STATE } from '@modules/session/constants';
import { type SettingsType, type SettingsVoiceType } from '@modules/session/types';
import { useDatabase } from '@common/hooks';
import Loader from '@common/components/loader/Loader';

interface SessionSettingProps {
  settings?: SettingsType;
  sessionId: string;
  isTimed: boolean;
  setIsTimed: (value: boolean) => void;
  settingsTime: SelectMenuItemType;
  setSettingsTime: (value: SelectMenuItemType) => void;
}

const SessionSettings = ({
  settings,
  sessionId,
  isTimed,
  setIsTimed,
  settingsTime,
  setSettingsTime,
}: SessionSettingProps) => {
  const [shouldReadOutLoud, setShouldReadOutLoud] = useState(false);
  const [shouldHaveOrder, setShouldHaveOrder] = useState(false);
  // time and order selected in settings
  const [settingsOrder, setSettingsOrder] = useState<SelectMenuItemType>(
    SESSION_DATA_INITIAL_STATE.settings.order
  );
  const [settingsVoice, setSettingsVoice] = useState<SettingsVoiceType>(
    SESSION_DATA_INITIAL_STATE.settings.voice
  );

  const { updateDBPartialDataOfSession } = useDatabase();

  useEffect(() => {
    if (settings) {
      setIsTimed(settings.isTimed);
      setShouldReadOutLoud(settings.shouldReadOutLoud);
      setShouldHaveOrder(settings.shouldHaveOrder);
      setSettingsOrder(settings.order || SESSION_DATA_INITIAL_STATE.settings.order);
      setSettingsTime(settings.time || SESSION_DATA_INITIAL_STATE.settings.time);
      setSettingsVoice(settings.voice || SESSION_DATA_INITIAL_STATE.settings.voice);
    }
  }, [settings]);

  const handleSetSetting = async (settingType: string, updatedValue: any, key: string) => {
    if (!sessionId) return;

    // Save in storage
    let hasError = null;
    try {
      await updateDBPartialDataOfSession({ [key]: updatedValue }, sessionId, true);
    } catch (error) {
      hasError = error;
      if (error instanceof Error) {
        console.log(error);
        // todo: add error monitoring
      }
    } finally {
      if (!hasError) {
        switch (settingType) {
          case 'voice':
            setSettingsVoice(updatedValue);
            break;
          case 'order':
            setSettingsOrder(updatedValue);
            break;
          case 'time':
            setSettingsTime(updatedValue);
            break;
          default:
            break;
        }
      }
    }
  };

  const handleToggle = async (settingsType: string, updatedValue: any, key: string) => {
    if (!sessionId) return;

    // Save in storage
    let hasError = null;
    try {
      await updateDBPartialDataOfSession({ [key]: updatedValue }, sessionId, true);
    } catch (error) {
      hasError = error;
      if (error instanceof Error) {
        console.log(error);
        // todo: add error monitoring
      }
    } finally {
      if (!hasError) {
        switch (settingsType) {
          case 'voice':
            setShouldReadOutLoud(updatedValue);
            break;
          case 'order':
            setShouldHaveOrder(updatedValue);
            break;
          case 'time':
            setIsTimed(updatedValue);
            break;
          default:
            break;
        }
      }
    }
  };

  return (
    <div className="bg-zinc-50 lg:flex-shrink-0 lg:border-l lg:border-gray-200 flex flex-col xl:w-96 px-8 h-full w-full">
      {settings ? (
        <div className="lg:w-80 flex flex-col items-start xl:h-[calc(100vh-75px)]">
          <div className="pt-8">
            <h2 className="text-sm font-semibold">Settings</h2>
          </div>
          <ul className="flex flex-col divide-y divide-gray-200">
            <SettingToggle
              title="Voice"
              description="During the session, your questions will be read aloud for you."
              getter={shouldReadOutLoud}
              setter={(value: boolean) => handleToggle('voice', value, 'shouldReadOutLoud')}
            >
              {shouldReadOutLoud && (
                <SpeechSynthesis
                  text="This is how your question will sound."
                  settingsVoice={settingsVoice}
                  setSettingsVoice={(voiceToUpdate: SettingsVoiceType) =>
                    handleSetSetting('voice', voiceToUpdate, 'voice')
                  }
                />
              )}
            </SettingToggle>
            <SettingToggle
              title="Order"
              description="Choose the order in which you'd like the session's questions to be presented to you."
              getter={shouldHaveOrder}
              setter={(value: boolean) => handleToggle('order', value, 'shouldHaveOrder')}
            >
              {shouldHaveOrder && (
                <OrderSelectMenu
                  order={settingsOrder}
                  setOrder={(orderToUpdate: SelectMenuItemType) =>
                    handleSetSetting('order', orderToUpdate, 'order')
                  }
                />
              )}
            </SettingToggle>
            <SettingToggle
              title="Timed"
              description="Every question has a timer and smoothly moves to the next (If the microphone is enabled during the quiz, it's duration aligns with the question's time)."
              getter={isTimed}
              setter={(value: boolean) => handleToggle('time', value, 'isTimed')}
            >
              {isTimed && (
                <TimeSelectMenu
                  time={settingsTime}
                  setTime={(timeToUpdate: SelectMenuItemType) =>
                    handleSetSetting('time', timeToUpdate, 'time')
                  }
                />
              )}
            </SettingToggle>
          </ul>
        </div>
      ) : (
        <div className="py-12 xl:h-[calc(100vh-75px)]">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default SessionSettings;
