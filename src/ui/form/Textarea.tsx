import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface ITextareaProps<T extends FieldValues> {
  children?: React.ReactNode;
  label: string;
  id: Path<T>;
  placeholder: string;
  register: UseFormRegister<T>;
  className?: string;
  rows?: number;
}

export default function Textarea<T extends FieldValues>({
  children,
  label,
  id,
  placeholder,
  register,
  className,
  rows = 5,
}: ITextareaProps<T>) {
  return (
    <div>
      <label className="text-on-surface-variant text-label-lg mb-2 block font-medium" htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        {...register(id)}
        className={className}
      />
      {children}
    </div>
  );
}
