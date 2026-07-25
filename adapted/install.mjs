#!/usr/bin/env node
// Personal skill-pack installer.
//
// Installs the adapted engineering pack (this repo) and the adapted caveman
// pack (sibling fork) into the shared Claude config dir used by BOTH the
// Claude Code CLI and Claude Desktop.
//
// Copies rather than symlinks: Windows symlink creation needs either developer
// mode or elevation, and this must never need a UAC prompt. Re-run after a
// `git pull` to resync.
//
//   node adapted/install.mjs              # install
//   node adapted/install.mjs --dry-run    # show what would change
//   node adapted/install.mjs --uninstall  # remove everything it installed
//
// Env:
//   CLAUDE_CONFIG_DIR   override ~/.claude
//   CAVEMAN_SRC         override ../caveman/adapted

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '..');

const CONFIG_DIR = process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), '.claude');
const SKILLS_DEST = path.join(CONFIG_DIR, 'skills');
const AGENTS_DEST = path.join(CONFIG_DIR, 'agents');
const HOOKS_DEST = path.join(CONFIG_DIR, 'hooks');
const SETTINGS = path.join(CONFIG_DIR, 'settings.json');
const BACKUPS = path.join(CONFIG_DIR, 'backups');
const MANIFEST = path.join(CONFIG_DIR, '.skillpack-manifest.json');

const CAVEMAN_REPO = process.env.CAVEMAN_SRC
  ? path.resolve(process.env.CAVEMAN_SRC, '..')
  : path.resolve(REPO, '..', 'caveman');
const CAVEMAN_SRC = process.env.CAVEMAN_SRC || path.join(CAVEMAN_REPO, 'adapted');
const CAVEMAN_AGENTS = path.join(CAVEMAN_REPO, 'adapted-agents');
const CAVEMAN_HOOKS = path.join(CAVEMAN_REPO, 'src', 'hooks');

// Hook files the caveman runtime needs. Statusline ships in both flavours so a
// roaming config dir keeps working across platforms.
const HOOK_FILES = [
  'package.json',
  'caveman-config.js',
  'caveman-activate.js',
  'caveman-mode-tracker.js',
  'caveman-stats.js',
  'caveman-statusline.sh',
  'caveman-statusline.ps1',
  'cavecrew-model-overrides.js',
];

const args = new Set(process.argv.slice(2));
const DRY = args.has('--dry-run');
const UNINSTALL = args.has('--uninstall');

const log = (...a) => console.log(...a);
const act = (msg) => log(DRY ? `  [dry-run] ${msg}` : `  ${msg}`);

// ── fs helpers ─────────────────────────────────────────────────────────────

function skillDirs(src) {
  if (!fs.existsSync(src)) return [];
  return fs
    .readdirSync(src, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(src, d.name, 'SKILL.md')))
    .map((d) => d.name);
}

function copyDir(from, to) {
  if (DRY) return;
  fs.rmSync(to, { recursive: true, force: true });
  fs.cpSync(from, to, { recursive: true });
}

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
}

function backup(file) {
  if (!fs.existsSync(file)) return null;
  const dest = path.join(BACKUPS, `${path.basename(file)}.${timestamp()}`);
  if (!DRY) {
    fs.mkdirSync(BACKUPS, { recursive: true });
    fs.copyFileSync(file, dest);
  }
  return dest;
}

// Claude Code's settings schema is strict — a malformed file is silently
// discarded in full, taking the user's permissions with it. Never write
// without parsing back.
function readSettings() {
  if (!fs.existsSync(SETTINGS)) return {};
  const raw = fs.readFileSync(SETTINGS, 'utf8');
  try {
    return JSON.parse(raw);
  } catch (e) {
    throw new Error(
      `${SETTINGS} is not valid JSON (${e.message}). Refusing to touch it — fix or move it first.`
    );
  }
}

function writeSettings(settings) {
  const text = JSON.stringify(settings, null, 2) + '\n';
  JSON.parse(text); // prove it round-trips before it lands
  if (!DRY) fs.writeFileSync(SETTINGS, text);
}

// ── hook wiring ────────────────────────────────────────────────────────────

const MARKER = 'caveman'; // substring identifying hook entries we own

function hookCommand(script) {
  return `node "${path.join(HOOKS_DEST, script)}"`;
}

function stripOurHooks(settings) {
  if (!settings.hooks) return settings;
  for (const event of Object.keys(settings.hooks)) {
    const groups = Array.isArray(settings.hooks[event]) ? settings.hooks[event] : [];
    const kept = groups
      .map((g) => ({
        ...g,
        hooks: (g.hooks || []).filter((h) => !String(h.command || '').includes(MARKER)),
      }))
      .filter((g) => (g.hooks || []).length > 0);
    if (kept.length) settings.hooks[event] = kept;
    else delete settings.hooks[event];
  }
  if (Object.keys(settings.hooks).length === 0) delete settings.hooks;
  return settings;
}

function addHook(settings, event, script, statusMessage) {
  settings.hooks ??= {};
  settings.hooks[event] ??= [];
  settings.hooks[event].push({
    hooks: [
      { type: 'command', command: hookCommand(script), timeout: 5, statusMessage },
    ],
  });
}

function statusLineCommand() {
  return process.platform === 'win32'
    ? `powershell -ExecutionPolicy Bypass -File "${path.join(HOOKS_DEST, 'caveman-statusline.ps1')}"`
    : `bash "${path.join(HOOKS_DEST, 'caveman-statusline.sh')}"`;
}

