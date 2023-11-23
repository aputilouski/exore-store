import React from 'react';
import { FilterContext, FilterContextType } from './ProvideFilterByPublishing.resources';
import { Checkbox } from '@mantine/core';

const ProvideFilterByPublishing: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [value, setValue] = React.useState<FilterContextType>();

  const handleChange = () => {
    if (value === undefined) setValue(true);
    else if (value === true) setValue(false);
    else setValue(undefined);
  };

  const checked = value === true;
  const indeterminate = value === undefined;

  return (
    <FilterContext.Provider value={value}>
      <div className="my-6 px-2">
        <Checkbox //
          label="Published?"
          checked={checked}
          indeterminate={indeterminate}
          onChange={handleChange}
        />
      </div>
      {children}
    </FilterContext.Provider>
  );
};

export default ProvideFilterByPublishing;
