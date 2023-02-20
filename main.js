if(navigator.userAgent.includes('iPad') || navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPod') || navigator.userAgent.includes('Macintosh')) {
    document.body.querySelector('#header').style.display = 'none' 
    document.body.querySelector('#content').style.display = 'none' 
    element = document.createElement('div')
    element.textContent = 'get on a pc lol'
    document.body.appendChild(element)
}

document.querySelector('#call').addEventListener('click', () => {
    window.location.href = '#discord'
})

const electus = document.querySelector('#electus')
electus.addEventListener('click', () => {
    window.location.href = '#'
})

const panorama = document.querySelector('#panorama')
const images = ['images/spawn.jpg', 'images/mid1.jpg', 'images/mid2.jpg', 'images/mid3.jpg', 'images/diamond.jpg']

function transImg(next) {
    panorama.style.opacity = 0
    setTimeout(() => {
        panorama.src = images[next]
        panorama.style.opacity = 1
    }, 750);
}

let i = 0
setInterval(() => {
    i++
    if (i == images.length) i = 0
    transImg(i)
}, 10000);

const reviews = [
    {},
    {
        name: 'Speedwey',
        review: 'it is gud guild i recomend u shud join now wheres my money',
        rating: 5
    },
    {
        name: 'ohHard',
        review: 'The community is very friendly with very supportive people. No one seems to be toxic to others around them and will always be a “welcome back” when you join.',
        rating: 5
    },
    {
        name: 'teamgrief',
        review: 'teamgrief rate guild is  69/5 elecuts are best'
    },
    {
        name: 'mehxtra',
        review: 'Electus. The most magical place on earth. I have met many friends here and am continuously making more. I would 100% recommend buying this product as it greatly improved my life.',
        rating: 5
    },
    {
        name: 'Derpifyed',
        review: "very epic and poggers and 'mogus gamign, pee is stinky",
        rating: 5
    }, 
    {
        name: 'Turpy',
        review: 'no comment'
    },
    {
        name: 'carit_01',
        review: 'aight i wanna see if walls if queuing'
    },
    {
        name: 'ily_mal',
        review: 'very chill avoid flame at all costs'
    }
]

let reviewIterator = 1
const review = document.querySelector('#reviews')
const next = document.querySelector('#next')
const previous = document.querySelector('#previous')

next.addEventListener('click', () => {
    reviewIterator++ 
    review.querySelector('h1').textContent = reviews[reviewIterator].name
    review.querySelector('p').textContent = reviews[reviewIterator].review
    if(reviewIterator == reviews.length - 1) reviewIterator = 0
})

previous.addEventListener('click', () => {
    if(reviewIterator == 1) return
    reviewIterator--
    review.querySelector('h1').textContent = reviews[reviewIterator].name
    review.querySelector('p').textContent = reviews[reviewIterator].review
})

const staffTitle = document.querySelector('#staffTitle')
let staffTranslate = 10
let oldScroll;

const turpBg = document.querySelector('#turpBg')
let turpBgTranslate = -50
const turpGif = document.querySelector('#turpGif')
let turpGifTranslate = -265

const madieBg = document.querySelector('#madieBg')
let madieBgTranslate = 135
const madieGif = document.querySelector('#madieGif')
let madieGifTranslate = 125

const gmBg = document.querySelector('#gmBg')
let gmBgTranslate = -50
const gmGif = document.querySelector('#gmGif')
let gmGifTranslate = 150

// window.addEventListener('scroll', (args) => {
//     scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight)

//     if(scrollPercentage > 0.2 && oldScroll < window.scrollY) {
//         turpBgTranslate += 0.2
//         turpBg.style.transform = `translateX(${turpBgTranslate}%)`

//         turpGifTranslate += 0.2
//         turpGif.style.transform = `translate(${turpGifTranslate}%, -20%)`

//         madieBgTranslate -= 0.2
//         madieBg.style.transform = `translateX(${madieBgTranslate}%)`

//         madieGifTranslate -= 0.2
//         madieGif.style.transform = `translate(${madieGifTranslate}%, -10%)`

//     } else if (scrollPercentage > 0.25 && oldScroll > window.scrollY) {
//         turpBgTranslate -= 0.2
//         turpBg.style.transform = `translateX(${turpBgTranslate}%)`

//         turpGifTranslate -= 0.2
//         turpGif.style.transform = `translate(${turpGifTranslate}%, -20%)`

