'use client';

import moment from 'moment';

type Props = {
  date: string;
};

export default function RecentCalendarDateItem({ date }: Props) {
  return (
    <div className="bg-[rgba(13,21,29,0.6)] border border-[rgba(95,93,93,0.17)] flex justify-center items-center rounded-[12px] w-[66px] h-[219px]">
      <h3 className="text-[23px]/6 text-[rgba(255,255,255,0.65)] text-center uppercase">
        {moment(date).format('DD')}
        <br />
        {moment(date).format('MMM')}
      </h3>
    </div>
  );
}
