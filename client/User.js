
import Ajax from 'simple-ajax';

export default new class User {

  listeners = []

  constructor() {
    this.reload();
  }

  addListener(fn) {
    if (this.listeners.indexOf(fn) == -1) {
      this.listeners.push(fn);
    }
  }

  removeListener(fn) {
    if (this.listeners.indexOf(fn) != -1) {
      this.listeners.remove(this.listeners.indexOf(fn), 1);
    }
  }

  dispatch(arg) {
    for (var listener of this.listeners) {
      listener(arg);
    }
  }

  reload() {

    var ajax = new Ajax(
      {
        url: '/api/current_user',
        method: 'GET',
        contentType: 'application/json'
      }
    );

    ajax.on('success', (e) => {
      console.log(e.target.response);

      var res = JSON.parse(e.target.response);

      if (res.success) {
        this.state = res;
        this.state.loggedIn = true;
      } else {
        this.state = {};
        this.state.loggedIn = false;
      }

      this.dispatch(this.state);
    });

    ajax.on('error', () => {
      this.setState({
        error: "Ajax Error",
        loading: false
      });
    });

    ajax.send();
    
  }
}
