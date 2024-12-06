import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
type HeadProps = {
  title: string;
  children: React. ReactNode;
}

function Head({ title, children }: HeadProps) {
  return (
    <div className="Head">
      <div className="Head-place">
        <h1>{title}</h1>
      </div>
      <div className="Head-place">{children}</div>
    </div>
  );
}

export default memo(Head);
