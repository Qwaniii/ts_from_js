class Websocket {
  services: any
  config: any

  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
  }

  socketUrl() {
    const socket =  new WebSocket(this.config.baseSocketUrl);
    return socket;
  }


}

export default Websocket;
