import { app, nativeTheme } from "electron";
import path from "path";

import type { AppSettings } from "./types";

function getDefaultRootSlpPath(): string {
  let root = app.getPath("home");
  if (process.platform === "win32") {
    root = app.getPath("documents");
  }
  return path.join(root, "Slippi");
}

const modsDir = path.join(app.getPath("userData"), "mods");

export const defaultAppSettings: AppSettings = {
  connections: [],
  settings: {
    theme: nativeTheme.shouldUseDarkColors ? "dark" : "light",
    isoPath: null,
    rootSlpPath: getDefaultRootSlpPath(),
    useMonthlySubfolders: false,
    spectateSlpPath: path.join(getDefaultRootSlpPath(), "Spectate"),
    extraSlpPaths: [],
    netplayDolphinPath: path.join(app.getPath("userData"), "netplay"),
    playbackDolphinPath: path.join(app.getPath("userData"), "playback"),
    dolphinPath: "path/to/dolphin",
    launchMeleeOnPlay: true,
    autoUpdateLauncher: true,
    selectedMod: 0,
  },
  mods: [
    {
      name: "vBrawl",
      elfPath: path.join(modsDir, "vBrawl", "vBrawl Launcher.elf"),
      sdCardPath: path.join(modsDir, "vBrawl", "sd.raw"),
      lylatID: "lylat-vBrawl-id",
    },
    {
      name: "P+",
      elfPath: path.join(modsDir, "Project +", "Project + Launcher.elf"),
      sdCardPath: path.join(modsDir, "Project +", "sd.raw"),
      lylatID: "lylat-pplus-id",
    },
  ],
};
