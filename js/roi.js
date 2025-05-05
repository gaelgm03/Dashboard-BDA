function loadROI(minBudget) {
    fetch(`/api/roi?minBudget=${minBudget}`)
      .then(r => r.json())
      .then(data => {
        console.log('API Response:', data);
        const tableDiv = document.getElementById('roiTable');
        if (!data.length) {
          tableDiv.innerHTML = '<p>No movies found for this budget.</p>';
          return;
        }
        let tableHTML = `
          <table>
            <thead>
              <tr>
                <th>Film Name</th>
                <th>Budget</th>
                <th>ROI</th>
              </tr>
            </thead>
            <tbody>
        `;
        data.forEach(row => {
          const roi = Number(row.roi);
          tableHTML += `
            <tr>
              <td>${row.movie_name || 'N/A'}</td>
              <td>$${Number(row.production_budget).toLocaleString()}</td>
              <td>${isNaN(roi) ? 'N/A' : roi.toFixed(2)}</td>
            </tr>
          `;
        });
        tableHTML += '</tbody></table>';
        tableDiv.innerHTML = tableHTML;
      })
      .catch(err => console.error('Failed to load ROI data:', err));
  }
  
  const select = document.getElementById('budgetSelect');
  select.addEventListener('change', () => {
    console.log('Dropdown changed to:', select.value);
    loadROI(select.value);
  });
  
  loadROI(select.value);

  