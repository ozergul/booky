import { FC } from 'react';
import styles from './SearchInput.module.scss';

type SearchInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const SearchInput: FC<SearchInputProps> = ({ ...props }) => {
  return <input className={styles.input} placeholder="Filter..." {...props} />;
};