// caveman ships default-on. This install is opt-in: normal prose until the
// master asks for compression.
function writeCavemanConfig() {
  const dir =
    process.platform === 'win32'
      ? path.join(process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming'), 'caveman')
      : path.join(process.env.XDG_CONFIG_HOME || path.join(os.homedir(), '.config'), 'caveman');
  const file = path.join(dir, 'config.json');
  let cfg = {};
  if (fs.existsSync(file)) {
    try {
      cfg = JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch {
      cfg = {};
    }
  }
  if (cfg.defaultMode === undefined) cfg.defaultMode = 'off';
  act(`caveman config: defaultMode=${cfg.defaultMode} → ${file}`);
  if (!DRY) {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(file, JSON.stringify(cfg, null, 2) + '\n');
  }
  return file;
}

// ── install / uninstall ────────────────────────────────────────────────────

function install() {
  const installed = { skills: [], agents: [], hooks: [] };

  const sources = [
    { label: 'engineering', dir: HERE, skip: new Set() },
    { label: 'caveman', dir: CAVEMAN_SRC, skip: new Set() },
  ];

  log('\nSkills →', SKILLS_DEST);
  if (!DRY) fs.mkdirSync(SKILLS_DEST, { recursive: true });
  for (const src of sources) {
    const names = skillDirs(src.dir);
    if (!names.length) {
      log(`  (none found in ${src.dir})`);
      continue;
    }
    for (const name of names) {
      copyDir(path.join(src.dir, name), path.join(SKILLS_DEST, name));
      installed.skills.push(name);
      act(`${src.label}: ${name}`);
    }
  }

  log('\nAgents →', AGENTS_DEST);
  if (fs.existsSync(CAVEMAN_AGENTS)) {
    if (!DRY) fs.mkdirSync(AGENTS_DEST, { recursive: true });
    for (const f of fs.readdirSync(CAVEMAN_AGENTS).filter((f) => f.endsWith('.md'))) {
      if (!DRY) fs.copyFileSync(path.join(CAVEMAN_AGENTS, f), path.join(AGENTS_DEST, f));
      installed.agents.push(f);
      act(f);
    }
  } else {
    log(`  (none — ${CAVEMAN_AGENTS} missing)`);
  }

  log('\nHooks →', HOOKS_DEST);
  let hooksOk = fs.existsSync(CAVEMAN_HOOKS);
  if (hooksOk) {
    if (!DRY) fs.mkdirSync(HOOKS_DEST, { recursive: true });
    for (const f of HOOK_FILES) {
      const from = path.join(CAVEMAN_HOOKS, f);
      if (!fs.existsSync(from)) {
        log(`  ! missing ${f} — skipped`);
        continue;
      }
      if (!DRY) fs.copyFileSync(from, path.join(HOOKS_DEST, f));
      installed.hooks.push(f);
      act(f);
    }
  } else {
    log(`  (skipped — ${CAVEMAN_HOOKS} missing; caveman toggle will not work)`);
  }

  log('\nSettings →', SETTINGS);
  const bak = backup(SETTINGS);
  if (bak) act(`backed up to ${bak}`);
  const settings = stripOurHooks(readSettings());
  if (hooksOk) {
    addHook(settings, 'SessionStart', 'caveman-activate.js', 'Loading caveman mode...');
    addHook(settings, 'UserPromptSubmit', 'caveman-mode-tracker.js', 'Tracking caveman mode...');
    act('SessionStart + UserPromptSubmit hooks wired');
    if (!settings.statusLine) {
      settings.statusLine = { type: 'command', command: statusLineCommand() };
      act('statusLine configured');
    } else {
      act('statusLine already set — left alone');
    }
  }
  writeSettings(settings);

  log('');
  writeCavemanConfig();

  if (!DRY) {
    fs.writeFileSync(
      MANIFEST,
      JSON.stringify({ installedAt: new Date().toISOString(), repo: REPO, ...installed }, null, 2) + '\n'
    );
  }

  log(
    `\n${DRY ? 'Would install' : 'Installed'}: ${installed.skills.length} skills, ` +
      `${installed.agents.length} agents, ${installed.hooks.length} hook files.`
  );
  if (!DRY) log('Restart Claude Code / Claude Desktop to pick them up.');
}

function uninstall() {
  if (!fs.existsSync(MANIFEST)) {
    log('No manifest found — nothing recorded as installed.');
    return;
  }
  const m = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));

  log('\nRemoving skills');
  for (const name of m.skills || []) {
    const p = path.join(SKILLS_DEST, name);
    if (fs.existsSync(p)) {
      if (!DRY) fs.rmSync(p, { recursive: true, force: true });
      act(name);
    }
  }

  log('\nRemoving agents');
  for (const f of m.agents || []) {
    const p = path.join(AGENTS_DEST, f);
    if (fs.existsSync(p)) {
      if (!DRY) fs.rmSync(p, { force: true });
      act(f);
    }
  }

  log('\nRemoving hooks');
  for (const f of m.hooks || []) {
    const p = path.join(HOOKS_DEST, f);
    if (fs.existsSync(p)) {
      if (!DRY) fs.rmSync(p, { force: true });
      act(f);
    }
  }

  log('\nSettings');
  const bak = backup(SETTINGS);
  if (bak) act(`backed up to ${bak}`);
  const settings = stripOurHooks(readSettings());
  if (settings.statusLine && String(settings.statusLine.command || '').includes(MARKER)) {
    delete settings.statusLine;
    act('statusLine removed');
  }
  writeSettings(settings);
  act('hook entries removed');

  if (!DRY) fs.rmSync(MANIFEST, { force: true });
  log('\nUninstalled.');
}

try {
  log(`Claude config dir: ${CONFIG_DIR}`);
  if (UNINSTALL) uninstall();
  else install();
} catch (e) {
  console.error(`\nerror: ${e.message}`);
  process.exit(1);
}
