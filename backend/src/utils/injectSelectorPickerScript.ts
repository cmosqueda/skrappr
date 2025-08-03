export const injectSelectorPickerScript = `
<script>
(function () {
  const selectedElements = new Set();
  let selectionEnabled = false;

  function toggleSelection(el) {
    if (selectedElements.has(el)) {
      el.style.outline = "";
      selectedElements.delete(el);
    } else {
      el.style.outline = "2px solid #FFD230";
      selectedElements.add(el);

      // Send selector back to parent
      const selector = getUniqueSelector(el);
      window.parent.postMessage({ type: "ELEMENT_SELECTED", selector }, "*");
    }
  }

  function getUniqueSelector(el) {
    if (!el) return '';
    if (el.id) return '#' + el.id;
    let path = [];
    while (el && el.nodeType === Node.ELEMENT_NODE) {
      let selector = el.nodeName.toLowerCase();
      if (el.className) {
        const classNames = el.className.trim().split(/\\s+/).join('.');
        selector += '.' + classNames;
      }
      path.unshift(selector);
      el = el.parentElement;
    }
    return path.join(' > ');
  }

  function clearAllSelections() {
    selectedElements.forEach(el => el.style.outline = "");
    selectedElements.clear();
  }

  // Click handler only when enabled
  const clickHandler = (e) => {
    if (!selectionEnabled) return;
    e.preventDefault();
    e.stopPropagation();
    toggleSelection(e.target);
  };

  document.addEventListener("click", clickHandler, true);

  // Listen to messages from parent (React app)
  window.addEventListener("message", (event) => {
    const { type, enabled } = event.data;

    if (type === "TOGGLE_SELECT_MODE") {
      selectionEnabled = enabled;
    }

    if (type === "CLEAR_SELECTIONS") {
      clearAllSelections();
    }
  });

})();
</script>
`;
