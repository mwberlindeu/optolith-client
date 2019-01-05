import * as React from 'react';
import { UIMessages } from '../../../App/Utils/I18n';
import { Categories } from '../../../constants/Categories';
import { WikiProperty } from '../WikiProperty';

export interface WikiCostProps {
  currentObject: {
    cost: string;
    category: Categories;
  };
  locale: UIMessages;
}

export function WikiCost(props: WikiCostProps) {
  const {
    currentObject: {
      cost,
      category
    },
    locale
  } = props;

  let key: keyof UIMessages = 'info.aecost';

  if (category === Categories.LITURGIES) {
    key = 'info.kpcost';
  }

  return (
    <WikiProperty locale={locale} title={key}>
      {cost}
    </WikiProperty>
  );
}