//         madieBgTranslate += 0.2
//         madieBg.style.transform = `translateX(${madieBgTranslate}%)`

//         madieGifTranslate += 0.2
//         madieGif.style.transform = `translate(${madieGifTranslate}%, -10%)`

//     }

//     if(scrollPercentage > 0.6 && oldScroll < window.scrollY) {

//         gmBgTranslate += 0.1
//         gmBg.style.transform = `translateX(${gmBgTranslate}%)`

//         gmGifTranslate += 0.8
//         gmGif.style.transform = `translateX(${gmGifTranslate}%)`    

//     } else if (scrollPercentage > 0.6 && oldScroll > window.scrollY) {

//         gmBgTranslate -= 0.1
//         gmBg.style.transform = `translateX(${gmBgTranslate}%)`

//         gmGifTranslate -= 0.8
//         gmGif.style.transform = `translateX(${gmGifTranslate}%)`

//     }

//     oldScroll = window.scrollY
// })


const question = document.querySelector('#selectMain').querySelector('span')
question.addEventListener('click', () => {

})


const username = document.querySelector('#userIn')
let typeTimer

const sessionStorage = window.sessionStorage

const nwlvl = document.querySelector('#nwlvl')
let nwMeetReqs

function typeString(string, element, before) {
    let i = 0
    chars = string.toString().split('')
    typedChars = []
    setInterval(() => {
        typedChars.push(chars[i])
        element.textContent = before + typedChars.join('').toString()
        i++
    }, 150);
}

username.addEventListener('keyup', () => {
    clearTimeout(typeTimer)
    typeTimer = setTimeout(() => {
        sessionStorage.removeItem('stats')
        if(document.querySelector('#username').style.color == 'rgb(63, 199, 97)') {
            fetch('https://hypixel-proxy.herokuapp.com/player?name=' + username.value)
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    typeString(Math.floor((Math.sqrt((2 * data.player.networkExp) + 30625) / 50) - 2.5), nwlvl, 'Hypixel Level: ')
                    if(Math.floor((Math.sqrt((2 * data.player.networkExp) + 30625) / 50) - 2.5) >= 80) {
                        nwMeetReqs = true
                        nwlvl.style.color = '#3fc761'
                        sessionStorage.setItem('stats', JSON.stringify(data.player.stats))
                        sessionStorage.setItem('ap', JSON.stringify(data.player.achievements))
                    } else {
                        nwMeetReqs = false
                        nwlvl.style.color = '#d92020'
                    }
                }
            })
            fetch(`https://api.ashcon.app/mojang/v2/user/${username.value.toString()}`)
            .then(res => res.json())
            .then(data => sessionStorage.setItem('uuid', data.uuid))
        }
    }, 750)
})

username.addEventListener('keydown', () => {
    if(username.value.toString().match(/^[a-zA-Z0-9_]{3,16}$/)) {
        document.querySelector('#username').style.color = '#3fc761'

        
    } else if (username.value.toString() == '') {
        document.querySelector('#username').style.color = '#fff'
    } else {
        document.querySelector('#username').style.color = '#d92020'
    }
    clearTimeout(typeTimer)
})

const mains = []

const regSkill = [50,175,375,675,1175,1925,2925,4425,6425,9925,14925,22425,32425,47425,67425,97425,147425,222425,322425,522425,822425,1222425,1722425,2322425,3022425,3822425,4722425,5722425,6822425,8022425,9322425,10722425,12222425,13822425,15522425,17322425,19222425,21222425,23322425,25522425,27822425,30222425,32722425,35322425,38072425,40972425,44072425,47472425,51172425,55172425,59472425,64072425,68972425,74172425,79672425,85472425,91572425,97972425,104672425,111672425]

const dungeonSkill = [
    50,
    75,
    110,
    160,
    230,
    330,
    470,
    670,
    950,
    1340,
    1890,
    2665,
    3760,
    5260,
    7380,
    10300,
    14400,
    20000,
    27600,
    38000,
    52500,
    71500,
    97000,
    132000,
    180000,
    243000,
    328000,
    445000,
    600000,
    800000,
    1065000,
    1410000,
    1900000,
    2500000,
    3300000,
    4300000,
    5600000,
    7200000,
    9200000,
    12000000,
    15000000,
    19000000,
    24000000,
    30000000,
    38000000,
    48000000,
    60000000,
    75000000,
    93000000,
    116250000
  ]

