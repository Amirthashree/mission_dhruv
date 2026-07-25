export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Missions', href: '#missions' },
  { label: 'Telemetry', href: '#telemetry' },
  { label: 'Analytics', href: '#analytics' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const;

export const HERO_STATS = [
  { id: 'active-missions', label: 'Active Missions', value: 12, suffix: '', icon: 'rocket' },
  { id: 'system-health', label: 'System Health', value: 98, suffix: '%', icon: 'pulse' },
  { id: 'monitoring', label: 'Monitoring', value: 247, suffix: 'h', icon: 'satellite' },
] as const;

export const DASHBOARD_CARDS = [
  {
    id: 'active',
    title: 'Active Missions',
    value: 12,
    suffix: '',
    delta: '+2 this week',
    status: 'nominal',
    icon: 'Rocket',
    color: 'cyan',
  },
  {
    id: 'orbital',
    title: 'Orbital Status',
    value: 94,
    suffix: '%',
    delta: 'Stable orbit',
    status: 'nominal',
    icon: 'Orbit',
    color: 'blue',
  },
  {
    id: 'satellites',
    title: 'Satellite Count',
    value: 384,
    suffix: '',
    delta: '+6 deployed',
    status: 'nominal',
    icon: 'Satellite',
    color: 'indigo',
  },
  {
    id: 'fuel',
    title: 'Fuel Reserve',
    value: 76,
    suffix: '%',
    delta: 'Within margin',
    status: 'caution',
    icon: 'Gauge',
    color: 'amber',
  },
  {
    id: 'comms',
    title: 'Communication',
    value: 99,
    suffix: '%',
    delta: 'All channels live',
    status: 'nominal',
    icon: 'Radio',
    color: 'green',
  },
  {
    id: 'data',
    title: 'Data Throughput',
    value: 142,
    suffix: ' TB',
    delta: '+18% today',
    status: 'nominal',
    icon: 'Activity',
    color: 'cyan',
  },
] as const;

export const TIMELINE_PHASES = [
  {
    id: 'launch',
    phase: '01',
    title: 'Launch',
    time: 'T+00:00:00',
    description: 'Ignition sequence initiated. Vehicle clears the tower at full thrust. Telemetry downlink established within 4 seconds of liftoff.',
    status: 'complete',
  },
  {
    id: 'orbit',
    phase: '02',
    title: 'Orbit Insertion',
    time: 'T+00:08:42',
    description: 'Main engine cutoff. Second-stage burn places vehicle into a 420km low Earth orbit. Solar arrays deployed and locked.',
    status: 'complete',
  },
  {
    id: 'dock',
    phase: '03',
    title: 'Docking',
    time: 'T+27:14:08',
    description: 'Automated rendezvous with orbital station. Soft capture confirmed. Hard dock and pressure equalization complete.',
    status: 'active',
  },
  {
    id: 'research',
    phase: '04',
    title: 'Research Operations',
    time: 'T+48:00:00',
    description: 'Payload activation. Scientific instruments running continuous microgravity experiments and Earth observation sweeps.',
    status: 'pending',
  },
  {
    id: 'return',
    phase: '05',
    title: 'Return',
    time: 'T+168:00:00',
    description: 'Deorbit burn. Re-entry interface at 120km. Parachute deploy and splashdown recovery within primary zone.',
    status: 'pending',
  },
] as const;

export const SATELLITES = [
  { id: 'DHRUV-01', x: 120, y: 90, status: 'nominal', band: 'Ku', coverage: 'Asia-Pacific' },
  { id: 'DHRUV-02', x: 280, y: 140, status: 'nominal', band: 'Ka', coverage: 'Europe' },
  { id: 'DHRUV-03', x: 440, y: 80, status: 'caution', band: 'X', coverage: 'Americas' },
  { id: 'DHRUV-04', x: 580, y: 160, status: 'nominal', band: 'Ku', coverage: 'Atlantic' },
  { id: 'DHRUV-05', x: 200, y: 240, status: 'nominal', band: 'Ka', coverage: 'Africa' },
  { id: 'DHRUV-06', x: 380, y: 200, status: 'nominal', band: 'X', coverage: 'Indian Ocean' },
  { id: 'DHRUV-07', x: 520, y: 260, status: 'nominal', band: 'Ku', coverage: 'Pacific' },
  { id: 'DHRUV-08', x: 150, y: 320, status: 'offline', band: 'Ka', coverage: 'Polar' },
] as const;

export const COVERAGE_NODES = [
  { id: 'houston', name: 'Houston Control', x: 22, y: 42 },
  { id: 'kourou', name: 'Kourou Spaceport', x: 34, y: 55 },
  { id: 'baikonur', name: 'Baikonur Cosmodrome', x: 60, y: 38 },
  { id: 'tanegashima', name: 'Tanegashima', x: 80, y: 44 },
  { id: 'sriharikota', name: 'Sriharikota', x: 68, y: 56 },
  { id: 'cape', name: 'Cape Canaveral', x: 24, y: 44 },
] as const;

export const COVERAGE_LINKS = [
  ['houston', 'baikonur'],
  ['houston', 'kourou'],
  ['baikonur', 'tanegashima'],
  ['tanegashima', 'sriharikota'],
  ['sriharikota', 'kourou'],
  ['cape', 'houston'],
] as const;

export const AI_METRICS = [
  {
    id: 'risk',
    title: 'Mission Risk',
    value: 18,
    suffix: '%',
    status: 'low',
    recommendation: 'All subsystems within nominal parameters. No corrective action required for current orbital pass.',
    icon: 'ShieldCheck',
    color: 'green',
  },
  {
    id: 'weather',
    title: 'Weather Forecast',
    value: 92,
    suffix: '%',
    status: 'nominal',
    recommendation: 'Upper-atmosphere winds stable at 14 knots. Launch window remains green for the next 6 hours.',
    icon: 'CloudSun',
    color: 'cyan',
  },
  {
    id: 'comms',
    title: 'Communication',
    value: 99,
    suffix: '%',
    status: 'nominal',
    recommendation: 'Deep-space network handoff complete. Signal strength holding at -92 dBm across all channels.',
    icon: 'Radio',
    color: 'blue',
  },
  {
    id: 'power',
    title: 'Power Systems',
    value: 87,
    suffix: '%',
    status: 'nominal',
    recommendation: 'Solar array generating 4.2 kW. Battery reserve at 87%. No load-shedding anticipated this orbit.',
    icon: 'Zap',
    color: 'amber',
  },
  {
    id: 'navigation',
    title: 'Navigation',
    value: 99,
    suffix: '%',
    status: 'nominal',
    recommendation: 'Star tracker locked. IMU drift within 0.001°/hr. Course correction scheduled at next apogee.',
    icon: 'Compass',
    color: 'indigo',
  },
] as const;

export const TELEMETRY_FEED = [
  { time: '14:02:11', channel: 'DHRUV-01', message: 'Orbital position confirmed at 412.3 km', level: 'info' },
  { time: '14:02:34', channel: 'DHRUV-03', message: 'Solar panel angle adjusted +2.1°', level: 'info' },
  { time: '14:03:02', channel: 'MISSION-CTRL', message: 'Telemetry packet received — all systems nominal', level: 'success' },
  { time: '14:03:47', channel: 'DHRUV-08', message: 'Signal degradation detected — switching to backup band', level: 'warning' },
  { time: '14:04:15', channel: 'DHRUV-02', message: 'Thermal control nominal — 21.4°C', level: 'info' },
  { time: '14:04:52', channel: 'DHRUV-05', message: 'Payload data downlink complete — 2.4 GB', level: 'success' },
  { time: '14:05:30', channel: 'MISSION-CTRL', message: 'Ground station handoff: Madrid → Goldstone', level: 'info' },
  { time: '14:06:08', channel: 'DHRUV-07', message: 'Reaction wheel recalibration complete', level: 'success' },
] as const;
