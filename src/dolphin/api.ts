/* eslint-disable import/no-default-export */
import type { DefaultMods } from "@settings/types";

import {
  ipc_checkDesktopAppDolphin,
  ipc_checkPlayKeyExists,
  ipc_clearDolphinCache,
  ipc_configureDolphin,
  ipc_dolphinEvent,
  ipc_downloadDefaultMod,
  ipc_downloadDolphin,
  ipc_importDolphinSettings,
  ipc_launchNetplayDolphin,
  ipc_reinstallDolphin,
  ipc_removePlayKeyFile,
  ipc_set_mod,
  ipc_storePlayKeyFile,
  ipc_viewSlpReplay,
} from "./ipc";
import type {
  DolphinEventMap,
  DolphinEventType,
  DolphinLaunchType,
  DolphinService,
  PlayKey,
  ReplayQueueItem,
} from "./types";

const dolphinApi: DolphinService = {
  async downloadDefaultMod(mod: DefaultMods) {
    await ipc_downloadDefaultMod.renderer!.trigger({ mod });
  },
  async setMod(id: number) {
    await ipc_set_mod.renderer!.trigger({ id });
  },
  async downloadDolphin(dolphinType: DolphinLaunchType) {
    await ipc_downloadDolphin.renderer!.trigger({ dolphinType });
  },
  async configureDolphin(dolphinType: DolphinLaunchType) {
    await ipc_configureDolphin.renderer!.trigger({ dolphinType });
  },
  async reinstallDolphin(dolphinType: DolphinLaunchType) {
    await ipc_reinstallDolphin.renderer!.trigger({ dolphinType });
  },
  async clearDolphinCache(dolphinType: DolphinLaunchType) {
    await ipc_clearDolphinCache.renderer!.trigger({ dolphinType });
  },
  async storePlayKeyFile(key: PlayKey) {
    await ipc_storePlayKeyFile.renderer!.trigger({ key });
  },
  async checkPlayKeyExists(key: PlayKey): Promise<boolean> {
    const { result } = await ipc_checkPlayKeyExists.renderer!.trigger({ key });
    return result.exists;
  },
  async removePlayKeyFile(): Promise<void> {
    await ipc_removePlayKeyFile.renderer!.trigger({});
  },
  async viewSlpReplay(files: ReplayQueueItem[]): Promise<void> {
    await ipc_viewSlpReplay.renderer!.trigger({ files });
  },
  async launchNetplayDolphin(): Promise<void> {
    await ipc_launchNetplayDolphin.renderer!.trigger({});
  },
  async checkDesktopAppDolphin() {
    const { result } = await ipc_checkDesktopAppDolphin.renderer!.trigger({});
    return result;
  },
  async importDolphinSettings(options: { toImportDolphinPath: string; dolphinType: DolphinLaunchType }): Promise<void> {
    await ipc_importDolphinSettings.renderer!.trigger(options);
  },
  onEvent<T extends DolphinEventType>(eventType: T, handle: (event: DolphinEventMap[T]) => void) {
    const { destroy } = ipc_dolphinEvent.renderer!.handle(async (result) => {
      if (result.type === eventType) {
        handle(result as DolphinEventMap[T]);
      }
    });
    return destroy;
  },
};

export default dolphinApi;
