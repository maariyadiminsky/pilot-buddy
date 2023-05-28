import { RenderResult, fireEvent, waitFor, RenderHookOptions } from '@testing-library/react';
import { ReactNode } from 'react';
import userEvent from '@testing-library/user-event';

interface CustomRenderOptions {
  route: string;
}

type CustomRender = (ui: ReactNode, options: CustomRenderOptions) => RenderResult;

type MockIndexedDB = () => void;

export { CustomRender as render, fireEvent, waitFor, userEvent, MockIndexedDB as mockIndexedDB };
