export default function ArrowText({text}: {text:string}) {
    return (
      <div className="flex relative  gap-x-4 lg:gap-x-8">
        <div className="absolute flex w-full origin-left scale-x-0 group-hover:scale-x-100 transition duration-500 bottom-[40%] h-[1px] bg-primary">
          <div className="absolute right-0 -top-[2px] h-[5px] w-[5px] rounded-full bg-primary" />
        </div>
        <div>{text}</div>
      </div>
    );
  }
  