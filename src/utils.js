import { FREQ_OPTIONS } from './data.js';

export function freqHours(id) {
  for (let i = 0; i < FREQ_OPTIONS.length; i++) {
    if (FREQ_OPTIONS[i].id === id) return FREQ_OPTIONS[i].hours;
  }
  return 24;
}

export function freqLabel(id) {
  for (let i = 0; i < FREQ_OPTIONS.length; i++) {
    if (FREQ_OPTIONS[i].id === id) return FREQ_OPTIONS[i].label;
  }
  return id;
}

export function formatAgo(ts) {
  if (!ts) return "Never logged";
  const ms = Date.now() - ts;
  if (ms < 60000) return "Just now";
  const m = Math.floor(ms / 60000);
  if (m < 60) return m + "m ago";
  const h = Math.floor(m / 60);
  if (h < 24) return h + "h " + (m % 60) + "m ago";
  const d = Math.floor(h / 24);
  return d + "d " + (h % 24) + "h ago";
}

export function formatDueIn(ms) {
  if (ms <= 0) {
    const over = Math.abs(ms);
    const m = Math.floor(over / 60000);
    if (m < 60) return "Overdue " + m + "m";
    const h = Math.floor(m / 60);
    if (h < 24) return "Overdue " + h + "h " + (m % 60) + "m";
    const d = Math.floor(h / 24);
    return "Overdue " + d + "d";
  }
  const m = Math.floor(ms / 60000);
  if (m < 60) return "In " + m + "m";
  const h = Math.floor(m / 60);
  if (h < 24) return "In " + h + "h " + (m % 60) + "m";
  const d = Math.floor(h / 24);
  return "In " + d + "d " + (h % 24) + "h";
}

export function dueColor(ms, frequencyHours) {
  const freqMs = frequencyHours * 3600 * 1000;
  if (ms <= 0) return "#F87171";
  if (ms < freqMs * 0.15) return "#FCD34D";
  return "#5EEAD4";
}

function icsFreqRule(freqId) {
  if (freqId === "daily") return "FREQ=DAILY";
  if (freqId === "twice-daily") return "FREQ=DAILY;INTERVAL=1";
  if (freqId === "eod") return "FREQ=DAILY;INTERVAL=2";
  if (freqId === "3x-week") return "FREQ=WEEKLY;BYDAY=MO,WE,FR";
  if (freqId === "weekly") return "FREQ=WEEKLY";
  return "FREQ=DAILY";
}

function icsFormatDate(d) {
  const pad = (n) => (n < 10 ? "0" : "") + n;
  return d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + "00Z";
}

export function downloadReminder(entry, peptideName) {
  const freqH = freqHours(entry.frequency);
  let startMs = entry.lastInjection ? entry.lastInjection + freqH * 3600 * 1000 : Date.now() + freqH * 3600 * 1000;
  while (startMs < Date.now()) startMs += freqH * 3600 * 1000;
  const start = new Date(startMs);
  const end = new Date(startMs + 15 * 60 * 1000);
  const summary = peptideName + " — " + entry.dose + " " + entry.doseUnit;
  const desc = "Scheduled from Peptide Reference Guide My Stack." + (entry.notes ? " Notes: " + entry.notes : "");
  const lines = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//PeptideReferenceGuide//MyStack//EN", "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    "UID:" + entry.id + "@peptideguide",
    "DTSTAMP:" + icsFormatDate(new Date()),
    "DTSTART:" + icsFormatDate(start),
    "DTEND:" + icsFormatDate(end),
    "RRULE:" + icsFreqRule(entry.frequency),
    "SUMMARY:" + summary.replace(/,/g, "\\,").replace(/\n/g, " "),
    "DESCRIPTION:" + desc.replace(/,/g, "\\,").replace(/\n/g, " "),
    "BEGIN:VALARM", "ACTION:DISPLAY", "DESCRIPTION:" + summary.replace(/,/g, "\\,"), "TRIGGER:-PT0M", "END:VALARM",
    "END:VEVENT", "END:VCALENDAR"
  ];
  const ics = lines.join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "peptide-" + entry.pepId + ".ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
