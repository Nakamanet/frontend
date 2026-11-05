import { ReactNode } from 'react'

interface FilterOption {
  value: string
  label: string
  icon?: ReactNode
}

interface FilterTabProps {
  value: string
  onChange: (value: string) => void
  options: FilterOption[]
}

export default function FilterTab({ value, onChange, options }: FilterTabProps) {
  return (
    <div className="flex justify-center border border-border bg-accent rounded-full py-1 px-6">
      <div className="flex gap-5">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`flex px-4 gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal hover:bg-primary rounded-full ${
              value === option.value ? 'bg-primary text-white' : 'text-text-muted'
            }`}
          >
            {option.icon}
            <span className="hidden md:inline">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
