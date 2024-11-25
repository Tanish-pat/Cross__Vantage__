// Data for the table
const ratesData = [
    {
      id: 1,
      title: 'Alignment of RoDTEP Schedule consequent to changes in the First Schedule of Customs Tariff Act w.e.f. 01.10.2024.',
      description: 'Rates under RoDTEP under Appendix 4R and Appendix 4RE w.e.f 01.10.2024',
      links: [
        { text: 'Download (Type: PDF)', url: '#' },
        { text: 'Download (Type: PDF)', url: '#' },
      ],
      isNew: true,
    },
    {
      id: 2,
      title: 'RoDTEP Notification No 32 dated 30.09.2024 on Extension of RoDTEP scheme for exports made from DTA Units and AA/EOU/SEZ Units -reg',
      description:
        'Appendix 4R - RoDTEP Schedule for DTA Exports w.e.f. 10.10.2024 Notified vide Notification No. 32 Dated 30.09.2024. ' +
        'Appendix 4RE - RoDTEP Schedule for Advance Authorization (AA)/Export Oriented Unit (EOU)/Special Economic Zones (SEZ) Exports w.e.f. 10.10.2024 Notified under Notification No 32 Dated 30.09.2024.',
      links: [
        { text: 'Download (Type: PDF)', url: '#' },
        { text: 'Download (Type: PDF)', url: '#' },
      ],
      isNew: false,
    },
  ];
  
  // Function to render the table rows
  function renderTable() {
    const tableBody = document.getElementById('ratesTable');
    tableBody.innerHTML = ''; // Clear existing rows
  
    ratesData.forEach((item) => {
      const row = document.createElement('tr');
      row.className = item.isNew ? 'new-row' : '';
  
      row.innerHTML = `
        <td>${item.id} ${item.isNew ? '<span class="new-tag">NEW!</span>' : ''}</td>
        <td>
          <p>${item.title}</p>
          <p style="font-size: 0.9em; color: #666;">${item.description}</p>
        </td>
        <td>
          ${item.links
            .map(
              (link) =>
                `<a href="${link.url}" target="_blank">${link.text}</a>`
            )
            .join('<br>')}
        </td>
      `;
  
      tableBody.appendChild(row);
    });
  }
  
  // Initialize the page
  document.addEventListener('DOMContentLoaded', () => {
    renderTable();
  
    // Explore button functionality
    document.getElementById('exploreButton').addEventListener('click', () => {
      alert('Explore Guidelines!');
    });
  });
  