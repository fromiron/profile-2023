"use client";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import makeDelay from "@/lib/makeDelay";
import { FONT_EN } from "@/styles/fonts";

export default function ThemeSelector() {
  const [focus, setFocus] = useState(false);
  const { setTheme, theme } = useTheme();
  const focusOut = () => setFocus(false);

  const handleThemeChange = async (theme: string) => {
    setTheme(theme);
    await makeDelay(1000, focusOut);
  };

  const handleFocusIn = () => {
    setFocus(true);
  };
  const handleFocusOut = async () => {
    if (focus) {
      await makeDelay(7000, focusOut);
    }
  };

  return (
    <div
      onMouseEnter={handleFocusIn}
      onMouseLeave={handleFocusOut}
      className={`top-[1rem] left-0 fixed z-[9999] bg-primary p-2 rounded-r-lg  ${
        focus ? "-translate-x-0" : "-translate-x-[80%]"
      } hover:-translate-x-0 transition-transform duration-500 cursor-pointer`}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="focus-visible:ring-transparent"
          >
            <ThemeIcons />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-[9999] p-8 ml-8 border-primary">
          <DropdownMenuLabel
            className={`mb-2 text-center border-b ${FONT_EN} text-lg`}
          >
            <span className="capitalize text-primary font-light">{theme}</span>{" "}
            Mode
          </DropdownMenuLabel>

          <DropdownMenuItem onClick={() => handleThemeChange("light")}>
            <div className="h-[1rem] w-[1rem] inline mr-2">
              <Sun />
            </div>
            ライトモード
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
            <div className="h-[1rem] w-[1rem] inline mr-2">
              <Moon />
            </div>
            だーくモード
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleThemeChange("system")}>
            <div className="h-[1rem] w-[1rem] inline mr-2">
              <System />
            </div>
            システム設定
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ThemeIcons() {
  return (
    <>
      <span className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 text-orange-300 transition-all dark:-rotate-90 dark:scale-0">
        <Sun />
      </span>
      <span className="absolute h-[1.2rem] w-[1.2rem] rotate-90 text-orange-300 scale-0 transition-all dark:rotate-0 dark:scale-100">
        <Moon />
      </span>
    </>
  );
}

function Sun() {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 56 56"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M 28.0001 10 C 29.5001 10 30.7423 8.7578 30.7423 7.2344 C 30.7423 5.7344 29.5001 4.4922 28.0001 4.4922 C 26.4767 4.4922 25.2579 5.7344 25.2579 7.2344 C 25.2579 8.7578 26.4767 10 28.0001 10 Z M 40.7501 15.2734 C 41.8048 16.3281 43.5392 16.3281 44.6173 15.2734 C 45.6954 14.1953 45.6954 12.4609 44.6173 11.3828 C 43.5392 10.3047 41.8048 10.3047 40.7501 11.3828 C 39.6720 12.4609 39.6720 14.1953 40.7501 15.2734 Z M 11.3595 15.2968 C 12.4142 16.3516 14.1485 16.3516 15.2267 15.2968 C 16.3282 14.1953 16.3282 12.4844 15.2267 11.4063 C 14.1485 10.3281 12.4142 10.3281 11.3595 11.4063 C 10.2814 12.4844 10.2814 14.1953 11.3595 15.2968 Z M 28.0001 40 C 34.5158 40 39.9298 34.5859 39.9298 28.0469 C 39.9298 21.5312 34.5158 16.1172 28.0001 16.1172 C 21.4610 16.1172 16.0470 21.5312 16.0470 28.0469 C 16.0470 34.5859 21.4610 40 28.0001 40 Z M 7.2345 30.7890 C 8.7345 30.7890 9.9767 29.5469 9.9767 28.0234 C 9.9767 26.5234 8.7345 25.2812 7.2345 25.2812 C 5.7110 25.2812 4.4923 26.5234 4.4923 28.0234 C 4.4923 29.5469 5.7110 30.7890 7.2345 30.7890 Z M 48.7659 30.9531 C 50.2659 30.9531 51.5077 29.7109 51.5077 28.1875 C 51.5077 26.6875 50.2659 25.4453 48.7659 25.4453 C 47.2423 25.4453 46.0236 26.6875 46.0236 28.1875 C 46.0236 29.7109 47.2423 30.9531 48.7659 30.9531 Z M 11.3829 44.6406 C 12.4376 45.7187 14.1720 45.7187 15.2501 44.6406 C 16.3282 43.5625 16.3282 41.8281 15.2501 40.7500 C 14.1720 39.6953 12.4376 39.6953 11.3829 40.7500 C 10.2814 41.8281 10.2814 43.5625 11.3829 44.6406 Z M 40.6095 44.7578 C 41.6876 45.8359 43.3985 45.8359 44.5001 44.7578 C 45.5548 43.7031 45.5548 41.9687 44.5001 40.8906 C 43.3985 39.8125 41.6876 39.8125 40.6095 40.8906 C 39.5314 41.9687 39.5314 43.7031 40.6095 44.7578 Z M 28.0001 51.5078 C 29.5001 51.5078 30.7423 50.2890 30.7423 48.7656 C 30.7423 47.2656 29.5001 46.0234 28.0001 46.0234 C 26.4767 46.0234 25.2579 47.2656 25.2579 48.7656 C 25.2579 50.2890 26.4767 51.5078 28.0001 51.5078 Z" />
    </svg>
  );
}

function Moon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21.5287 15.9294C21.3687 15.6594 20.9187 15.2394 19.7987 15.4394C19.1787 15.5494 18.5487 15.5994 17.9187 15.5694C15.5887 15.4694 13.4787 14.3994 12.0087 12.7494C10.7087 11.2994 9.90873 9.40938 9.89873 7.36938C9.89873 6.22938 10.1187 5.12938 10.5687 4.08938C11.0087 3.07938 10.6987 2.54938 10.4787 2.32938C10.2487 2.09938 9.70873 1.77938 8.64873 2.21938C4.55873 3.93938 2.02873 8.03938 2.32873 12.4294C2.62873 16.5594 5.52873 20.0894 9.36873 21.4194C10.2887 21.7394 11.2587 21.9294 12.2587 21.9694C12.4187 21.9794 12.5787 21.9894 12.7387 21.9894C16.0887 21.9894 19.2287 20.4094 21.2087 17.7194C21.8787 16.7894 21.6987 16.1994 21.5287 15.9294Z"
        fill="currentColor"
      />
    </svg>
  );
}

function System() {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 256 256"
      id="Flat"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M216.00781,40h-176a16.01833,16.01833,0,0,0-16,16V95.84521C24.00684,95.89746,24,95.94775,24,96s.00684.10254.00781.15479V200a16.01833,16.01833,0,0,0,16,16h176a16.01833,16.01833,0,0,0,16-16V56A16.01833,16.01833,0,0,0,216.00781,40Zm0,16,.002,32H40.00781V56Z" />
    </svg>
  );
}
