import { useEffect, useRef } from 'react';
import { ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

const OWNER = 'Mohanad Abubaker';
const NOTICE = 'These ideas, designs and models may not be used, copied or imitated without prior permission or notice.';

type Props = { owner?: string; className?: string };

// Static rights notice shown under the home projects grid and at the bottom of every project page.
export const RightsNotice = ({ owner, className = '' }: Props) => (
  <aside
    aria-label="Rights notice"
    className={`flex items-start gap-3 rounded-xl border border-primary/40 bg-primary/10 p-4 text-sm text-muted-foreground ${className}`}
  >
    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
    <p>
      <span className="font-medium text-foreground">
        © {new Date().getFullYear()} {owner ?? OWNER}. All rights reserved to the project owner.
      </span>{' '}
      {NOTICE}
    </p>
  </aside>
);

/** Shows the rights notice as a pop-up the first time (per page load) the returned element scrolls into view. */
export function useRightsToast<T extends Element>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        toast(`© ${new Date().getFullYear()} ${OWNER} — All rights reserved`, {
          description: `All rights belong to the project owners. ${NOTICE}`,
          icon: <ShieldCheck className="h-5 w-5 text-accent" aria-hidden="true" />,
          duration: 9000,
          closeButton: true,
          className: '!border-primary/60 !shadow-[0_0_30px_hsl(var(--primary)/0.35)]',
        });
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}
