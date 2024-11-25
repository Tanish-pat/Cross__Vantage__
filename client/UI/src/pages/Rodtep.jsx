import React from 'react';

const RodtepPage = () => {
  const data = [
    {
      id: 1,
      title:
        'Alignment of RoDTEP Schedule consequent to changes in the First Schedule of Customs Tariff Act w.e.f. 01.10.2024.',
      description: 'Rates under RoDTEP under Appendix 4R and Appendix 4RE w.e.f 01.10.2024',
      links: [
        { text: 'Download (Type: PDF)', url: '#' },
        { text: 'Download (Type: PDF)', url: '#' },
      ],
      isNew: true,
    },
    {
      id: 2,
      title:
        'RoDTEP Notification No 32 dated 30.09.2024 on Extension of RoDTEP scheme for exports made from DTA Units and AA/EOU/SEZ Units -reg',
      description:
        'Appendix 4R - RoDTEP Schedule for DTA Exports w.e.f. 10.10.2024 Notified vide Notification No. 32 Dated 30.09.2024. ' +
        'Appendix 4RE - RoDTEP Schedule for Advance Authorization (AA)/Export Oriented Unit (EOU)/Special Economic Zones (SEZ) Exports w.e.f. 10.10.2024 Notified under Notification No 32 Dated 30.09.2024.',
      links: [
        { text: 'Download (Type: PDF)', url: '#' },
        { text: 'Download (Type: PDF)', url: '#' },
      ],
    },
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Remission of Duties and Taxes on Exported Products (RoDTEP)</h1>

      <div style={{ margin: '20px 0' }}>
        <h2>Guidelines</h2>
        <button style={{ padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Explore
        </button>
      </div>

      <div>
        <h2>Rates under RoDTEP - Rates under Appendix 4R/4RE</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Sl. No.</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Title</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Download</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} style={{ backgroundColor: item.isNew ? '#ffe5e5' : 'transparent' }}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {item.id} {item.isNew && <span style={{ color: 'red', fontWeight: 'bold' }}>NEW!</span>}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <p>{item.title}</p>
                  <p style={{ fontSize: '0.9em', color: '#666' }}>{item.description}</p>
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {item.links.map((link, index) => (
                    <div key={index}>
                      <a href={link.url} style={{ color: '#007bff', textDecoration: 'none' }}>
                        {link.text}
                      </a>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RodtepPage;