function calculateBedWarsLevel(experience) {
    let level = Math.floor(experience / 487000) * 100;
  
    experience = experience % 487000;
  
    if (experience < 500)
      return level + experience / 500;
    level++;
  
    if (experience < 1500)
      return level + (experience - 500) / 1000;
    level++;
  
    if (experience < 3500)
      return level + (experience - 1500) / 2000;
    level++;
  
    if (experience < 7000)
      return level + (experience - 3500) / 3500;
    level++;
  
    experience -= 7000;
  
    return Math.floor(level + experience / 5000);
}

function checkStats(stats) {
    check = []
    goodCheck = []
    if(Object.keys(stats).includes('Bedwars')) {
        bwStar = calculateBedWarsLevel(stats.Bedwars.Experience)
        if(bwStar < 150) check.push('Bedwars Star ' + bwStar)
        else goodCheck.push('Bedwars Star ' + bwStar)
        if((stats.Bedwars.final_kills_bedwars / stats.Bedwars.final_deaths_bedwars) < 2.5) check.push('Bedwars FKDR ' + Math.round(stats.Bedwars.final_kills_bedwars / stats.Bedwars.final_deaths_bedwars * 10) / 10)
        else goodCheck.push('Bedwars FKDR ' + Math.round(stats.Bedwars.final_kills_bedwars / stats.Bedwars.final_deaths_bedwars * 10) / 10)
        if((stats.Bedwars.wins_bedwars / stats.Bedwars.losses_bedwars) < 2) check.push('Bedwars WLR ' + Math.round(stats.Bedwars.wins_bedwars / stats.Bedwars.losses_bedwars * 10) / 10)
        else goodCheck.push('Bedwars WLR ' + Math.round(stats.Bedwars.wins_bedwars / stats.Bedwars.losses_bedwars * 10) / 10)
    }
    if(Object.keys(stats).includes('SkyWars')) {
        xp = stats.SkyWars.skywars_experience

        xps = [0, 20, 70, 150, 250, 500, 1000, 2000, 3500, 6000, 10000, 15000];
        exactLevel = 0
        if (xp >= 15000) {
            exactLevel = (xp - 15000) / 10000 + 12;
        } else {
        for (i = 0; i < xps.length; i++) {
            if (xp < xps[i]) {
                exactLevel = Math.round(i + (xp - xps[i-1]) / (xps[i] - xps[i-1]))
                break;
                }
            }
        }
        if(exactLevel < 12) check.push('SkyWars Level ' + exactLevel)
        else goodCheck.push('SkyWars Level ' + exactLevel)
        if(stats.SkyWars?.kills / stats.SkyWars?.deaths < 1.2) check.push('SkyWars KDR ' + Math.round(stats.SkyWars?.kills / stats.SkyWars?.deaths * 10) / 10)
        else goodCheck.push('SkyWars KDR ' + Math.round(stats.SkyWars?.kills / stats.SkyWars?.deaths * 10) / 10)
    }
    if(Object.keys(stats).includes('Duels')) {
        if(stats.Duels.wins >= 5000) {
            if(stats.Duels.wins / stats.Duels.losses < 3) check.push('Duels WLR ' + Math.round(stats.Duels.wins / stats.Duels.losses * 10) / 10)
            else goodCheck.push('Duels Wins&WLR ' + Math.round(stats.Duels.wins / stats.Duels.losses * 10) / 10)
        } else {
            check.push('Duels Wins&WLR ' + stats.Duels.wins)
        }

        if(stats.Duels.wins >= 10000) {
            check.splice(check?.indexOf('Duels Wins&WLR ' + Math.round(stats.Duels.wins / stats.Duels.losses * 10) / 10), 1)
            check.splice(check?.indexOf('Duels WLR ' + stats.Duels.wins), 1)
            goodCheck.push('Duels Wins ' + stats.Duels.wins)
        }
    }
    if(Object.keys(stats).includes('SkyBlock')) {
        fetch('https://hypixel-proxy.herokuapp.com/skyblock&profile=' + profileSelect + '&uuid=' + sessionStorage.getItem('uuid'))
        .then(res => res.json())
        .then(data => {
            skills = 0
            playerStats = data.profile.members[sessionStorage.getItem('uuid').replace(/-/g, '')]
            Object.keys(playerStats).forEach(key => {
                if(key.includes('experience_skill') && !key.match(/runecrafting|carpentry/g)) {
                    for(i = 0; i < regSkill.length; i++) {
                        if(playerStats[key] > regSkill[i]) {
                            skills++
                        } else {
                            return;
                        }
                    }
                }
            })
            if(skills / 8 < 35) check.push('SkyBlock Skill-Average ' + skills / 8)
            else goodCheck.push('SkyBlock Skill-Average ' + skills / 8)

            

            dungeonSkills = 0
            dungeonExp = playerStats.dungeons.dungeon_types.catacombs.experience
            for(i = 0; i < dungeonSkill.length; i++) {
                if(dungeonExp > dungeonSkill[i]) {
                    dungeonSkills++
                } else {
                    break;
                }
            }
            if(dungeonSkills < 35) check.push('SkyBlock Catacombs-Level ' + dungeonSkills)
            else goodCheck.push('SkyBlock Catacombs-Level ' + dungeonSkills)

        })
    }
    if(Object.keys(stats).includes('Arcade')) {
        ap = JSON.parse(sessionStorage.getItem('ap'))
        if(ap.arcade_arcade_winner <= 1000) check.push('Arcade Wins ' + ap.arcade_arcade_winner)
        else goodCheck.push('Arcade Wins ' + ap.arcade_arcade_winner)
    }
    if(Object.keys(stats).includes('TNTGames')) {
        if(stats.TNTGames.wins < 600) check.push('TNTGames Wins ' + stats.TNTGames.wins)
        else goodCheck.push('TNTGames Wins ' + stats.TNTGames.wins)
    }
    if(Object.keys(stats).includes('HungerGames')) {
        if(stats.HungerGames.kills / stats.HungerGames.deaths < 1.5) check.push('Blitz KDR ' + Math.round(stats.HungerGames.kills / stats.HungerGames.deaths * 10) / 10)
        else goodCheck.push('Blitz KDR ' + Math.round(stats.HungerGames.kills / stats.HungerGames.deaths * 10) / 10)
        if(stats.HungerGames.kills < 4500) check.push('Blitz Kills ' + stats.HungerGames.kills)
        else goodCheck.push('Blitz Kills ' + stats.HungerGames.kills)
        if(stats.HungerGames.wins / (stats.HungerGames.games_played - stats.HungerGames.wins) < 0.2) check.push('Blitz WLR ' + Math.round(stats.HungerGames.wins / (stats.HungerGames.games_played - stats.HungerGames.wins) * 10) / 10)
        else goodCheck.push('Blitz WLR ' + Math.round(stats.HungerGames.wins / (stats.HungerGames.games_played - stats.HungerGames.wins) * 10) / 10)
    }
    if(Object.keys(stats).includes('MurderMystery')) {
        if(stats.MurderMystery.wins < 3000) check.push('Murder-Mystery Wins ' + stats.MurderMystery.wins)
        else goodCheck.push('Murder-Mystery Wins ' + stats.MurderMystery.wins)
        if(stats.MurderMystery.kills < 5000) check.push('Murder-Mystery Kills ' + stats.MurderMystery.kills)
        else goodCheck.push('Murder-Mystery Kills ' + stats.MurderMystery.kills)
        if(stats.MurderMystery.kills / stats.MurderMystery.deaths < 2) check.push('Murder-Mystery KDR ' + Math.round(stats.MurderMystery.kills / stats.MurderMystery.deaths * 10) / 10)
        else goodCheck.push('Murder-Mystery KDR ' + Math.round(stats.MurderMystery.kills / stats.MurderMystery.deaths * 10) / 10)
    }
    if(Object.keys(stats).includes('BuildBattle')) {
        if(stats.BuildBattle.score < 2500) check.push('Build-Battle Score ' + stats.BuildBattle.score) 
        else goodCheck.push('Build-Battle Score ' + stats.BuildBattle.score)
    }

    games = []

    Object.keys(stats).forEach(game => {
        if(game == 'MurderMystery') {
            games.push('Murder-Mystery')
        } else if (game == 'BuildBattle') {
            games.push('Build-Battle')
        } else if (game == 'HungerGames') {
            games.push('Blitz')
        } else {
            games.push(game)
        }
    })

    setTimeout(() => {
        reqsDisplay(check, goodCheck, Object.keys(stats).length, games)
    }, 3000);
}

