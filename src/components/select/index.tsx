import React,{ memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
type Options = {
  value: string | number;
  title: string;
}

type SelectProps = {
  options: Options[];
  value: string | number;
  onChange: (value: string | number) => void;
}
function Select(props: SelectProps) {
  const { onChange = () => {} } = props;
  const onSelect = e => {
    props.onChange(e.target.value);
  };

  return (
    <select className="Select" value={props.value} onChange={onSelect}>
      {props.options.map(item => (
        <option key={item.value} value={item.value}>
          {item.title}
        </option>
      ))}
    </select>
  );
}

export default memo(Select);
