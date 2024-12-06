import React, { memo, useEffect, useRef } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

type ModalLayoutProps = {
  title: string;
  onClose: ()=> void,
  children: React.ReactNode;
  labelClose: string;
}
function ModalLayout(props: ModalLayoutProps) {
  const { title = 'Модалка', labelClose = 'Закрыть', onClose } = props;
  const cn = bem('ModalLayout');

  // Корректировка центра, если модалка больше окна браузера.
  const layout = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      // Центрирование frame или его прижатие к краю, если размеры больше чем у layout
      if(layout.current && frame.current){
        layout.current.style.alignItems =
          layout.current.clientHeight < frame.current.clientHeight ? 'flex-start' : 'center';
        layout.current.style.justifyContent =
          layout.current.clientWidth < frame.current.clientWidth ? 'flex-start' : 'center';
      }
    });
    // Следим за изменениями размеров layout
    if (layout.current) resizeObserver.observe(layout.current);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className={cn()} ref={layout}>
      <div className={cn('frame')} ref={frame}>
        <div className={cn('head')}>
          <h1 className={cn('title')}>{title}</h1>
          <button className={cn('close')} onClick={onClose}>
            {labelClose}
          </button>
        </div>
        <div className={cn('content')}>{props.children}</div>
      </div>
    </div>
  );
}


export default memo(ModalLayout);


