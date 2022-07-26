Object.defineProperty(String.prototype, 'capitalize', {
    value: function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
});

const guilds = [ 'lucid', 'rawr', 'leman', 'electus', 'puffy', 'tmr', 'effusion', 'hypixel knights', 'les gaulois', 'honra']
const rankedGuilds = []

function rankGuilds() {
    totals = []
    guilds.forEach(guild => {
        total = JSON.parse(sessionStorage.getItem(guild)).total
        totals.push(total)
    })
    totals.sort((a, b) => {return b - a})
    guilds.forEach(guild => {
        rankedGuilds.push(totals.indexOf(JSON.parse(sessionStorage.getItem(guild)).total) + 6)
    })
}



const guildColors ={
    DARK_AQUA: '#00AAAA',
    DARK_GREEN: '#00AA00',
    YELLOW: '#FFFF55'
}

function getGuilds() {
    fetch('https://hypixel-proxy.herokuapp.com/guild')
    .then(res => res.json())
    .then(data => {
        sessionStorage.setItem('historical', JSON.stringify(data.historical))
        Object.keys(data).forEach(guild => {
            sessionStorage.setItem(guild, JSON.stringify(data[guild]))
        })
    })
}

getGuilds()

rankGuilds()
console.log(rankedGuilds)

function loadGuilds() {
    for(i = 0; i < guilds.length; i++) {
        guildObj = JSON.parse(sessionStorage.getItem(guilds[i]))
        historicalObj = JSON.parse(sessionStorage.getItem('historical'))[guilds[i]]
        
        document.querySelectorAll('.guild')[i].querySelectorAll('h1')[1].textContent = 'Member Count: ' + guildObj.memberCount
        document.querySelectorAll('.guild')[i].querySelectorAll('h1')[2].textContent = 'Created: ' + new Date(guildObj.created).toLocaleDateString()

        document.querySelectorAll('.guild')[i].querySelector('h1').querySelector('span').textContent = `[${guildObj.tag}]`
        document.querySelectorAll('.guild')[i].querySelector('h1').querySelector('span').style.color = guildColors[guildObj.tagColor]

        document.querySelectorAll('.guild')[i].querySelectorAll('p')[0].textContent = 'Weekly Exp: ' + guildObj.weekly.toLocaleString()
        document.querySelectorAll('.guild')[i].querySelectorAll('p')[1].textContent = 'Total Exp: ' + guildObj.total.toLocaleString()
    }
}

loadGuilds()

let chartType = 'weekly'

function calcAverage(arr) {
    num = 0
    arr.forEach(value => {
        num += value
    })
    return Math.round(num / arr.length)
}

