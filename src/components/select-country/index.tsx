import { memo } from 'react';
import './style.css';
type Options = {
  value: string;
  title: string;
  code: string;
}

type SelectCountryProps = {
  options: Options[];
  value: string | number;
  onChange: (value: string | number) => void;
}
function SelectCountry(props: SelectCountryProps) {
  const { onChange = () => {} } = props;
  const onSelect = e => {
    onChange(e.target.value);
  };

  return (
    <form >
      <div className="SelectCountry">
      <div className="SelectCountry_title" data-default={props.options[0].value}>{props.options[0].title}</div>
      {props.options.splice(1,).map(item => (
        <div className='SelectCountry_content'>
          <input  key={item.value} id={item.value} type="checkbox" name="singleSelect"/>
          <label htmlFor={item.value}>{item.code}{item.title}</label>
        </div>
        // <option key={item.value} value={item.value}>
        //   <div  className='SelectCountry_code'>{item.code}</div>
        //   {item.title}
        // </option>
      ))}
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