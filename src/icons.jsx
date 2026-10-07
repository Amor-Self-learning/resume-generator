import { iconNames, paths } from './iconData'

export function Icon({ name = 'spark', size = 18, strokeWidth = 1.6, title }) {
  const index = Math.max(0, iconNames.indexOf(name))
  const path = paths[index % paths.length]
  return <svg aria-hidden={!title} aria-label={title} width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><path d={path} /></svg>
}
