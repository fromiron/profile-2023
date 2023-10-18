import { FC } from "react";
import { Typewriter } from "react-simple-typewriter";

type Props = {
  textList: string[];
};

const TypingText: FC<Props> = ({ textList }: Props) => {
  return (
    <Typewriter
      words={textList}
      loop={true}
      cursor
      cursorStyle="_"
      typeSpeed={70}
      deleteSpeed={25}
      delaySpeed={2000}
    />
  );
};

export default TypingText;
