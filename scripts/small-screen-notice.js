const IPAD_MIN_WIDTH = 768;
const ACTIVE_CLASS = "small-screen-notice-active";
const NOTICE_ID = "small-screen-notice";
const MANAGED_FLAG = "smallScreenNoticeManaged";

function createNotice() {
  const notice = document.createElement("div");
  notice.id = NOTICE_ID;
  notice.className = "small-screen-notice";
  notice.hidden = true;
  notice.setAttribute("role", "alertdialog");
  notice.setAttribute("aria-modal", "true");
  notice.setAttribute("aria-labelledby", "small-screen-notice-title");
  notice.setAttribute("aria-describedby", "small-screen-notice-description");
  notice.innerHTML = `
    <div class="small-screen-notice__card">
      <p class="small-screen-notice__eyebrow">Larger screen required</p>
      <h2 class="small-screen-notice__title" id="small-screen-notice-title">
        iPad-size screen or larger
      </h2>
      <p class="small-screen-notice__text" id="small-screen-notice-description">
        The complexity of these tools requires that they be viewed on a device with greater
        resolution. Please reopen this page on an iPad-size screen or larger.
      </p>
    </div>
  `;
  return notice;
}

function boot() {
  const media = window.matchMedia(`(max-width: ${IPAD_MIN_WIDTH - 1}px)`);
  const notice = createNotice();

  function managedChildren() {
    return Array.from(document.body.children).filter(
      (child) => child !== notice && child.tagName !== "SCRIPT"
    );
  }

  function sync() {
    const active = media.matches;
    notice.hidden = !active;
    document.body.classList.toggle(ACTIVE_CLASS, active);

    for (const child of managedChildren()) {
      if (active) {
        child.setAttribute("inert", "");
        child.setAttribute("aria-hidden", "true");
        child.dataset[MANAGED_FLAG] = "true";
        continue;
      }

      if (child.dataset[MANAGED_FLAG] === "true") {
        child.removeAttribute("inert");
        child.removeAttribute("aria-hidden");
        delete child.dataset[MANAGED_FLAG];
      }
    }
  }

  document.body.append(notice);
  sync();

  if (typeof media.addEventListener === "function") {
    media.addEventListener("change", sync);
    return;
  }

  media.addListener(sync);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