function changeGuild(guildName) {
    console.log(guildName)
    document.querySelector('#moreContent').innerHTML = `
    <div id="exit"><div></div></div>
    <h1 id="guildTitle"> <span></span></h1>
    <div id="gexpInfo">
        <h1>Total GEXP:</h1>
        <h1>Weekly GEXP:</h1>
        <h1>Average Weekly:</h1>
        <h1>GEXP Gain: </h1>
        <h1>Distance to #:</h1>
        <h1>Passing (weeks):</h1>
    </div>
    <div id="chartContainer">
        <canvas id="gexpChart"></canvas>
        <button id="toggleChart">Total GEXP</button>
    </div>
    `

    gexpInfo = document.querySelector('#gexpInfo')
    for(i = 0; i < 6; i++) {
        if(i == 0) {
            gexpInfo.querySelectorAll('h1')[i].textContent = 'Total GEXP: ' + JSON.parse(sessionStorage.getItem(guildName.toLowerCase())).total.toLocaleString()
        } else if (i == 1) {
            gexpInfo.querySelectorAll('h1')[i].textContent = 'Weekly GEXP: ' + JSON.parse(sessionStorage.getItem(guildName.toLowerCase())).weekly.toLocaleString()
        } else if (i == 2) {
            gexpInfo.querySelectorAll('h1')[i].textContent = 'Average Weekly: ' + calcAverage(JSON.parse(sessionStorage.getItem('historical'))[guildName.toLowerCase()].weekly).toLocaleString()
        } else if (i == 3) {
            gexpInfo.querySelectorAll('h1')[i].textContent = 'GEXP Gain: ' + (JSON.parse(sessionStorage.getItem(guildName.toLowerCase())).weekly - JSON.parse(sessionStorage.getItem('electus')).weekly).toLocaleString()
        } else if (i == 4) {
            if(guildName.toLowerCase() == 'lucid') gexpInfo.querySelectorAll('h1')[i].textContent = 'Distance to #5: N/A'
            else gexpInfo.querySelectorAll('h1')[i].textContent = `Distance to #${rankedGuilds[guilds.indexOf(guildName.toLowerCase())] - 1}: ${(JSON.parse(sessionStorage.getItem(guilds[guilds.indexOf(guildName.toLowerCase()) - 1])).total - JSON.parse(sessionStorage.getItem(guildName.toLowerCase())).total).toLocaleString()}`
        } else if (i == 5) {
            console.log(gexpInfo.querySelectorAll('h1')[i])
            if(guildName.toLowerCase() == 'lucid') gexpInfo.querySelectorAll('h1')[i].textContent = 'Passing (weeks): N/A'
            else gexpInfo.querySelectorAll('h1')[i].textContent = 'Passing (weeks): ' + Math.round((JSON.parse(sessionStorage.getItem(guilds[guilds.indexOf(guildName.toLowerCase()) - 1])).total - JSON.parse(sessionStorage.getItem(guildName.toLowerCase())).total) / (calcAverage(JSON.parse(sessionStorage.getItem('historical'))[guildName.toLowerCase()].weekly) - calcAverage(JSON.parse(sessionStorage.getItem('historical'))[guilds[guilds.indexOf(guildName.toLowerCase()) - 1]].weekly)) * 100) / 100
        }
    }


    guildData = JSON.parse(sessionStorage.getItem(guildName.toLowerCase()))
    historicalData = JSON.parse(sessionStorage.getItem('historical'))[guildName.toLowerCase()]
    if(chartType == 'weekly') makeGraph(historicalData.weekly)
    else if (chartType == 'total') makeGraph(historicalData.total)

    document.querySelector('#guildTitle').innerHTML = `${guildName.capitalize()}<span>[${guildData.tag}]</span>`
    document.querySelector('#guildTitle').querySelector('span').style.color = guildColors[guildData.tagColor]
    if(guildName.toLowerCase() == 'hypixel knights' || guildName.toLowerCase() == 'les gaulois') document.querySelector('#guildTitle').style.fontSize = '5vh' 

    document.querySelector('#toggleChart').addEventListener('click', () => {
        Chart.getChart('gexpChart').destroy()
        console.log('bruh beans')
        if(chartType == 'weekly') {
            chartType = 'total'
            changeGuild(document.querySelector('#guildTitle').innerText.toLowerCase().split('[')[0])
            document.querySelector('#toggleChart').style.backgroundColor = '#181c25'
            document.querySelector('#toggleChart').style.color = 'white'
            document.querySelector('#toggleChart').textContent = 'Total GEXP'
        } else {
            chartType = 'weekly'
            changeGuild(document.querySelector('#guildTitle').innerText.toLowerCase().split('[')[0])
            document.querySelector('#toggleChart').style.backgroundColor = 'white'
            document.querySelector('#toggleChart').style.color = '#181c25'
            document.querySelector('#toggleChart').textContent = 'Weekly GEXP'
        }
    })

    document.querySelector('#exit').addEventListener('click', () => {
        document.querySelector('#moreOverlay').style.display = 'none'
    })
}

let currentGuild;

document.querySelectorAll('.info').forEach(info => {
    info.querySelector('button').addEventListener('click', () => {
        document.querySelector('#moreOverlay').style.display = 'grid'
        changeGuild(info.querySelector('button').parentElement.parentElement.id.capitalize())
    })
})

const canvas = document.querySelector('#gexpCanvas')

function makeGraph(dataset) {
    labels = []
    console.log(dataset)
    date = new Date()
    fetch('https://hypixel-proxy.herokuapp.com/sundays')
    .then(res => res.json())
    .then(data => {
        data.forEach(day => {
            labels.push(day)
        })

        chartData = {
            labels: labels,
            datasets: [{
                label: 'Weekly GEXP',
                backgroundColor: '#00AA00',
                borderColor: '#00AA00',
                data: dataset,
            }]
        };
        
        config = {
            responsize: true,
            maintainAspectRatio: false,
            type: 'line',
            data: chartData,
            options: {}
        };
        
        myChart = new Chart(
            document.getElementById('gexpChart'),
            config
        );

        myChart.canvas.parentNode.style.width = document.body.clientWidth * 0.68 + 'px';
        myChart.canvas.parentNode.style.height = document.body.clientHeight * 0.525 + 'px';
    })
}