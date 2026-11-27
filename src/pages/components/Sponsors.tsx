import { sponsors } from '../../../vocs.config.js'

type Sponsor = { name: string; link: string; image: string }

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  return (
    <a
      href={sponsor.link}
      target="_blank"
      rel="noreferrer noopener"
      className="vocs_Card vocs:flex vocs:items-center vocs:justify-center vocs:rounded-md vocs:bg-surfaceTint/70 vocs:border vocs:border-primary vocs:p-8 vocs:no-underline vocs:transition-colors vocs:hover:bg-surfaceTint"
    >
      <img
        alt={sponsor.name}
        className="h-[40px] brightness-0 dark:invert"
        src={sponsor.image}
      />
    </a>
  )
}

export function SponsorCards() {
  return (
    <div className="vocs:grid vocs:grid-cols-1 vocs:md:grid-cols-2 vocs:gap-4">
      {sponsors.collaborators.map((sponsor) => (
        <SponsorCard key={sponsor.name} sponsor={sponsor} />
      ))}
    </div>
  )
}
