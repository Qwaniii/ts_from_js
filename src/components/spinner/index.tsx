import React, { memo } from 'react';
import './style.css';

export type SpinnerProps = {
  active: boolean,
  children: React.ReactNode,
}

const Spinner: React.FC<SpinnerProps> =({ active, children  }) => {
  if (active) {
    return <div className="Spinner">{children}</div>;
  } else {
    return children;
  }
}


export default memo(Spinner);
