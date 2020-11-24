const currentYear = new Date().getFullYear();

function logDate(aDate) {
    
    var tempDate = new Date(aDate);
    var realMonth = tempDate.getMonth() +1;
    console.log(tempDate.getDate() + " " + realMonth + " " + tempDate.getFullYear());
}


function previousDay(aDate) {
    var thePreviousDate = new Date(aDate.getFullYear(), aDate.getMonth(), aDate.getDate()-1);

    return thePreviousDate;
}

function nov_startLower(year) {

    var examinedYear = year;

    var d = new Date(examinedYear, 10, 11);
    var startDay;

    // notation jours de la semaine = de dimanche (0) à samedi (6)

    // Searching for next sunday to start lower season
    if(d.getDay() > 3) { // if starting from thursday (pont jusqu'au mercredi)
        if(d.getDay() == 4) startDay =  new Date(examinedYear, 10, 11+3);   // if thursday
        else if(d.getDay() == 5) startDay =  new Date(examinedYear, 10, 11+2); // if friday
        else if(d.getDay() == 6) startDay =  new Date(examinedYear, 10, 11+1); // if saturday
    } 
    else {
        startDay = new Date(d);
    } 
    
    // logDate(startDay);

    return startDay;
}


function dateOfNextDay(theDate, nextDayOfWeek) {

    let d = new Date(theDate);
    let dayOfTheDate = theDate.getDay();
    let startDay;

    let dayDifference = nextDayOfWeek - dayOfTheDate;

    // notation jours de la semaine = de dimanche (0) à samedi (6)
    // ici nextDayOfWeek est surtout
    //                       = 5 (vendredi) pour le passage vers une saison plus forte
    //                       = 0 (dimanche) pour le passage vers une saison plus faible
    // ==> intérêt = maximiser le temps en saison plus forte
        
    if(dayDifference == 0) {
        startDay = new Date(d);
    }
    else {
        if(nextDayOfWeek == 0) { // si c'est dimanche
            startDay = new Date(d.getFullYear(), d.getMonth(), d.getDate()+7-dayOfTheDate);
        }
        else if(dayDifference > 0) {
            startDay = new Date(d.getFullYear(), d.getMonth(), d.getDate()+dayDifference);
        }
        else if(dayDifference < 0) {
            startDay = new Date(d.getFullYear(), d.getMonth(), d.getDate()+7-dayDifference);
        }
    }


    return startDay;
}



// const currentYear = new Date().getFullYear();

