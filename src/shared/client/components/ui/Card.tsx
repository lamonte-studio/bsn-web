import cx from 'classnames';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className }: Props) {
  return (
    <div
      className={cx(
        'bg-[rgba(54,54,54,0.1)] border border-[rgba(125,125,125,0.13)] rounded-xl',
        className,
      )}
    >
      {children}
    </div>
  );
}
