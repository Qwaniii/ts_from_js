import React, { Children, memo, useEffect, useState } from 'react';
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
  searchTitle: any
  titleCountry: any
}

function OptionCountry({ selectCountry,  openSelect, classOpen, children, titleCountry, searchTitle }: ListProps) {

    const onOpen = () => {
        openSelect()
    }

    return (
    <div className="OptionCountry">
        <div className='OptionCountry-main' onClick={onOpen}>
            <span className='OptionCountry-wrapper'>
        {!titleCountry.length && "Все страны"}
        {titleCountry.length  && titleCountry.length < 4 ? titleCountry.map(item => 
        <>
            <span className='OptionCountry-code'>{item.code}</span>
            <span  className='OptionCountry-title'>{item.title}</span>
            </>
        ):  titleCountry.map(item => 
            <>
                <span className='OptionCountry-code'>{item.code}</span>
            </>)
        }
        </span>
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
