import { mocked } from 'jest-mock';
import { useTranslation } from 'next-i18next';

type UseTranslationSimplifiedType = (namespace: string) => {
  t: (key: string) => string;
};

export const mockUseTranslation = (lang: string) => {
  const tMock = jest.fn();
  const changeLangueMock = jest.fn();

  mocked(useTranslation as UseTranslationSimplifiedType).mockImplementation(
    (namespace) => ({
      t: tMock.mockImplementation((key) => {
        return Array.isArray(namespace) ? `${key}` : `${namespace}:${key}`;
      }),
      i18n: {
        changeLanguage: changeLangueMock,
        language: lang,
      },
    })
  );

  return { tMock, changeLangueMock };
};
