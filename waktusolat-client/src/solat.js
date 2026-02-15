import axios from "axios"

const zone = "PHG04" //Pahang barat
const apiurl = `https://api.waktusolat.app/v2/solat/${zone}`


const getwaktusolat = async() => {
    try{
        const response = await axios.get(apiurl)
        createtree(response.data)
    }
    catch(e){
        console.log(e)
    }
}

getwaktusolat()


const createtree = (data) => {
    const date = document.getElementById('date')
    const widget = document.getElementById('widget')
    const {last_updated, month, month_number, prayers, year, zone} = data
    const today_date = new Date().getDate()
    const today_prayer = prayers.find(prayer => prayer.day == today_date)    
    const {asr,day, dhuhr, fajr, hijri, isha, maghrib, syuruk } = today_prayer
    const filtered = {fajr, syuruk,dhuhr, asr, maghrib, isha }
    
    var datearr = [ day + " " + month, year, zone]

    datearr.forEach(item => {
        var datecontent = document.createElement('div')
        datecontent.textContent = item
        // datecontent.textContent = `${day} ${month} | ${year} | ${zone}`
        date.append(datecontent)
    })


    var prayertimearr = []
    for(const key in filtered){
        var prayertimeobj = {}
        prayertimeobj["name"] = key.toUpperCase()
        prayertimeobj["time"] = unixToTime(today_prayer[key])        
        prayertimearr.push(prayertimeobj)
    }

    const now = new Date()
    const currentMinutes = now.getHours() * 60 + now.getMinutes()

    let activeContainer = null
    let lastPrayerMinutes = -1

    prayertimearr.forEach(prayer => {
        const container = document.createElement('div')
        const header = document.createElement('div')
        const content = document.createElement('div')

        const [hour, minute] = prayer.time.split(":").map(Number)
        const prayerMinutes = hour * 60 + minute //convert to minutes

        header.textContent = prayer.name
        content.textContent = prayer.time

        if (currentMinutes >= prayerMinutes && prayerMinutes > lastPrayerMinutes) {
            activeContainer = container
            lastPrayerMinutes = prayerMinutes
        }

        container.append(header, content)
        widget.append(container)
    })

    // Add active class only once
    if (activeContainer) {
        activeContainer.classList.add('active')
    }

    
}

function unixToTime(timestamp) {
    return new Date(timestamp * 1000).toLocaleTimeString('en-GB').slice(0, 5);
}