const sbProfiles = []
let profileSelect;

const sbProfile = document.querySelector('#skyblock').querySelector('div')
sbProfile.addEventListener('click', () => {
    sbProfile.classList.toggle('expandedSB')
    sbProfile.querySelector('h1').classList.toggle('arrowTurn')
    if(sbProfile.classList.contains('expandedSB')) {
        document.querySelector('#skyblock').querySelector('p').innerHTML = ''

        if(document.querySelector('#username').style.color == 'rgb(63, 199, 97)') {
            stats = JSON.parse(sessionStorage.getItem('stats')).SkyBlock
            Object.keys(stats.profiles).forEach((profile, i) => {
                element = document.createElement('div')
                element.classList.add('profileSB')
                if(i == 0 || i == 1) element.style.gridRow = '1'
                else element.style.gridRow = '2'
                if(i == 1 || i == 3) element.style.gridColumn = '1'
                else element.style.gridColumn = '2'
                element.textContent = stats.profiles[profile].cute_name
                element.setAttribute('data-profileID', stats.profiles[profile].profile_id)
                
                sbProfile.appendChild(element)
            })
            document.querySelectorAll('.profileSB').forEach(profile => {
                profile.addEventListener('click', () => {
                    profileSelect = profile.getAttribute('data-profileID')
                    profile.remove()
                    document.querySelector('#skyblock').classList.toggle('mainSelected')
                    mains.push(document.querySelector('#skyblock').getAttribute('data-game'))
                })
            })
        }
       
    } else {
        document.querySelector('#skyblock').querySelector('p').innerHTML = 'Catacombs level 30, <br>Skill Average of 35'
        sbProfile.innerHTML = '<h1></h1>'
    }
    
})

