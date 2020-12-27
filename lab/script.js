// Ask a question on the Fate Chart
function fate(chaos = 5, odds =  '50/50') {
    let die = roll(100);
    let range = getRange(chaos, odds);

    return {
        fate: fateResult(die, range),
        event: fateEvent(die, chaos)
    };
}

// Consult the Fate Chart for result
function fateResult(die, range) {
    if (die >= range.noExceptional) {
        return 'Exceptional no'
    }
    if (die >= range.no) {
        return 'No'
    }
    if (die >= range.yes) {
        return 'Yes'
    }
    return 'Exceptional yes'
}

// Check if question triggered a random event
function fateEvent(die, chaos) {
    if (die % 11 === 0
        && die / 11 <= chaos
    ) {
        return {
            focus: eventFocus(),
            action: eventAction(),
            subject: eventSubject()
        };
    }
    return false;
}

function eventFocus() {
    const focusTable = {
        7: 'Remote event',
        28: 'NPC action',
        35: 'Introduce a new NPC',
        45: 'Move toward a thread',
        52: 'Move away from a thread',
        55: 'Close a thread',
        67: 'PC negative',
        75: 'PC positive',
        83: 'Ambiguous event',
        92: 'NPC negative',
        100: 'NPC positive'
    };
    const focusTableUpperLimit = Object.keys(focusTable);
    let die = roll(100);
    
    // Loop over upper limits and compare against die roll
    for (let index = 0; index < focusTableUpperLimit.length; index++) {
        const limit = focusTableUpperLimit[index];
        if (die <= parseInt(limit)) {
            return focusTable[limit];
        }
    }
}

function eventAction() {
    const actionTable = [
        'Attainment',
        'Starting',
        'Neglect',
        'Fight',
        'Recruit',
        'Triumph',
        'Violate',
        'Oppose',
        'Malice',
        'Communicate',
        'Persecute',
        'Increase',
        'Decrease',
        'Abandon',
        'Gratify',
        'Inquire',
        'Antagonise',
        'Move',
        'Waste',
        'Truce',
        'Release',
        'Befriend',
        'Judge',
        'Desert',
        'Dominate',
        'Procrastinate',
        'Praise',
        'Separate',
        'Take',
        'Break',
        'Heal',
        'Delay',
        'Stop',
        'Lie',
        'Return',
        'Immitate',
        'Struggle',
        'Inform',
        'Bestow',
        'Postpone',
        'Expose',
        'Haggle',
        'Imprison',
        'Release',
        'Celebrate',
        'Develop',
        'Travel',
        'Block',
        'Harm',
        'Debase',
        'Overindulge',
        'Adjourn',
        'Adversity',
        'Kill',
        'Disrupt',
        'Usurp',
        'Create',
        'Betray',
        'Agree',
        'Abuse',
        'Oppress',
        'Inspect',
        'Ambush',
        'Spy',
        'Attach',
        'Carry',
        'Open',
        'Carelessness',
        'Ruin',
        'Extravagance',
        'Trick',
        'Arrive',
        'Propose',
        'Divide',
        'Refuse',
        'Mistrust',
        'Deceive',
        'Cruelty',
        'Intolerance',
        'Trust',
        'Excitement',
        'Activity',
        'Assist',
        'Care',
        'Negligence',
        'Passion',
        'Work hard',
        'Control',
        'Attract',
        'Failure',
        'Pursue',
        'Vengeance',
        'Proceedings',
        'Dispute',
        'Punish',
        'Guide',
        'Transform',
        'Overthrow',
        'Oppress',
        'Change'
    ];
    let die = roll(100) - 1;

    return actionTable[die];
}

