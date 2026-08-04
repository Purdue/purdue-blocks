const tabGroups = [...document.querySelectorAll(".pu-blocks-tabs")];
if (tabGroups && tabGroups.length > 0) {
  tabGroups.forEach((tabs) => {
    const headers = [...tabs.querySelectorAll(".pu-blocks-tabs__header")];
    const panels = [...tabs.querySelectorAll(".pu-blocks-tabs__panel")];

    function activateTab(index) {
      panels.forEach((panel, i) => {
        i === index ? panel.classList.add("active") : panel.classList.remove("active");
      });
      headers.forEach((h, i) => {
        if (i === index) {
          h.classList.add("active");
          h.setAttribute("aria-selected", "true");
          h.setAttribute("tabindex", "0");
        } else {
          h.classList.remove("active");
          h.setAttribute("aria-selected", "false");
          h.setAttribute("tabindex", "-1");
        }
      });
    }

    const headerWrapper = headers[0].parentElement;
    headerWrapper.setAttribute("role", "tablist");

    headers.forEach((header, index) => {
      header.setAttribute("role", "tab");
      header.setAttribute("aria-selected", index === 0 ? "true" : "false");
      header.setAttribute("tabindex", index === 0 ? "0" : "-1");

      if (!header.id) header.id = `tab-${Math.random().toString(16).slice(2)}`;

      const panel = panels[index];
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", header.id);
      panel.setAttribute("tabindex", "0");

      header.addEventListener("click", () => activateTab(index));

      header.addEventListener("keydown", (e) => {
        let newIndex = null;

        switch (e.key) {
          case "ArrowRight":
          case "ArrowDown":
            e.preventDefault();
            if (index < headers.length - 1) newIndex = index + 1;
            break;
          case "ArrowLeft":
          case "ArrowUp":
            e.preventDefault();
            if (index > 0) newIndex = index - 1;
            break;
          case "Home":
            e.preventDefault();
            newIndex = 0;
            break;
          case "End":
            e.preventDefault();
            newIndex = headers.length - 1;
            break;
          case "Enter":
          case " ":
            e.preventDefault();
            activateTab(index);
            return;
        }

        if (newIndex !== null) {
          headers[newIndex].focus();
        }
      });
    });

    headers.forEach((header, index) => {
      let clHeader = header.cloneNode(true);
      clHeader.id = "accordion-" + clHeader.id;
      clHeader.classList.remove("pu-blocks-tabs__header");
      clHeader.classList.add("pu-blocks-tabs__header-mobile");
      clHeader.removeAttribute("role");
      clHeader.removeAttribute("tabindex");
      tabs.insertBefore(clHeader, panels[index]);
    });

    let newHeaders = [...tabs.querySelectorAll(".pu-blocks-tabs__header-mobile")];
    newHeaders.forEach((header, index) => {
      header.addEventListener("click", () => {
        panels.forEach((panel, i) => {
          if (i === index) {
            panel.classList.contains("mobile-active")
              ? panel.classList.remove("mobile-active")
              : panel.classList.add("mobile-active");
          } else {
            panel.classList.remove("mobile-active");
          }
        });

        newHeaders.forEach((h, i) => {
          if (i === index) {
            if (header.classList.contains("mobile-active")) {
              header.classList.remove("mobile-active");
              header.setAttribute("aria-selected", "false");
            } else {
              header.classList.add("mobile-active");
              header.setAttribute("aria-selected", "true");
            }
          } else {
            h.classList.remove("mobile-active");
            h.setAttribute("aria-selected", "false");
          }
        });
      });
    });
  });
}
