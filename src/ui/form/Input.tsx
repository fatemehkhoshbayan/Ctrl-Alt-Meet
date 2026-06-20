import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { cn } from '@/lib';

interface IInputProps<T extends FieldValues = FieldValues> extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className'
> {
  children?: React.ReactNode;
  label?: string;
  id?: Path<T> | string;
  placeholder?: string;
  register?: UseFormRegister<T>;
  className?: string;
  hideLabel?: boolean;
  bare?: boolean;
  wrapperClassName?: string;
}

export default function Input<T extends FieldValues = FieldValues>({
  children,
  label,
  id,
  type = 'text',
  placeholder,
  register,
  className,
  hideLabel = false,
  bare = false,
  wrapperClassName,
  ...rest
}: IInputProps<T>) {
  const generatedId = useId();
  const inputId = register ? generatedId : (id?.toString() ?? generatedId);

  const input = (
    <input
      id={inputId}
      type={type}
      placeholder={placeholder}
      className={className}
      {...(register && id ? register(id as Path<T>) : rest)}
    />
  );

  if (bare) {
    return (
      <>
        {input}
        {children}
      </>
    );
  }

  return (
    <div className={wrapperClassName}>
      {label ? (
        <label
          className={cn(
            'text-on-surface-variant text-label-md block p-2 font-medium',
            hideLabel && 'sr-only',
          )}
          htmlFor={inputId}
        >
          {label}
        </label>
      ) : null}
      {input}
      {children}
    </div>
  );
}
