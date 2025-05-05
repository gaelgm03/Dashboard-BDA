fetch('/act_getdata')
  .then(response => {
    console.log('Response received:', response);
    return response.json();
  })
  .then(data => {
    console.log('Data fetched:', data);

    
    const distributionData = data.gDC;
    console.log('Distribution Data (gDC):', distributionData);

    // Pre-normalisar los nobres que no son los mismos en el mapa
    const countryNameMap = {
      'United States':               'United States of America',
      'Republic of Korea':           'South Korea',
      'Russian Federation':          'Russia',
      'Islamic Republic of Iran':    'Iran',
      'Viet Nam':                    'Vietnam',
      'Bolivarian Republic of Venezuela': 'Venezuela',
      'Libyan Arab Jamahiriya':      'Libya',
      'The Former Yugoslav Republic of Macedonia': 'Macedonia',
      
    };

    // Map a echarts
    const heatmapData = distributionData.slice(1).map(row => {
      const rawName = row[0];
      return {
        name: countryNameMap[rawName] || rawName,
        value: row[1]
      };
    });
    console.log('Heatmap Data after normalization:', heatmapData);

   
    const chartDom = document.getElementById('heatmap');
    if (!chartDom) {
      console.error('Heatmap container not found!');
      return;
    }
    const myChart = echarts.init(chartDom);

    // min y max valores
    const values = heatmapData.map(item => item.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    
    const option = {
      title: {
        text: 'Movie Production by Country',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}'
      },
      visualMap: {
        min: minValue,
        max: maxValue,
        inRange: {
          color: ['#FFFF99', '#FF0000']
        },
        text: ['High', 'Low'],
        calculable: true
      },
      series: [
        {
          type: 'map',
          map: 'world',
          data: heatmapData,
          label: { show: false },
          emphasis: { label: { show: true } }
        }
      ]
    };

    myChart.setOption(option);
    console.log('Chart options set and heatmap rendered.');
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

  