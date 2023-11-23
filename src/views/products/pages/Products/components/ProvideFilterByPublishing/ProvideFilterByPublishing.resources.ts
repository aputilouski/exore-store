import React from 'react';

export type FilterContextType = boolean | undefined;

export const FilterContext = React.createContext<FilterContextType>(undefined);

export const usePublishingFilterValue = () => React.useContext(FilterContext);
