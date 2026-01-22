'use client';

import moment from 'moment';
import { MatchType } from '@/match/types';
import DefaultSlider from '@/shared/client/components/slider/DefaultSlider';

type Props = {
  items: MatchType[];
};

export default function DailyMatchesSlider({ items }: Props) {
  return (
    <DefaultSlider
      data={items}
      render={(item: MatchType) => (
        <div>
          {moment(item.startAt).format('HH:mm')}
        </div>
      )}
    />
  );
}
