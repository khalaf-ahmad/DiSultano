const LocalStorageService = (function () {
  let _service;
  function get_service() {
    if (!_service) {
      _service = this;
    }
    return _service;
  }

  const set_refresh_token = (refresh_token) => localStorage.setItem('refresh_token', refresh_token);

  const get_refresh_token = () => localStorage.getItem('refresh_token');

  const clear_refresh_token = () => localStorage.removeItem('refresh_token');

  return {
    get_service,
    set_refresh_token,
    get_refresh_token,
    clear_refresh_token,
  };
})();

export default LocalStorageService;
