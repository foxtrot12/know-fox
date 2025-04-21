import { memo } from "react";
import { useTranslations } from "../context/translationContext";
import WritingAnimation, { WritingProps } from "./writingAnimation";

function Name(props: Omit<WritingProps, "text">) {
  const { getTranslation } = useTranslations();

  const name = getTranslation("chinmaya", "sharma");

  return (
    <WritingAnimation text={name} {...props} />
  );
}

export default memo(Name);
