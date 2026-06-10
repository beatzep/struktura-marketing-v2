export const PORTAL_URL = 'https://portal.struktura-digital.de/login'
export const CONTACT_EMAIL = 'info@struktura-digital.de'

export const NAV_LINKS = [
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Über uns', href: '#vertrauen' },
  { label: 'Kontakt', href: '#kontakt' },
] as const

export const PAIN_POINTS = [
  {
    icon: 'table',
    title: 'Excel-Chaos',
    description:
      'Mehrere parallele Listen, keine Single Source of Truth. Wer hat die aktuelle Version?',
  },
  {
    icon: 'message-circle',
    title: 'Mündliche Übergaben',
    description:
      'Statusupdates zwischen Tür und Angel. Nichts ist dokumentiert, nichts nachvollziehbar.',
  },
  {
    icon: 'clock',
    title: '52 Minuten pro Tag',
    description:
      'Täglicher Abstimmungsaufwand für Dinge, die längst automatisch laufen sollten.',
  },
] as const

export const MODULES = [
  {
    title: 'Mandantenverwaltung',
    description:
      'Alle Fälle, alle Status, ein System. Echtzeit-Überblick statt Excel-Chaos.',
    features: ['Statusverfolgung', 'Rollenbasiert', 'CSV-Import'],
    gradient: 'from-navy-50 to-navy-100',
  },
  {
    title: 'Terminplanassistent',
    description:
      'Online-Buchung, automatische Zuordnung, Statusverwaltung — alles an einem Ort.',
    features: ['Öffentliche Buchung', 'Slot-Verwaltung', 'Bearbeiter-Zuweisung'],
    gradient: 'from-navy-50 to-sand-100',
  },
  {
    title: 'Erinnerungslogik',
    description:
      'Automatische Fristen, eskalierte Erinnerungen, kein manuelles Nachverfolgen.',
    features: ['Konfigurierbare Schwellen', 'Mehrstufig', 'Pausierbar'],
    gradient: 'from-sand-100 to-navy-50',
  },
  {
    title: 'Reporting & Dashboards',
    description:
      'KPIs auf einen Blick. Fortschritt messbar machen, Engpässe erkennen.',
    features: ['Donut-Charts', 'Ampelsystem', 'Bearbeitungsjahr-Filter'],
    gradient: 'from-navy-50 to-sand-50',
  },
] as const

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Analyse',
    description:
      'Wir analysieren Ihre bestehenden Abläufe und identifizieren konkretes Optimierungspotenzial.',
    duration: 'ca. 2–3 Tage',
  },
  {
    number: '02',
    title: 'Konfiguration',
    description:
      'Wir konfigurieren die Module passend zu Ihren Prozessen. Setup in unter einer Woche.',
    duration: 'ca. 3–5 Tage',
  },
  {
    number: '03',
    title: 'Go-Live',
    description:
      'Ihr Team arbeitet ab Tag 1 im neuen System. Onboarding und Support inklusive.',
    duration: 'ab Tag 1',
  },
] as const
