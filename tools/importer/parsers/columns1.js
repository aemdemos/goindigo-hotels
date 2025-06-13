/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Columns (columns1)'];

  // Find the main fields container
  const fieldsContainer = element.querySelector('.SearchWidget_search-widget-fields__wz80n');
  const fieldDivs = fieldsContainer ? Array.from(fieldsContainer.children) : [];

  // --- 1. Destination or Property Name ---
  let destCol = '';
  if (fieldDivs[0]) {
    // Find the label
    const label = fieldDivs[0].querySelector('label');
    // Find the input
    const input = fieldDivs[0].querySelector('input');
    const arr = [];
    if (label) arr.push(label);
    if (input) {
      // Make a <span> for value/placeholder
      const val = document.createElement('span');
      val.textContent = input.placeholder || input.value || '';
      // Emulate bold/color with semantic clarity, but no styling necessary
      arr.push(val);
    }
    destCol = arr;
  }

  // --- 2 & 3. Check-in & Check-out Dates ---
  let checkinCol = '';
  let checkoutCol = '';
  if (fieldDivs[1]) {
    const dateInputs = fieldDivs[1].querySelectorAll('.vms_DateRangeCalendar_InputContainer');
    // Check-in
    if (dateInputs[0]) {
      const label = dateInputs[0].querySelector('label');
      const input = dateInputs[0].querySelector('input');
      const arr = [];
      if (label) arr.push(label);
      if (input) {
        const val = document.createElement('span');
        val.textContent = input.value || input.placeholder || '';
        arr.push(val);
      }
      checkinCol = arr;
    }
    // Check-out
    if (dateInputs[1]) {
      const label = dateInputs[1].querySelector('label');
      const input = dateInputs[1].querySelector('input');
      const arr = [];
      if (label) arr.push(label);
      if (input) {
        const val = document.createElement('span');
        val.textContent = input.value || input.placeholder || '';
        arr.push(val);
      }
      checkoutCol = arr;
    }
  }

  // --- 4. No. of Guests & Rooms ---
  let guestsCol = '';
  if (fieldDivs[2]) {
    const label = fieldDivs[2].querySelector('label');
    // Find the readonly input with the count
    const input = fieldDivs[2].querySelector('input[type="text"]');
    const arr = [];
    if (label) arr.push(label);
    if (input) {
      const val = document.createElement('span');
      val.textContent = input.value || '';
      arr.push(val);
    }
    guestsCol = arr;
  }

  // --- 5. Search Button ---
  let searchCol = '';
  if (fieldDivs[2]) {
    const btn = fieldDivs[2].querySelector('button');
    if (btn) searchCol = btn;
  }

  const columnsRow = [destCol, checkinCol, checkoutCol, guestsCol, searchCol];
  const cells = [headerRow, columnsRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
