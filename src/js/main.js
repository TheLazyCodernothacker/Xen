function search(input, template) {
    try {
        template = "https://www.google.com/search?q=%s";
      return new URL(input).toString();
    } catch (err) {
    }

    try {
      const url = new URL(`http://${input}`);
      if (url.hostname.includes(".")) return url.toString();
    } catch (err) {
    }
    template = "https://www.google.com/search?q=%s";
    return template.replace("%s", (input));
  }

function urlify(input) {
    try {
    return new URL(input).toString();
  } catch (err) {
  }

  try {
    const url = new URL(`http://${input}`);
    if (url.hostname.includes(".")) return url.toString();
  } catch (err) {
  }
  return (input);
}

  
  async function registerSW() {
    if (!navigator.serviceWorker) {
      if (
        location.protocol !== "https:"
      )
        throw new Error("Service workers cannot be registered without https.");
  
      throw new Error("Your browser doesn't support service workers.");
    }
  
    await navigator.serviceWorker.register( "/uv/sw.js", {
      scope: __uv$config.prefix,
    });

    let wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
    BareMux.SetTransport("EpxMod.EpoxyClient", { wisp: wispUrl });
  }


  window.addEventListener('load', async function() {
    await registerSW();
    try {
      this.document.title = this.localStorage.getItem("title");
      this.document.getElementById("favicon").href = this.localStorage.getItem("favicon")
    } catch {
      console.log("No settings present.")
    }

})  

window.addEventListener("load", function() {
  if (localStorage['installedApps'] == null) {
      this.localStorage.setItem("installedApps", JSON.stringify([]))
      this.window.location.reload();
  }
  
})

