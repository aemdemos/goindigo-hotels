/* global WebImporter */
export default function parse(element, { document }) {
  // The header row
  const headerRow = ['Columns (columns5)'];

  // ---
  // Row 1, Column 1: Main content (Book Hotels online + intro)
  // This is the first .ig_Seo_homepage_content.ig-container
  const mainLeft = element.querySelector('.ig_Seo_homepage_content.ig-container');

  // Row 1, Column 2: The first .Home_seo-data-container__d2WUy.ig-container
  // This is the right column, containing the lists of flights/destinations/links
  const mainRight = element.querySelector('section.Home_seo-data-container__d2WUy.ig-container');

  // Row 2, Column 1: Powered by disclaimer (bottom left)
  // This is inside .PoweredBy_powered-by-container__xrSw1
  let poweredByEl = null;
  const poweredByWrapper = element.querySelector('.PoweredBy_powered-by-container__xrSw1');
  if (poweredByWrapper) {
    poweredByEl = poweredByWrapper;
  }

  // Row 2, Column 2: Legal disclaimer (bottom right)
  // This is inside .Home_ig-HomePage-disclaimer-fixed-height-show__QFb8H
  let legalDisclaimerEl = null;
  const legalDisclaimerWrapper = element.querySelector('.Home_ig-HomePage-disclaimer-fixed-height-show__QFb8H');
  if (legalDisclaimerWrapper) {
    legalDisclaimerEl = legalDisclaimerWrapper;
  }

  // Compose the table structure
  const row1 = [mainLeft || '', mainRight || ''];
  const row2 = [poweredByEl || '', legalDisclaimerEl || ''];

  const cells = [headerRow, row1, row2];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