const overlay = document.querySelector('#overlay')

function reqsDisplay(check, goodCheck, gameNum, games) {
    stayCheck = check
    allCheck = check.concat(goodCheck)
    overlay.querySelector('#loading').innerHTML = ''
    document.querySelector(':root').style.setProperty('--reqRows', gameNum)
    overlay.querySelector('#loading').classList.add('reqsDisplay')

    reqTitle = document.createElement('h1')
    reqTitle.textContent = 'Requirements'
    reqTitle.classList.add('reqsTitle')
    overlay.querySelector('#loading').appendChild(reqTitle)

    exit = document.createElement('h2')
    overlay.querySelector('#loading').appendChild(exit)
    exit.classList.add('exit')

    exit.addEventListener('click', () => {
        overlay.style.display = 'none'
        lowreqs.classList.toggle('slideIn')
    })

    lowreqs = document.querySelector('#lowreqs')
    lowreqs.classList.toggle('slideIn')

    const reqs = {}

    games.forEach(game => {
        reqs[game] = []
    })

    for(i = 0; i < allCheck.length; i++) {
        splitThing = allCheck[i].split(' ')
        if(games.includes(splitThing[0])) {
            reqs[splitThing[0]].push(splitThing[1] + ' ' + splitThing[2])
        } else {
        }
    }

    Object.keys(reqs).forEach((game, i) => {
        reqDisplay = document.createElement('div')
        reqDisplay.classList.add('reqDisplay')

        reqTitle = document.createElement('h1')
        reqTitle.textContent = game

        list = document.createElement('ul')
        reqs[game].forEach(req => {
            listItem = document.createElement('li')
            listItem.textContent = req
            if(stayCheck.includes(game + ' ' + req)) {
                listItem.style.color = '#d92020'
            } else {
                listItem.style.color = '#3fc761'
            }

            list.appendChild(listItem)
        })
        reqDisplay.appendChild(reqTitle)
        reqDisplay.appendChild(list)
        overlay.querySelector('#loading').appendChild(reqDisplay)
    })
}

const done = document.querySelector('#done')
done.addEventListener('click', () => {
    stats = JSON.parse(sessionStorage.getItem('stats'))
    mainStats = {}
    mains.forEach(main => {
        mainStats[main] = stats[main]
    })
    overlay.style.display = 'grid'
    
    checkStats(mainStats)
})


const reqs = document.querySelectorAll(".req")
reqs.forEach(req => {
    req.addEventListener('click', () => {
        req.classList.toggle('mainSelected')

        if(req.classList.contains('mainSelected')) {
            mains.push(req.getAttribute('data-game'))
        } else {
            reqIndex = mains.indexOf(req.getAttribute('data-game'))
            mains.splice(reqIndex, 1)
        }
    })
})



document.querySelector('#joinjoin').addEventListener('click', () => {
    window.open('https://discord.gg/dPVGXT9Gak')
})