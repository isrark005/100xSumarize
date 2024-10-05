import React from "react";
import { BiError } from "react-icons/bi";


type InputBoxProps = React.ComponentPropsWithRef<"input"> & {
  label?: string;
  errorMessage?: any;
  important?: boolean;
  disableField?: boolean;
};

const InputBox = React.forwardRef<HTMLInputElement, InputBoxProps>(
  function InputBox(
    {
      label,
      type,
      id,
      className = '',
      errorMessage,
      important = null,
      disableField,
      ...props
    },
    ref,
  ) {
    return (
      <div className="input-wraper w-full mt-5 md:mt-4 first-of-type:mt-0 font-mono">
        {label && (
          <label
            className="text-[13px] font-semibold text-[#212735] "
            htmlFor={id}
          >
            {label}
            {important && <span className="text-red-500">*</span>}
          </label>
        )}
        <input
          type={type}
          className={`px-4 py-2 mt-1 text-[13px] rounded-md outline-none focus:outline-2 focus:outline-primary-color duration-200 border border-gray-200 w-full ${disableField ? "bg-[#F7F7F8] text-[#AEADB1]" : "bg-[#F7FAFF] text-black"} ${className}`}
          ref={ref}
          id={id}
          placeholder={disableField ? `let's wait for kirat ;)` : ''}
          {...props}
        />
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

export default InputBox;