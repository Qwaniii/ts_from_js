import { memo } from 'react';
import './style.css';

type ControlsProps = {
  onAdd: any
  title: string
}
function Controls({ onAdd, title = "Добавить"}: ControlsProps) {
  return (
    <div className="Controls">
      <button onClick={() => onAdd()}>{title}</button>
    </div>
  );
}


export default memo(Controls);
