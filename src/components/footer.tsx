const FOOTER_COLUMNS = [
  {
    heading: 'Produkt',
    links: [
      { label: 'Leistungen', href: '#leistungen' },
      { label: 'Preise', href: '#kontakt' },
      { label: 'Roadmap', href: '#kontakt' },
    ],
  },
  {
    heading: 'Unternehmen',
    links: [
      { label: 'Über uns', href: '#vertrauen' },
      { label: 'Kontakt', href: '#kontakt' },
      { label: 'Blog', href: '#' },
    ],
  },
  {
    heading: 'Rechtliches',
    links: [
      { label: 'Impressum', href: '/impressum' },
      { label: 'Datenschutz', href: '/datenschutz' },
      { label: 'AGB', href: '/agb' },
    ],
  },
] as const

export function Footer() {
  return (
    <footer className="border-t-[0.5px] border-sand-300 bg-white py-20">
      <div className="mx-auto grid max-w-content gap-12 px-6 md:grid-cols-4 md:px-10">
        <div>
          <p className="font-heading text-xl font-bold text-ink">Struktura</p>
          <p className="mt-3 max-w-[220px] text-caption text-ink">
            Operational Systems for Growing Businesses
          </p>
          <p className="mt-8 text-caption text-ink">
            © 2026 Struktura Digital
            <br />
            Edis Herrmann
          </p>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <div key={col.heading}>
            <p className="overline-label text-navy-400">{col.heading}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-caption text-navy-600 transition-colors hover:text-navy-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  )
}