function eventSubject() {
    const subjectTable = [
        'Goals',
        'Dreams',
        'Environment',
        'Outside',
        'Inside',
        'Reality',
        'Allies',
        'Enemies',
        'Evil',
        'Good',
        'Emotions',
        'Opposition',
        'War',
        'Peace',
        'The innocent',
        'Love',
        'The spiritual',
        'The intellectual',
        'New ideas',
        'Joy',
        'Messages',
        'Energy',
        'Balance',
        'Tension',
        'Friendship',
        'The physical',
        'A project',
        'Pleasures',
        'Pain',
        'Possessions',
        'Benefits',
        'Plans',
        'Lies',
        'Expectations',
        'Legal matters',
        'Bureaucracy',
        'Business',
        'A path',
        'News',
        'Exterior factors',
        'Advice',
        'A plot',
        'Competition',
        'Prison',
        'Illness',
        'Food',
        'Attention',
        'Success',
        'Failure',
        'Travel',
        'Jealousy',
        'Dispute',
        'Home',
        'Investment',
        'Suffering',
        'Wishes',
        'Tactics',
        'Stalemate',
        'Randomness',
        'Misfortune',
        'Death',
        'Disruption',
        'Power',
        'A burden',
        'Intrigues',
        'Fears',
        'Ambush',
        'Rumor',
        'Wounds',
        'Extravagance',
        'A representative',
        'Adversities',
        'Opulence',
        'Liberty',
        'Military',
        'The mundane',
        'Trials',
        'Masses',
        'Vehicle',
        'Art',
        'Victory',
        'Dispute',
        'Riches',
        'Status quo',
        'Technology',
        'Hope',
        'Magic',
        'Illusions',
        'Portals',
        'Danger',
        'Weapons',
        'Animals',
        'Weather',
        'Elements',
        'Nature',
        'The public',
        'Leadership',
        'Fame',
        'Anger',
        'Information'
    ];
    let die = roll(100) - 1;

    return subjectTable[die];
}

// Roll an n-sided die
function roll(sides) {
    return getRandomInt(1, sides);
}

function getRange(chaos, odds) {
    let base = getBase(chaos, odds);
    return {
        noExceptional: base + ((100 - base) * 4 / 5),
        no: base,
        yes: base / 5
    };
}

function getBase(chaos, odds) {
    const chart = {
        'impossible': {
            9: 50,
            8: 25,
            7: 15,
            6: 10,
            5: 5,
            4: 5,
            3: 0,
            2: 0,
            1: -20
        },
        'no way': {
            9: 75,
            8: 50,
            7: 35,
            6: 25,
            5: 15,
            4: 10,
            3: 5,
            2: 5,
            1: 0
        },
        'very unlikely': {
            9: 85,
            8: 65,
            7: 50,
            6: 45,
            5: 25,
            4: 15,
            3: 10,
            2: 5,
            1: 5
        },
        'unlikely': {
            9: 90,
            8: 75,
            7: 55,
            6: 50,
            5: 35,
            4: 20,
            3: 15,
            2: 10,
            1: 5
        },
        '50/50': {
            9: 95,
            8: 85,
            7: 75,
            6: 65,
            5: 50,
            4: 35,
            3: 25,
            2: 15,
            1: 10
        },
        'somewhat likely': {
            9: 95,
            8: 90,
            7: 85,
            6: 80,
            5: 65,
            4: 50,
            3: 45,
            2: 25,
            1: 20
        },
        'likely': {
            9: 100,
            8: 95,
            7: 90,
            6: 85,
            5: 75,
            4: 55,
            3: 50,
            2: 35,
            1: 25
        },
        'very likely': {
            9: 105,
            8: 95,
            7: 95,
            6: 90,
            5: 85,
            4: 75,
            3: 65,
            2: 50,
            1: 45
        },
        'near sure thing': {
            9: 115,
            8: 100,
            7: 95,
            6: 95,
            5: 90,
            4: 80,
            3: 75,
            2: 55,
            1: 50
        },
        'a sure thing': {
            9: 125,
            8: 110,
            7: 95,
            6: 95,
            5: 90,
            4: 85,
            3: 80,
            2: 65,
            1: 55
        },
        'has to be': {
            9: 145,
            8: 130,
            7: 100,
            6: 100,
            5: 95,
            4: 95,
            3: 90,
            2: 85,
            1: 80
        }
    };
    return chart[odds][chaos];
}

// Source: https://stackoverflow.com/a/18230432
function getRandomInt(min, max) {
    // Create byte array and fill with 1 random number
    let byteArray = new Uint8Array(1);
    window.crypto.getRandomValues(byteArray);

    let range = max - min + 1;
    let max_range = 256;
    if (byteArray[0] >= Math.floor(max_range / range) * range)
        return getRandomInt(min, max);
    return min + (byteArray[0] % range);
}
