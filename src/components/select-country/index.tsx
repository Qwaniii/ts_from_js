import { memo, useEffect, useRef, useState } from 'react';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import useDebounce from '../../hooks/useDebounce';


// type Options = {
//   value: string;
//   title: string;
//   code: string;
// }

type SelectCountryProps = {
  options: any;
  value: string | number;
  onChange: (value: string | number) => void;
}

function SelectCountry(props: SelectCountryProps) {
  const { onChange = () => {} } = props;

 

  
  const [value, setValue] = useState("")
  const [arr, setArr] = useState([])
  
  const debounceValue = useDebounce(value.toLowerCase(), 500)

  const main = useRef<HTMLDivElement>(null)
  const title = useRef<HTMLDivElement>(null)

  const onSelect = (val: string, name: string) => {
    title.current!.textContent = name
    onChange(val);
  };

  useEffect(() => {
    setArr(props.options.slice(1,).filter(item => item.title.toLowerCase().startsWith(debounceValue)))
  }, [debounceValue])


  let country = debounceValue ? arr : props.options

  const toggle: () => void = () => {
    if (main.current?.getAttribute('data-state') === "active") {
      main.current.setAttribute('data-state', '')
    } else main.current?.setAttribute('data-state', 'active')
  }

  // useEffect(() => {
  //   if(debounceValue) {
  //     country = country.filter(item => item.title.toLowerCase().includes(debounceValue))
  //   }
  // }, [debounceValue])
  

  const cn = bem('SelectCountry');

  return (
    <form >
      <div className={cn()} data-state="" ref={main}>
      <div className={cn("title")} ref={title} data-default={props.options[0].value} onClick={toggle}>
          <span className={cn('code')}>{props.options[0].code}</span>
          <span className={cn('name')}>{props.options[0].title}</span>
        </div>
        <div className={cn('wrapper_out')}>
          <input type='text' className={cn('search')} placeholder='Поиск' onChange={(e) => setValue(e.target.value)}></input>
          <ul>
          {country.map(item => (
            <li>
              <input className={cn('input')} key={item.value} id={item.value} type="checkbox" name="singleSelect"/>
              <label htmlFor={item.value} onClick={() => onSelect(item.value, item.title)}>
                <span className={cn('code')}>{item.code}</span>
                <span className={cn('name')}>{item.title}</span>
              </label>
              <div className={cn('selected')}></div>
            </li>
            // <option key={item.value} value={item.value}>
            //   <div  className='SelectCountry_code'>{item.code}</div>
            //   {item.title}
            // </option>
          ))}
          </ul>
        </div>
      </div>
    </form>
  );
}

export default memo(SelectCountry);


{/* <form>
  <input type="reset" class="reset" value="Clear it!" />
  <div class="__select" data-state="">
    <div class="__select__title" data-default="Option 0">Option 0</div>
    <div class="__select__content">
      <input id="singleSelect0" class="__select__input" type="radio" name="singleSelect" checked />
      <label for="singleSelect0" class="__select__label">Option 0</label>
      <input id="singleSelect1" class="__select__input" type="radio" name="singleSelect" />
      <label for="singleSelect1" class="__select__label">Option 1</label>
      <input id="singleSelect2" class="__select__input" type="radio" name="singleSelect" disabled />
      <label for="singleSelect2" class="__select__label">Option 2 (disabled)</label>
      <input id="singleSelect3" class="__select__input" type="radio" name="singleSelect" />
      <label for="singleSelect3" class="__select__label">Option 3</label>
      <input id="singleSelect4" class="__select__input" type="radio" name="singleSelect" />
      <label for="singleSelect4" class="__select__label">Option 4</label>
    </div>
  </div>
</form> */}