new Calendar('#seasonCalendar', {
    language: 'fr',
    style: 'background',
  
  mouseOnDay: function(e) {
    if(e.events.length > 0) {
        var content = '';
        
        for(var i in e.events) {
            content += '<div class="event-tooltip-content">'
                            // + '<div class="event-name" style="color:pink">' + e.events[i].name + '</div>'
                            + '<div class="event-name" style="color:' + e.events[i].color + '">' + e.events[i].name + '</div>'
                            + '<div class="event-location">' + e.events[i].location + '</div>'
                        + '</div>';
        }
    
        $(e.element).popover({ 
            trigger: 'manual',
            container: 'body',
            html:true,
            content: content
        });
        
        $(e.element).popover('show');
    }
},
mouseOutDay: function(e) {
    if(e.events.length > 0) {
        $(e.element).popover('hide');
    }
},
dayContextMenu: function(e) {
    $(e.element).popover('hide');
},
dataSource: [

    // notation jours de la semaine = de dimanche (0) à samedi (6)
    // ici nextDayOfWeek (deuxième paramètre de la fonction dateOfNextDay(Date, nextDayOfWeek)) est surtout
    //                       = 5 (vendredi) pour le passage vers une saison plus forte
    //                       = 0 (dimanche) pour le passage vers une saison plus faible
    // ==> intérêt = maximiser le temps en saison plus forte

    {
        id: 0,
        name: 'Basse saison (en € / nuit)',
        location: 'L&#39Olivier : <strong>85</strong><br>Le Noisetier : <strong>85</strong><br>L&#39Amandier : <strong>95</strong><br>L&#39Abricotier : <strong>115</strong><br>',
        startDate: nov_startLower(new Date(currentYear-1)),
        endDate: previousDay(new Date(currentYear-1, 11, 19))
    },
    {
        id: 1,
        name: 'Moyenne saison (en € / nuit)',
        location: 'L&#39Olivier : <strong>95</strong><br>Le Noisetier : <strong>95</strong><br>L&#39Amandier : <strong>110</strong><br>L&#39Abricotier : <strong>125</strong><br>',
        startDate: new Date(currentYear-1, 11, 19),
        endDate: previousDay(dateOfNextDay(new Date(currentYear, 00, 05), 0))
    },
    {
        id: 2,
        name: 'Basse saison (en € / nuit)',
        location: 'L&#39Olivier : <strong>85</strong><br>Le Noisetier : <strong>85</strong><br>L&#39Amandier : <strong>95</strong><br>L&#39Abricotier : <strong>115</strong><br>',
        startDate: dateOfNextDay(new Date(currentYear, 00, 05), 0),
        endDate: previousDay(dateOfNextDay(new Date(currentYear, 2, 10), 5))
    },
    {
        id: 3,
        name: 'Moyenne saison (en € / nuit)',
        location: 'L&#39Olivier : <strong>95</strong><br>Le Noisetier : <strong>95</strong><br>L&#39Amandier : <strong>110</strong><br>L&#39Abricotier : <strong>125</strong><br>',
        startDate: dateOfNextDay(new Date(currentYear, 2, 10), 5),
        endDate: previousDay(dateOfNextDay(new Date(currentYear, 5, 10), 5))
    },
    {
        id: 4,
        name: 'Haute saison (en € / nuit)',
        location: 'L&#39Olivier : <strong>110</strong><br>Le Noisetier : <strong>110</strong><br>L&#39Amandier : <strong>130</strong><br>L&#39Abricotier : <strong>140</strong><br>',
        startDate: dateOfNextDay(new Date(currentYear, 5, 10), 5),
        endDate: previousDay(dateOfNextDay(new Date(currentYear, 8, 14), 0))
    },
    {
        id: 5,
        name: 'Moyenne saison (en € / nuit)',
        location: 'L&#39Olivier : <strong>95</strong><br>Le Noisetier : <strong>95</strong><br>L&#39Amandier : <strong>110</strong><br>L&#39Abricotier : <strong>125</strong><br>',
        startDate: dateOfNextDay(new Date(currentYear, 8, 14), 0),
        endDate: previousDay(nov_startLower(new Date(currentYear)))
    },
    {
        id: 0,
        // name: plop(),
        name: 'Basse saison (en € / nuit)',
        location: 'L&#39Olivier : <strong>85</strong><br>Le Noisetier : <strong>85</strong><br>L&#39Amandier : <strong>95</strong><br>L&#39Abricotier : <strong>115</strong><br>',
        startDate: nov_startLower(new Date(currentYear)),
        endDate: previousDay(new Date(currentYear, 11, 19))
    },
    {
        id: 1,
        name: 'Moyenne saison (en € / nuit)',
        location: 'L&#39Olivier : <strong>95</strong><br>Le Noisetier : <strong>95</strong><br>L&#39Amandier : <strong>110</strong><br>L&#39Abricotier : <strong>125</strong><br>',
        startDate: new Date(currentYear, 11, 19),
        endDate: previousDay(dateOfNextDay(new Date(currentYear+1, 00, 05), 0))
    },
    {
        id: 2,
        name: 'Basse saison (en € / nuit)',
        location: 'L&#39Olivier : <strong>85</strong><br>Le Noisetier : <strong>85</strong><br>L&#39Amandier : <strong>95</strong><br>L&#39Abricotier : <strong>115</strong><br>',
        startDate: dateOfNextDay(new Date(currentYear+1, 00, 05), 0),
        endDate: previousDay(dateOfNextDay(new Date(currentYear+1, 2, 10), 5))
    },
    {
        id: 3,
        name: 'Moyenne saison (en € / nuit)',
        location: 'L&#39Olivier : <strong>95</strong><br>Le Noisetier : <strong>95</strong><br>L&#39Amandier : <strong>110</strong><br>L&#39Abricotier : <strong>125</strong><br>',
        startDate: dateOfNextDay(new Date(currentYear+1, 2, 10), 5),
        endDate: previousDay(dateOfNextDay(new Date(currentYear+1, 5, 10), 5))
    },
    {
        id: 4,
        name: 'Haute saison (en € / nuit)',
        location: 'L&#39Olivier : <strong>110</strong><br>Le Noisetier : <strong>110</strong><br>L&#39Amandier : <strong>130</strong><br>L&#39Abricotier : <strong>140</strong><br>',
        startDate: dateOfNextDay(new Date(currentYear+1, 5, 10), 5),
        endDate: previousDay(dateOfNextDay(new Date(currentYear+1, 8, 14), 0))
    },
    {
        id: 5,
        name: 'Moyenne saison (en € / nuit)',
        location: 'L&#39Olivier : <strong>95</strong><br>Le Noisetier : <strong>95</strong><br>L&#39Amandier : <strong>110</strong><br>L&#39Abricotier : <strong>125</strong><br>',
        startDate: dateOfNextDay(new Date(currentYear+1, 8, 14), 0),
        endDate: previousDay(dateOfNextDay(new Date(currentYear+1, 10, 12), 0))
    },
    {
        id: 0,
        // name: plop(),
        name: 'Basse saison (en € / nuit)',
        location: 'L&#39Olivier : <strong>85</strong><br>Le Noisetier : <strong>85</strong><br>L&#39Amandier : <strong>95</strong><br>L&#39Abricotier : <strong>115</strong><br>',
        startDate: nov_startLower(new Date(currentYear+1)),
        endDate: previousDay(new Date(currentYear+1, 11, 19))
    },
    {
        id: 1,
        name: 'Moyenne saison (en € / nuit)',
        location: 'L&#39Olivier : <strong>95</strong><br>Le Noisetier : <strong>95</strong><br>L&#39Amandier : <strong>110</strong><br>L&#39Abricotier : <strong>125</strong><br>',
        startDate: new Date(currentYear+1, 11, 19),
        endDate: previousDay(dateOfNextDay(new Date(currentYear+2, 00, 05), 0))
    },
    {
        id: 2,
        name: 'Basse saison (en € / nuit)',
        location: 'L&#39Olivier : <strong>85</strong><br>Le Noisetier : <strong>85</strong><br>L&#39Amandier : <strong>95</strong><br>L&#39Abricotier : <strong>115</strong><br>',
        startDate: dateOfNextDay(new Date(currentYear+2, 00, 05), 0),
        endDate: previousDay(dateOfNextDay(new Date(currentYear+2, 2, 10), 5))
    },
    {
        id: 3,
        name: 'Moyenne saison (en € / nuit)',
        location: 'L&#39Olivier : <strong>95</strong><br>Le Noisetier : <strong>95</strong><br>L&#39Amandier : <strong>110</strong><br>L&#39Abricotier : <strong>125</strong><br>',
        startDate: dateOfNextDay(new Date(currentYear+2, 2, 10), 5),
        endDate: previousDay(dateOfNextDay(new Date(currentYear+2, 5, 10), 5))
    },
    {
        id: 4,
        name: 'Haute saison (en € / nuit)',
        location: 'L&#39Olivier : <strong>110</strong><br>Le Noisetier : <strong>110</strong><br>L&#39Amandier : <strong>130</strong><br>L&#39Abricotier : <strong>140</strong><br>',
        startDate: dateOfNextDay(new Date(currentYear+2, 5, 10), 5),
        endDate: previousDay(dateOfNextDay(new Date(currentYear+2, 8, 14), 0))
    },
    {
        id: 5,
        name: 'Moyenne saison (en € / nuit)',
        location: 'L&#39Olivier : <strong>95</strong><br>Le Noisetier : <strong>95</strong><br>L&#39Amandier : <strong>110</strong><br>L&#39Abricotier : <strong>125</strong><br>',
        startDate: dateOfNextDay(new Date(currentYear+2, 8, 14), 0),
        endDate: previousDay(dateOfNextDay(new Date(currentYear+2, 10, 12), 0))
    },
    {
        id: 6,
        name: 'Aujourd\'hui',
        location: ' ',
        startDate: new Date(),
        endDate: new Date(),
        color: '#4dc6fbba'
    },
]
  

})

