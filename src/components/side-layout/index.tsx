import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

type SideLayoutProps = {
  children: React.ReactNode[];
  side?: 'start' | 'end' | 'between' | 'center';
  padding?:  'small' | 'medium';
}
function SideLayout({ children, side, padding }: SideLayoutProps) {
  const cn = bem('SideLayout');
  return (
    <div className={cn({ side, padding })}>
      {React.Children.map(children, child => {
        // Проверяем, является ли child допустимым React-элементом
        if (React.isValidElement(child)) {
          return (
            <div key={child.key || Math.random()} className={cn('item')}>
              {child}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default memo(SideLayout);
