import React, { Children, memo } from 'react';
import PropTypes from 'prop-types';
import {ItemType} from '../item';
import './style.css';
import {ItemBasket} from "../item-basket";
import { Vector } from '../../icons/svg/Vector';

type ListProps = {
  selectCountry: any
  openSelect: () => void
  classOpen?: string
  children: React.ReactNode
}

function OptionCountry({ selectCountry,  openSelect, classOpen, children }: ListProps) {

    const onOpen = () => {
        openSelect()
    }

    return (
    <div className="OptionCountry" onClick={onOpen}>
        <div className='OptionCountry-main'>
            <div>{selectCountry}</div>
            <div className={`OptionCountry-vector ${classOpen}`}>
                <Vector />
            </div>
        </div>
        <div className='OptionCountry-child'>
            {children}
        </div>
    </div>
  );
}

export default memo(OptionCountry);
