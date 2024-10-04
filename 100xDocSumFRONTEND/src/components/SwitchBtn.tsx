type SwitchBtnProps = {
  onChange: (checked: boolean) => void;
  checked?: boolean;
};

const SwitchBtn = ({ onChange, checked = false }: SwitchBtnProps) => {
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <div className="switch-container h-[30px] flex">
      <input
      className="switch-input"
        type="checkbox"
        id="switch"
        checked={checked}
        onChange={handleToggle}
      />
      <label htmlFor="switch">Toggle</label>
    </div>
  );
};

export default SwitchBtn;
