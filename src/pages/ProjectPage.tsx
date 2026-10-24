import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getProject, PROJECTS, type Project, type ProjectSection } from '@/data/projects';
import { scrollToSection } from '@/lib/scrollToSection';
import { usePageMeta } from '@/lib/usePageMeta';
import NotFound from './NotFound';

const SITE = 'https://mohanadportfolio.lovable.app';

const Section = ({ s }: { s: ProjectSection }) => (
  <section className="rounded-2xl border border-primary/40 bg-background/70 p-6 md:p-8">
    <h2 className="font-display text-3xl text-foreground mb-4">{s.heading}</h2>
    {s.paragraphs?.map((p) => (
      <p key={p} className="text-muted-foreground leading-relaxed mb-4 last:mb-0">
        {p}
      </p>
    ))}
    {s.table && (
      <div className="overflow-x-auto mb-4 last:mb-0">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              {s.table.head.map((h, i) => (
                <th key={i} scope="col" className="text-start p-3 border-b border-primary/60 text-accent font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {s.table.rows.map((row) => (
              <tr key={row.join('|')}>
                {row.map((cell, i) => (
                  <td
                    key={i}
                    className={`p-3 border-b border-primary/20 align-top ${i === 0 ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
    {s.bullets && (
      <ul className="space-y-2">
        {s.bullets.map((b) => (
          <li key={b} className="flex gap-3 text-muted-foreground leading-relaxed">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    )}
  </section>
);

const ProjectPage = () => {
  const { slug } = useParams();
  const project = getProject(slug);
  if (!project) return <NotFound />;
  return <ProjectDetail key={project.slug} project={project} />;
};

const ProjectDetail = ({ project }: { project: Project }) => {
  const url = `${SITE}/projects/${project.slug}`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  usePageMeta({
    title: project.metaTitle,
    description: project.metaDescription,
    url,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.title,
      headline: project.metaTitle,
      description: project.metaDescription,
      keywords: project.keywords,
      url,
      author: { '@type': 'Person', name: 'Mohanad Abubaker', url: `${SITE}/` },
      ...(project.image ? { image: `${SITE}${project.image.src}` } : {}),
    },
  });

  const others = PROJECTS.filter((p) => p.slug !== project.slug);

  return (
    <main className="min-h-screen text-foreground">
      <article className="container mx-auto max-w-4xl px-6 py-16">
        <nav aria-label="Breadcrumb" className="mb-10">
          <Link
            to="/"
            onClick={() => scrollToSection('projects')}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to portfolio
          </Link>
        </nav>

        <header className="mb-12">
          <p className="text-sm uppercase tracking-widest text-accent mb-3">{project.subtitle}</p>
          <h1 className="font-display text-5xl md:text-7xl leading-none mb-6">{project.title}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">{project.intro}</p>
          <dl className="flex flex-wrap gap-x-8 gap-y-2 text-sm mb-6">
            <div>
              <dt className="inline text-accent">Status: </dt>
              <dd className="inline text-foreground">{project.status}</dd>
            </div>
            <div>
              <dt className="inline text-accent">Team: </dt>
              <dd className="inline text-foreground">{project.team ?? 'Mohanad Abubaker'}</dd>
            </div>
          </dl>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((t) => (
              <span key={t} className="rounded-md bg-primary/20 border border-primary/50 px-2 py-0.5 text-xs text-foreground">
                {t}
              </span>
            ))}
          </div>
          {project.link && (
            <a
              href={project.link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-shadow hover:shadow-[0_0_30px_hsl(var(--primary)/0.6)]"
            >
              {project.link.label} <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </header>

        {project.image && (
          <figure className="mb-12">
            <img
              src={project.image.src}
              alt={project.image.alt}
              width={project.image.width}
              height={project.image.height}
              loading="lazy"
              decoding="async"
              className="mx-auto max-h-[560px] w-auto rounded-2xl border border-primary/50"
            />
            <figcaption className="mt-3 text-center text-sm text-muted-foreground">{project.image.caption}</figcaption>
          </figure>
        )}

        <div className="space-y-6">
          {project.sections.map((s) => (
            <Section key={s.heading} s={s} />
          ))}
        </div>

        <footer className="mt-16 border-t border-primary/30 pt-8">
          <h2 className="font-display text-2xl mb-4">More projects</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {others.map((p) => (
              <li key={p.slug}>
                <Link
                  to={`/projects/${p.slug}`}
                  className="block rounded-xl border border-primary/40 p-4 transition-colors hover:border-primary hover:bg-primary/10"
                >
                  <span className="font-display text-xl text-foreground">{p.title}</span>
                  <span className="block text-sm text-accent">{p.subtitle}</span>
                </Link>
              </li>
            ))}
          </ul>
        </footer>
      </article>
    </main>
  );
};

export default ProjectPage;
