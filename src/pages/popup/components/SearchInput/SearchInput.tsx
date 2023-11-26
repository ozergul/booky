import { FC, useRef, useEffect } from 'react';
import styles from './SearchInput.module.scss';

type SearchInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const SearchInput: FC<SearchInputProps> = ({ ...props }) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return <input ref={ref} className={styles.input} placeholder="Filter..." {...props} />;
};
