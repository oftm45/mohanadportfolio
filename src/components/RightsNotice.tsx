import { ShieldCheck } from 'lucide-react';

type Props = { owner?: string; className?: string };

// Rights notice shown on the projects list and every project page.
export const RightsNotice = ({ owner, className = '' }: Props) => (
  <aside
    aria-label="Rights notice"
    className={`flex items-start gap-3 rounded-xl border border-primary/40 bg-primary/10 p-4 text-sm text-muted-foreground ${className}`}
  >
    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
    <p>
      <span className="font-medium text-foreground">
        © {new Date().getFullYear()} {owner ?? 'Mohanad Abubaker'}. All rights reserved to the project owner.
      </span>{' '}
      These ideas, designs and models may not be used, copied or imitated without prior permission or notice.
    </p>
  </aside>
);
