  // Función para obtener datos desde el backend
  function loadData() {
    fetch('http://localhost:3000/act_getdata')
      .then(response => response.json()) // es lo mismo que .then(function(response)])
      .then(data => {
        const rows = data.gBP;
        const headers = rows[0]; // ["movie_name", "worldwide_gross"]
        const entries = rows.slice(1); // sin encabezado
  
        const structuredData = entries.map(function(row) {
            return {
          movie_name: row[0],
          worldwide_gross: Number(row[1])
            };
        });
  
        drawBestPerformanceChart(structuredData);

        const rowsK = data.gTK;
        const headersK = rowsK[0];
        const entriesK = rowsK.slice(1)

        //aqui mapeamos las entries
        const structuredDataKW = entriesK.map(function(row) {
            return {
              keyword: row[0],
              frecuencia: row[1]
            };
          });
          

        drawTopKeywordsChart(structuredDataKW);    
        
        const rows_dvd = data.gPP;
        const headers_dvd = rows_dvd[0];
        const entries_dvd = rows_dvd.slice(1)

        const structuredDataDVD = entries_dvd.map(function(row) {
            return {
                movie_name2: row[0],
                dom_dvd: row[1]
            };
        });

        const rows_br = data.gPP;
        const headers_br = rows_br[0];
        const entries_br = rows_br.slice(1)

        const structuredDataBR = entries_br.map(function(row) {
            return {
                movie_name2: row[0],
                dom_br: row[2]
            };
        });

        drawPhysicalPerformance(structuredDataDVD, structuredDataBR)

        const rows_py = data.gPY;
        const headers_py = rows_py[0];
        const entries_py = rows_py.slice(1)

        const structuredDataPY = entries_py.map(function(row) {
            return {
                year: row[0],
                avg_profit: row[1]
            };
        });

        drawAnualProfitability(structuredDataPY)
      })
      .catch(error => {
        console.error("Error al obtener los datos:", error);


      });
  }

// Función para dibujar la gráfica
function drawBestPerformanceChart(data) {
    const ctx = document.getElementById('chartBestPerformance').getContext('2d');
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(item => item.movie_name),  //aqui el labels será el nombre de las columnas
        datasets: [{
          label: 'Ganancia mundial (USD)',
          data: data.map(item => item.worldwide_gross), //aqui corresponderá a las ganancias mundiales
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        scales: {  //Se usa para configurar los ejes del gráfico
          x: {
            beginAtZero: true,
            ticks: // Esto controla las etiquetas que se muestran en el eje X, en este caso los números
            // Dentro de ticks hay una propiedad llamada callback. El valor de esta propiedad debe de ser una función
            {
              callback: function(value) //Un callback es una función que Chart.js ejecuta en un momento especifico para que uno pueda personalizar algo
              {
                // fuction(value) es la función que chart va a ejecutar o "llamar"
                // El parámetro value es el valor númerico que Chart quiere mostrar en el eje X
                return '$' + (value / 1000000) + 'M';                //Ese return le dice a chart como debe de mostrar ese valor
                // value.toLocaleString() convierte el numero en una cadena con separadores de miles
              }
            }
          },
          y: {
            ticks: {
                font: {
                    size:12
                }
            }
          }
        }
    }
});
}

  function drawTopKeywordsChart(data) {
    const ctx = document.getElementById('chartPopularKeywords').getContext('2d');

    // Extraer datos dinámicamente (similar a xValues y yValues en W3Schools)
    const xValues = data.map(item => item.keyword); // ["Romance", "Dysfunctional Family", ...]
    const yValues = data.map(item => item.frecuencia); // [1137, 824, ...]
    const barColors = [
        'rgba(255, 99, 132, 0.6)',  // Rosa
        'rgba(54, 162, 235, 0.6)',  // Azul
        'rgba(255, 206, 86, 0.6)',  // Amarillo
        'rgba(75, 192, 192, 0.6)',  // Turquesa
        'rgba(153, 102, 255, 0.6)', // Púrpura
        'rgba(255, 159, 64, 0.6)',  // Naranja
        'rgba(199, 199, 199, 0.6)', // Gris
        'rgba(83, 102, 255, 0.6)',  // Indigo
        'rgba(255, 99, 71, 0.6)',   // Salmón
        'rgba(144, 238, 144, 0.6)'  // Verde claro
    ];

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Palabras clave más populares'
                }
            }
        }
    });
}

function drawPhysicalPerformance(data1, data2) {
    const ctx = document.getElementById('chartPhysicalPerformance').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data1.map(item => item.movie_name2),  //aqui el labels será el nombre de las columnas
          datasets: [
            {
            label: 'DVD Performance',
            data: data1.map(item => item.dom_dvd), //aqui corresponderá a las ganancias mundiales
            backgroundColor: 'rgba(241, 13, 9, 0.77)',
            borderColor: 'rgb(235, 84, 54)',
            borderWidth: 1
          },
          {
            label: 'BluRay Performance',
            data: data2.map(item => item.dom_br), //aqui corresponderá a las ganancias mundiales
            backgroundColor: 'rgba(240, 201, 4, 0.77)',
            borderColor: 'rgb(235, 184, 54)',
            borderWidth: 1
          }
        ]
        },
        options: {
          indexAxis: 'y',
          scales: {  //Se usa para configurar los ejes del gráfico
            x: {
              beginAtZero: true,
              ticks: // Esto controla las etiquetas que se muestran en el eje X, en este caso los números
              // Dentro de ticks hay una propiedad llamada callback. El valor de esta propiedad debe de ser una función
              {
                callback: function(value) //Un callback es una función que Chart.js ejecuta en un momento especifico para que uno pueda personalizar algo
                {
                  // fuction(value) es la función que chart va a ejecutar o "llamar"
                  // El parámetro value es el valor númerico que Chart quiere mostrar en el eje X
                  return '$' + value.toLocaleString();              //Ese return le dice a chart como debe de mostrar ese valor
                  // value.toLocaleString() convierte el numero en una cadena con separadores de miles
                }
              }
            },
            y: {
              ticks: {
                  font: {
                      size: 12
                  }
              }
            }
          }
      }
  });
}

function drawAnualProfitability(data) {
    const ctx = document.getElementById('chartAnualProfitability').getContext('2d');
  
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(item => item.year),  //aqui el labels será el nombre de las columnas
        datasets: [{
          label: 'Anual Performance',
          data: data.map(item => item.avg_profit), //aqui corresponderá a las ganancias mundiales
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        }]
      },
      options: {
        indexAxis: 'x',
        scales: { 
            x: {
                ticks: {
                  autoSkip: false,
                  font: {
                    size: 10
                  }
                }
              },
            y: {
                beginAtZero: true,
                ticks:{
                    callback: function(value){
                        return '$' + (value / 1000000) + 'M';         
                    }
                }
            }
        }
    }
});
}
  // Ejecutar cuando el DOM esté listo
  //no se ejecuta hasta que todos los elementos HTML (como el <canvas>) estén disponibles.
  document.addEventListener("DOMContentLoaded", function() {
    loadData();
  });

  