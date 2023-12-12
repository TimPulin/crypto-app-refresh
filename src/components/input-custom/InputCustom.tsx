import { ReactElement, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { InputTypeNameEnum } from '../../utils/types';

type InputCustomPropsType = {
  JSXElement?: ReactElement;
  placeholder: string;
  type?: InputTypeNameEnum;
  name: string ;
  value: string | number | undefined;
  regexpTest?: RegExp;
  onChange: (name: string, value: string) => void;
};

const regexpTestInit = /.*/;

export default function InputCustom(props: InputCustomPropsType) {
  const {
    placeholder, JSXElement = null, type = InputTypeNameEnum.text, name, value, regexpTest = regexpTestInit, onChange,
  } = props;

  const [localValue, setLocalValue] = useState(value);

  const setValue = debounce((debounceName, debounceValue) => onChange(debounceName, debounceValue), 100, { leading: true });

  const onChangeLocal = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tempValue = event.target.value;
    if (tempValue.match(regexpTest)) {
      setLocalValue(tempValue);
      setValue(name, tempValue);
    }
  };

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className="input-custom">
      <label className="input-custom__label">
        <input
          className="input-custom__input"
          type={type}
          name={name}
          placeholder={placeholder}
          value={localValue}
          onChange={onChangeLocal}
        />
        {JSXElement}
      </label>
    </div>
  );
}

InputCustom.defaultProps = {
  JSXElement: null,
  type: InputTypeNameEnum.text,
  regexpTest: regexpTestInit,
};
