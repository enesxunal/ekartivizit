import * as React from "react"

export interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
  defaultValue?: string
  children: React.ReactNode
}

export function Select({ value, onValueChange, defaultValue, children }: SelectProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || '')
  const currentValue = value !== undefined ? value : internalValue

  const handleChange = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
  }

  return (
    <div className="relative">
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { value: currentValue, onValueChange: handleChange } as any)
        }
        return child
      })}
    </div>
  )
}

export interface SelectTriggerProps {
  className?: string
  children: React.ReactNode
  value?: string
  onValueChange?: (value: string) => void
}

export function SelectTrigger({ className, children, value, onValueChange }: SelectTriggerProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      >
        {children}
        <svg
          className="h-4 w-4 opacity-50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            {React.Children.map(children, child => {
              if (React.isValidElement(child) && child.type === SelectContent) {
                return React.cloneElement(child, {
                  value,
                  onValueChange: (newValue: string) => {
                    onValueChange?.(newValue)
                    setIsOpen(false)
                  }
                } as any)
              }
              return null
            })}
          </div>
        </>
      )}
    </div>
  )
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  return <span className="text-gray-500">{placeholder}</span>
}

export interface SelectContentProps {
  children: React.ReactNode
  value?: string
  onValueChange?: (value: string) => void
}

export function SelectContent({ children, value, onValueChange }: SelectContentProps) {
  return (
    <div className="max-h-60 overflow-auto py-1">
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { 
            selectedValue: value,
            onSelect: onValueChange 
          } as any)
        }
        return child
      })}
    </div>
  )
}

export interface SelectItemProps {
  value: string
  children: React.ReactNode
  selectedValue?: string
  onSelect?: (value: string) => void
}

export function SelectItem({ value, children, selectedValue, onSelect }: SelectItemProps) {
  const isSelected = selectedValue === value

  return (
    <button
      type="button"
      onClick={() => onSelect?.(value)}
      className={`relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 px-3 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100 ${
        isSelected ? 'bg-blue-50 text-blue-900' : 'text-gray-900'
      }`}
    >
      {children}
      {isSelected && (
        <span className="absolute right-2 h-3.5 w-3.5">
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </span>
      )}
    </button>
  )
} 