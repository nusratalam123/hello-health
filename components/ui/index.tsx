import React, { Dispatch, SetStateAction } from 'react'

// Existing components
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
}

export const Button: React.FC<ButtonProps> = ({ className = '', variant = 'default', ...props }) => {
  const variantClasses = {
    default: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'bg-white text-red-600 border border-red-600 hover:bg-red-50',
    // Add more variants as needed
  }

  return (
    <button 
      className={`px-4 py-2 rounded-md transition-colors ${variantClasses[variant as keyof typeof variantClasses]} ${className}`} 
      {...props} 
    />
  )
}

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className = '', ...props }) => (
  <input 
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${className}`} 
    {...props} 
  />
)

export const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ className = '', ...props }) => (
  <textarea 
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${className}`} 
    {...props} 
  />
)

export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ className = '', ...props }) => (
  <label 
    className={`block text-sm font-medium text-gray-700 mb-1 ${className}`} 
    {...props} 
  />
)

// New components
export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', ...props }) => (
  <div 
    className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`} 
    {...props} 
  />
)

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', ...props }) => (
  <div 
    className={`px-6 py-4 border-b border-gray-200 ${className}`} 
    {...props} 
  />
)

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className = '', ...props }) => (
  <h3 
    className={`text-lg font-semibold text-gray-900 ${className}`} 
    {...props} 
  />
)

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', ...props }) => (
  <div 
    className={`px-6 py-4 ${className}`} 
    {...props} 
  />
)

// export const Switch: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className = '', ...props }) => (
//   <label className={`relative inline-flex items-center cursor-pointer ${className}`}>
//     <input type="checkbox" className="sr-only peer" {...props} />
//     <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
//   </label>
// )

interface DialogProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export const Dialog: React.FC<DialogProps> = ({ className = '', open, onOpenChange, children, ...props }) => {
  React.useEffect(() => {
    const dialog = document.querySelector('dialog')
    if (dialog) {
      if (open) {
        dialog.showModal()
      } else {
        dialog.close()
      }
    }
  }, [open])

  return (
    <dialog 
      className={`fixed z-10 inset-0 overflow-y-auto ${className}`} 
      onClick={() => onOpenChange(false)}
      {...props}
    >
      <div onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </dialog>
  )
}

export const DialogContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', ...props }) => (
  <div 
    className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${className}`} 
    {...props} 
  />
)

export const DialogHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', ...props }) => (
  <div 
    className={`px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ${className}`} 
    {...props} 
  />
)

export const DialogTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className = '', ...props }) => (
  <h3 
    className={`text-lg leading-6 font-medium text-gray-900 ${className}`} 
    {...props} 
  />
)

export const DialogDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className = '', ...props }) => (
  <p 
    className={`mt-2 text-sm text-gray-500 ${className}`} 
    {...props} 
  />
)

export const DialogFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', ...props }) => (
  <div 
    className={`px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse ${className}`} 
    {...props} 
  />
)

// ... (keep other existing components)

interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
  }
  
  export const Switch: React.FC<SwitchProps> = ({ className = '', checked, onCheckedChange, ...props }) => (
    <label className={`relative inline-flex items-center cursor-pointer ${className}`}>
      <input 
        type="checkbox" 
        className="sr-only peer" 
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        {...props} 
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
    </label>
  )
  
  export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', ...props }) => (
    <div 
      className={`px-6 py-4 bg-gray-50 ${className}`} 
      {...props} 
    />
  )
  
  // ... (keep other existing components)
  
  