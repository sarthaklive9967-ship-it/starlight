package com.banana.bridge.profile;

import java.nio.file.Path;

public final class ServerProfileService {
    private final Path storageRoot;

    public ServerProfileService(Path storageRoot) {
        this.storageRoot = storageRoot;
    }

    public Path storageRoot() {
        return storageRoot;
    }
}
