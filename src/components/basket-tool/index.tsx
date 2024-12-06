import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import './style.css';

type BasketToolProps = {
  onOpen: () => {};
  sum: number;
  amount: number;
  t: any
}
function BasketTool(props: BasketToolProps) {
  const { sum = 0, amount = 0, onOpen = () => {}, t = text => text } = props;

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{t('basket.inBasket')}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${t('basket.articles', amount)} / ${numberFormat(sum)} ₽`
          : t('basket.empty')}
      </span>
      <button onClick={onOpen}>{t('basket.open')}</button>
    </div>
  );
}

export default memo(BasketTool);
