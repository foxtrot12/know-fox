import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  FC,
} from "react";
import { Translations } from "../const/translations";

type TranslationContextType = {
  translations: { [key: string]: string };
  setTranslations: React.Dispatch<
    React.SetStateAction<{ [key: string]: string }>
  >;
};

type TranslationContextProviderProps = {
  children: ReactNode;
  initialTranslations?: { [key: string]: string };
};

const TranslationContext = createContext<TranslationContextType | null>(null);

export const TranslationContextProvider: FC<
  TranslationContextProviderProps
> = ({ children, initialTranslations = Translations }) => {
  const [translations, setTranslations] = useState<{ [key: string]: string }>(
    initialTranslations
  );

  return (
    <TranslationContext.Provider value={{ translations, setTranslations }}>
      {children}
    </TranslationContext.Provider>
  );
};

/**
 * Hook to access translations and helper function to fetch by key
 */
export const useTranslations = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error(
      "useTranslations must be used within a TranslationContextProvider"
    );
  }

  const { translations, setTranslations } = context;

  /**
   * Get translation string by key. Falls back to key if not found.
   */
  const getTranslation = (...keys: Array<string>): string => {

    let translation = ''

    keys.forEach((key) => {
      translation = translation ? `${translation} ${translations[key]}` : translations[key]
    })

    return translation
  };

  return { getTranslation, setTranslations };
};
