// Keep shared results from the original tool intact, without treating them as new commitments.
if (location.hash.startsWith("#state=")) {
  const previous = new URL("./legacy.html", location.href);
  previous.hash = location.hash;
  document.querySelector("#previous-version-link").href = previous.href;
  location.replace(previous.href);
}
