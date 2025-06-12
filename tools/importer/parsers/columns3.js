/* global WebImporter */
export default function parse(element, { document }) {
  // Get the menu wrapper (should always exist)
  const menu = element.querySelector('menu.headerv2__menu__wrapper');
  if (!menu) return;

  // Pick the first two main columns (those visible in the screenshot)
  const menuColumns = Array.from(menu.children).filter(
    (li) => li.classList.contains('headerv2__menu__column') && !li.classList.contains('headerv2__menu__column-full-menu') && !li.classList.contains('headerv2__menu__column-submenu-child')
  );

  // Only use the first two columns for columns3 block
  const columns = menuColumns.slice(0, 2);

  // For each column, gather the visible (non-empty) section(s) as a single block
  const colCells = columns.map((col) => {
    // Find all .headerv2__menu__column__section elements
    const sections = Array.from(col.querySelectorAll(':scope > .headerv2__menu__column__section'));
    // Only those that are not entirely empty
    const visibleSections = sections.filter(section => {
      // A section is visible if it has non-empty heading or at least one <a> child with text
      const heading = section.querySelector('.headerv2__menu__column__section-heading');
      const links = section.querySelectorAll('a');
      return (
        (heading && heading.textContent.trim().length > 0) ||
        Array.from(links).some(a => a.textContent.trim().length > 0)
      );
    });
    if (visibleSections.length === 1) return visibleSections[0];
    if (visibleSections.length > 1) {
      const frag = document.createDocumentFragment();
      visibleSections.forEach(sec => frag.appendChild(sec));
      return frag;
    }
    // fallback: if no visible sections, just use the column itself
    return col;
  });

  // Prepare the block table
  const headerRow = ['Columns (columns3)'];
  const cells = [headerRow, colCells];

  // Create table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
