let dataPoints = []
let currentType = "surat"

const ctx = document.getElementById('chart').getContext('2d')

const chart = new Chart(ctx, {
    type: 'scatter',
    data: {
        datasets: [{
            label: 'Sürat (m/s)',
            data: dataPoints,
            borderWidth: 2,
            showLine: true,
            tension: 0.3,
            pointRadius: 5
        }]
    },
    options: {
        scales: {
            x: {
                type: 'linear',
                min: 0,
                max: 60,
                ticks: { stepSize: 10 },
                title: { display: true, text: 'Zaman (s)' }
            },
            y: {
                min: 0,
                max: 100,
                ticks: { stepSize: 10 },
                title: { display: true, text: 'Sürat (m/s)' }
            }
        }
    }
})

function updateChartType() {
    if (currentType === "surat") {
        chart.data.datasets[0].label = "Sürat (m/s)"
        chart.options.scales.y.title.text = "Sürat (m/s)"
    }

    if (currentType === "konum") {
        chart.data.datasets[0].label = "Konum (m)"
        chart.options.scales.y.title.text = "Konum (m)"
    }

    if (currentType === "ivme") {
        chart.data.datasets[0].label = "İvme (m/s²)"
        chart.options.scales.y.title.text = "İvme (m/s²)"
    }

    chart.update()
}

function addData() {
    const time = parseFloat(document.getElementById('time').value)
    const speed = parseFloat(document.getElementById('speed').value)

    if (isNaN(time) || isNaN(speed)) return

    dataPoints.push({ x: time, y: speed })
    dataPoints.sort((a, b) => a.x - b.x)
    chart.update()

    document.getElementById('time').value = ''
    document.getElementById('speed').value = ''
}

function clearData() {
    dataPoints.length = 0
    chart.update()
}

function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active')
}

function toggleGroup(id) {
    document.getElementById(id).classList.toggle('active')
}

function showPage(page) {
    currentType = page
    updateChartType()

    document.getElementById('sidebar').classList.remove('active')
}
