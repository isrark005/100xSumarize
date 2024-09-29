import React from "react";
import { BiError } from "react-icons/bi";


type InputBoxProps = React.ComponentPropsWithRef<"textarea"> & {
  label?: string;
  letterCount?: number;
  letterCountRange?: number;
  errorMessage?: any;
  disableField?: boolean;
};

const TextArea = React.forwardRef<HTMLTextAreaElement, InputBoxProps>(
  function InputBox(
    {
      label,
      id,
      className,
      letterCount,
      errorMessage,
      letterCountRange,
      disableField,
      ...props
    },
    ref,
  ) {
    return (
      <div className="input-wraper w-full max-md:mt-6 relative">
        {label && (
          <label
            className="text-[13px] font-semibold text-[#212735] "
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <textarea
          className={`z-0 p-4 mt-2 text-[13px] rounded-lg ${disableField ? "bg-[#F7F7F8] text-[#AEADB1]" : "bg-[#F7FAFF] text-black"} outline-none focus:outline-2 focus:outline-primary-color duration-200 border border-gray-200 w-full ${className}`}
          ref={ref}
          id={id}
          rows={10}
          {...props}
        />
        {typeof letterCount !== "undefined" && (
          <span
            className={`float-right mr-2 text-[#6D7486] text-[10px] absolute bottom-2 right-2 ${
              letterCountRange
                ? letterCount > letterCountRange
                  ? "text-red-600"
                  : ""
                : letterCount > 300
                  ? "text-red-600"
                  : ""
            }`}
          >
            {letterCount}/{letterCountRange ? letterCountRange : "300"}
          </span>
        )}
        {errorMessage && (
          <div className="flex items-center gap-1 mt-3">
            <div className="text-red-600">
              <BiError className="text-red-600" />
            </div>
            <p className="w-fit text-red-600 text-xs font-medium">
              {errorMessage}
            </p>
          </div>
        )}
      </div>
    );
  },
);

export default TextArea;