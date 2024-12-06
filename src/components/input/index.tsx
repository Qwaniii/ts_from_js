import { memo, useCallback, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import debounce from 'lodash.debounce';

import './style.css';

type InputProps = {
  value: string,
  name?: any,
  type?: string,
  placeholder: string,
  onChange: (value: string, name: string) => void,
  theme: string,
}
function Input(props: InputProps) {
  const { onChange = () => {}, type = 'text', theme = '' } = props;
  // Внутренний стейт для быстрого отображения ввода
  const [value, setValue] = useState(props.value);

  const onChangeDebounce = useCallback(
    debounce(value => onChange(value, props.name), 600),
    [onChange, props.name],
  );

  // Обработчик изменений в поле
  const onChangeHandler = event => {
    setValue(event.target.value);
    onChangeDebounce(event.target.value);
  };

  // Обновление стейта, если передан новый value
  useLayoutEffect(() => setValue(props.value), [props.value]);

  const cn = bem('Input');
  return (
    <input
      className={cn({ theme: theme })}
      value={value}
      type={type}
      placeholder={props.placeholder}
      onChange={onChangeHandler}
    />
  );
}


export default memo(Input);
