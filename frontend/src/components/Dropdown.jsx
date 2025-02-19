import { useState } from 'react';

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { value: 'English', label: 'English' },
    { value: 'Amharic', label: 'Amharic' },
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="bg-none border-2 border-white/60 text-white font-semibold py-2 px-4 rounded-[8px] inline-flex items-center justify-between drop-shadow-3xl w-[120px] hover:border-white/80 transition duration-300"
      >
        <span className="truncate text-white/90 font-normal">
          {selectedOption ? selectedOption.label : 'English'}
        </span>
        <svg
          className={`w-4 h-4 ml-2 transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-[120px] rounded-md shadow-lg bg-black ring-1 ring-white/10">
          <div className="py-1">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleOptionClick(option)}
                className="block px-4 py-2 text-sm text-white hover:bg-gray-800 cursor-pointer transition duration-300"
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;