//histroy接口 兼容处理
(function () {
  // html5 支持
 
  if ('pushState' in window.history) {
    window.history.getstate = function(){
      return window.history.state;
    }
    return;
  }
  var hash;

  // Storage API
  function setStorage(name, value) {
    window.sessionStorage[name] = JSON.stringify(value);
  };

  function getStorage(name) {
    var value = window.sessionStorage[name];
    value = value?$.parseJSON(value):{};
    return value;
  }

  function changeState (data, title, url, replace) {
    setStorage(url, { state: data, title: title });

    hash = url;

    if (replace) {
      location.replace(url);
    }
    else {
      location.href = url;
    }
  }

  window.history.getstate = function(){
    var t = getStorage(location.href); 
    return t?t.state:null;
  }

  window.history.pushState = function (data, title, url) {
    changeState(data, title, url, false);
  };


  window.history.replaceState = function (data, title, url) {
    changeState(data, title, url, true);
  };


  function get_hash() {
    return location.href;
  }

  function hashchange() {
    var new_hash = get_hash(),
        data;

    if (new_hash === hash) {
      return;
    }

    hash = new_hash;
    data = hash ? getStorage(hash) : null;

    if ('onpopstate' in window && typeof window.onpopstate === 'function') {
      window.onpopstate.apply(window, [data]);
    }
  };

  if ('onhashchange' in window) {
    window.onhashchange = hashchange;
  }

}());