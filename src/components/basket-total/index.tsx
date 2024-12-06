import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import './style.css';
type BasketTotalProps = {
  sum: number
  t: any
}
function BasketTotal(props: BasketTotalProps) {
  const { sum = 0, t = text => text } = props;
  const cn = bem('BasketTotal');
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{t('basket.total')}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

export default memo(BasketTotal);
