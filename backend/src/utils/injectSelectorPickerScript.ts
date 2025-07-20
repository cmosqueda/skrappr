export const injectSelectorPickerScript = `
<script>
(function () {
  const selectedElements = new Set();

  function toggleSelection(el) {
    if (selectedElements.has(el)) {
      el.style.outline = ""; // remove highlight
      selectedElements.delete(el);
      console.log("Removed selection:",el);
    } else {
      el.style.outline = "2px solid #FFD230";
      selectedElements.add(el);
      console.log("Selected:",el);
    }
  }

  document.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    const target = e.target;

    toggleSelection(target);
  }, true);

  // get CSS selectors of selected elements
  window.getSelectedSelectors = function () {
    return Array.from(selectedElements).map(el => getUniqueSelector(el));
  };

  // clear all selections
  window.clearAllSelections = function () {
    selectedElements.forEach(el => el.style.outline = "");
    selectedElements.clear();
  };

  // Helper: generate a unique CSS selector
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
})();
</script>
`;
