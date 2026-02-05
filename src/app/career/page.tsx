import Link from 'next/link';
import { getMDXPostsByCategory } from '@/utils/mdxUtils';
import {
  companyDetails,
  companyOrder,
  projectCompanyMap,
  type CompanyKey,
} from '@/data/careerData';

export const metadata = {
  title: 'Career Timeline | Demo Web Service',
  description: 'My professional background, experience, and project portfolio.',
};

export default function CareerPage() {
  const allCareerPosts = getMDXPostsByCategory('career');

  // Group posts by company
  const postsByCompany: Record<CompanyKey, typeof allCareerPosts> = {
    dasanNetworks: [],
    anyData: [],
    westernDigital: [],
    greenWaveRadio: [],
  };

  for (const post of allCareerPosts) {
    const company = projectCompanyMap[post.slug];
    if (company) {
      postsByCompany[company].push(post);
    }
  }

  return (
    <div className="career-page-container">
      {/* Fixed position spacer */}
      <div className="h-[120px] w-full" aria-hidden="true" />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Page header */}
          <h1 className="section-heading mb-12">
            <span className="number">02.</span> Career Timeline
          </h1>

          {/* Horizontal timeline bar */}
          <div className="relative mb-16 px-4">
            {/* Timeline line */}
            <div className="absolute top-3 left-0 right-0 h-[2px] bg-[var(--lightest-navy)]" />

            <div className="relative flex justify-between items-start">
              {companyOrder.map((key) => {
                const detail = companyDetails[key];
                const projectCount = postsByCompany[key].length;
                return (
                  <a
                    key={key}
                    href={`#company-${key}`}
                    className="relative flex flex-col items-center group no-underline"
                  >
                    {/* Dot */}
                    <span
                      className="w-4 h-4 rounded-full border-2 border-[var(--green)] bg-[var(--navy)] group-hover:bg-[var(--green)] transition-all z-10"
                      style={{ boxShadow: 'none' }}
                    />
                    {/* Label (hidden on very small screens) */}
                    <span className="hidden sm:flex flex-col items-center mt-2 text-center">
                      <span className="text-xs font-mono text-[var(--lightest-slate)] group-hover:text-[var(--green)] transition-colors">
                        {detail.yearStart}
                      </span>
                      <span className="text-xs font-mono text-[var(--slate)]">
                        {detail.companyShort}
                      </span>
                      {projectCount > 0 && (
                        <span className="text-[10px] font-mono text-[var(--light-slate)]">
                          {projectCount} project{projectCount !== 1 ? 's' : ''}
                        </span>
                      )}
                    </span>
                  </a>
                );
              })}
              {/* "Now" endpoint */}
              <div className="relative flex flex-col items-center">
                <span className="w-4 h-4 rounded-full bg-[var(--green)] timeline-dot-active z-10" />
                <span className="hidden sm:block mt-2 text-xs font-mono text-[var(--green)]">
                  Now
                </span>
              </div>
            </div>
          </div>

          {/* Company sections */}
          {companyOrder.slice().reverse().map((key, sectionIdx) => {
            const detail = companyDetails[key];
            const posts = postsByCompany[key];

            return (
              <section
                key={key}
                id={`company-${key}`}
                className="mb-16 scroll-mt-32"
              >
                {/* Company header */}
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: detail.color }}
                  />
                  <div>
                    <h2 className="text-xl text-[var(--lightest-slate)] mb-0">
                      {detail.company}
                      <span className="text-[var(--slate)] font-normal text-base ml-2">
                        — {detail.title}
                      </span>
                    </h2>
                    <p className="font-mono text-xs text-[var(--light-slate)]">
                      {detail.period}
                    </p>
                  </div>
                </div>

                {/* Tech stack badges */}
                <div className="flex flex-wrap gap-2 mb-5 ml-6">
                  {detail.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2.5 py-1 rounded-full bg-[var(--green-tint)] text-[var(--green)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Achievements */}
                {detail.achievements.length > 0 && (
                  <ul className="space-y-2 mb-6 ml-6">
                    {detail.achievements.map((achievement, i) => (
                      <li key={i} className="text-[var(--slate)] flex items-start">
                        <span className="text-[var(--green)] mr-2 translate-y-0.5">▹</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Project card grid */}
                {posts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ml-6">
                    {posts.map((post, i) => (
                      <Link
                        key={post.slug}
                        href={`/career/${post.slug}`}
                        className="animate-fadeIn block rounded-lg border border-[var(--lightest-navy)] bg-[var(--light-navy)] p-4 hover:border-[var(--green)] transition-all no-underline group"
                        style={{
                          animationDelay: `${(sectionIdx * 3 + i) * 100}ms`,
                          opacity: 0,
                        }}
                      >
                        <h3 className="text-sm font-semibold text-[var(--lightest-slate)] group-hover:text-[var(--green)] transition-colors mb-1">
                          {post.title}
                        </h3>
                        {post.subtitle && (
                          <p className="text-xs text-[var(--slate)] mb-2 line-clamp-2">
                            {post.subtitle}
                          </p>
                        )}
                        {post.excerpt && !post.subtitle && (
                          <p className="text-xs text-[var(--slate)] mb-2 line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-1">
                          {(post.tags || []).slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-mono text-[var(--light-slate)] bg-[var(--lightest-navy)] px-1.5 py-0.5 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="text-xs font-mono text-[var(--green)] mt-2 opacity-0 group-hover:opacity-100 transition-opacity block">
                          Read more &rarr;
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[var(--light-slate)] italic ml-6">
                    Detailed project writeups coming soon.
                  </p>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
