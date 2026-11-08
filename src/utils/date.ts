/** Characters cycled by the hero's scramble effect. */
export const SCRAMBLE_GLYPHS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&*+=/<>?';

/** Formats an instant as "08 NOV 2026" in the given IANA time zone. */
export function formatDateInZone(instant: Date, timeZone: string): string {
    const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone,
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).formatToParts(instant);
    const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? '';
    return `${part('day')} ${part('month').toUpperCase()} ${part('year')}`;
}
