import './Aurora.css';

interface AuroraProps {
  className?: string;
}

export default function Aurora({ className = '' }: AuroraProps) {
  return (
    <div className={`aurora-bg ${className}`} aria-hidden="true">
      <div className="aurora-bg__layer aurora-bg__layer--1" />
      <div className="aurora-bg__layer aurora-bg__layer--2" />
      <div className="aurora-bg__layer aurora-bg__layer--3" />
      <div className="aurora-bg__layer aurora-bg__layer--4" />
      <div className="aurora-bg__vignette" />
    </div>
  );
}
