import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface IInputProps<T extends FieldValues> {
  children?: React.ReactNode;
  label: string;
  id: Path<T>;
  type: string;
  placeholder: string;
  register: UseFormRegister<T>;
  className?: string;
}

export default function Input<T extends FieldValues>({
  children,
  label,
  id,
  type,
  placeholder,
  register,
  className,
}: IInputProps<T>) {
  return (
    <div>
      <label className="text-on-surface-variant text-label-md mb-1 block font-medium" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id)}
        className={className}
      />
      {children}
    </div>
  );
}
