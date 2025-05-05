function loadProfitChart() {
    fetch('/act_getdata')
      .then(r => r.json())
      .then(data => {
        console.log('act_getdata Response:', data);
  
        
        const gSDP = data.gSDP.slice(1); // quitar el header
        console.log('gSDP Data:', gSDP);
  
        
        const movies = gSDP.map(row => ({
          movie_name: row[0], // movie_name
          running_time: Number(row[1]), // running_time
          profit: Number(row[2]) // profit/roi
        }));
  
        console.log('Movies for Chart:', movies);
  
        const ctx = document.getElementById('profitChart').getContext('2d');
        if (!movies.length) {
          ctx.canvas.parentNode.innerHTML = '<p>No data available for movies between 90 and 120 minutes.</p>';
          return;
        }
  
        const labels = movies.map(row => row.movie_name);
        const profits = movies.map(row => row.profit);
        const runningTimes = movies.map(row => row.running_time);
  
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Profit ($)',
              data: profits,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Profit ($)'
                },
                ticks: {
                  callback: value => '$' + value.toLocaleString()
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Movie'
                }
              }
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: ctx => `Profit: $${ctx.parsed.y.toLocaleString()}`,
                  afterLabel: ctx => `Running Time: ${runningTimes[ctx.dataIndex]} min`
                }
              }
            }
          }
        });
      })
      .catch(err => console.error('Failed to load profit data:', err));
  }
  
  loadProfitChart();

  