package com.banana.bridge.sync;

import java.util.UUID;
import java.util.logging.Logger;

public final class ClientSyncGateway {
    private final Logger logger;

    public ClientSyncGateway(Logger logger) {
        this.logger = logger;
    }

    public void pushClientHello(UUID playerId, String clientVersion) {
        logger.fine(() -> "Received Banana Client handshake from " + playerId + " version " + clientVersion);
    }
}
