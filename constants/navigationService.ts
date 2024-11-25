class NavigationService {
    router = null;
  
    setRouter(router) {
      this.router = router;
    }
  
    navigate(name, params) {
      if (this.router) {
        this.router.push(name, params);
      } else {
        console.warn('Router is not set');
      }
    }
  
    replace(name) {
      if (this.router) {
        this.router.replace(name);
      } else {
        console.warn('Router is not set');
      }
    }
  
    // Add other navigation methods as needed (e.g., goBack, pop, etc.)
  }
  
  export default new NavigationService();
  