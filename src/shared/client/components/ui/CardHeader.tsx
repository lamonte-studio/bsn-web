import cx from 'classnames';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function CardHeader({ children, className }: Props) {
  return (
    <div
      className={cx(
        'border-b border-b[linear-gradient(90deg,rgba(255,255,255,0.1) 0%,rgba(153,153,153,0.1) 52.4%,rgba(255,255,255,0.1)100%)] mx-5 my-3',
        className,
      )}
    >
      {children}
    </div>
  );
}
