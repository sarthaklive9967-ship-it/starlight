package com.banana.bridge;

import com.banana.bridge.profile.ServerProfileService;
import com.banana.bridge.sync.ClientSyncGateway;
import org.bukkit.plugin.java.JavaPlugin;

public final class BananaBridgePlugin extends JavaPlugin {
    private ClientSyncGateway syncGateway;
    private ServerProfileService profileService;

    @Override
    public void onEnable() {
        this.syncGateway = new ClientSyncGateway(getLogger());
        this.profileService = new ServerProfileService(getDataFolder().toPath());
        getLogger().info("Banana Bridge enabled (optional companion for Banana Client).");
    }

    @Override
    public void onDisable() {
        getLogger().info("Banana Bridge disabled.");
    }

    public ClientSyncGateway syncGateway() {
        return syncGateway;
    }

    public ServerProfileService profileService() {
        return profileService;
    }
}
