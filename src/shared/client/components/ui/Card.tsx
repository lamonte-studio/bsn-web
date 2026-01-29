import cx from 'classnames';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className }: Props) {
  return (
    <div
      className={cx(
        'bg-[rgba(54,54,54,0.3)] border border-[rgba(125,125,125,0.13)] rounded-[12px]',
        className,
      )}
      style={{ backdropFilter: 'blur(40px)' }}
    >
      {children}
    </div>
  );
}
