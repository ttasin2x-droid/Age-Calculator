/**
 * CHRONO AGE CALCULATOR
 * Built by Tanvir Tasin
 * Ultimate age calculator with generation detection and life insights
 */

// ============================================
// STATE MANAGEMENT
// ============================================
const state = {
    countdownInterval: null,
    ageChart: null,
    selectedGen: null,
    currentCelebIndex: 0,
    matchedCelebs: []
};

// ============================================
// DATA CONSTANTS
// ============================================
const GENERATIONS = {
    boomer: { 
        icon: '📻', 
        name: 'Baby Boomer', 
        tagline: 'The post-war builders (1946-1964)', 
        color: 'boomer' 
    },
    x: { 
        icon: '📼', 
        name: 'Generation X', 
        tagline: 'The independent latchkey kids (1965-1980)', 
        color: 'x' 
    },
    millennial: { 
        icon: '📟', 
        name: 'Millennial', 
        tagline: 'The optimistic digital pioneers (1981-1996)', 
        color: 'millennial' 
    },
    z: { 
        icon: '📱', 
        name: 'Generation Z', 
        tagline: 'True digital natives (1997-2012)', 
        color: 'z' 
    },
    alpha: { 
        icon: '🤖', 
        name: 'Generation Alpha', 
        tagline: 'The AI-powered future (2013-2025)', 
        color: 'alpha' 
    }
};

const CELEBRITIES = [
    { name: "Cristiano Ronaldo", year: 1985, avatar: "⚽" },
    { name: "Lionel Messi", year: 1987, avatar: "⚽" },
    { name: "Taylor Swift", year: 1989, avatar: "🎵" },
    { name: "Ariana Grande", year: 1993, avatar: "🎤" },
    { name: "Justin Bieber", year: 1994, avatar: "🎸" },
    { name: "Selena Gomez", year: 1992, avatar: "🌟" },
    { name: "Timothée Chalamet", year: 1995, avatar: "🎭" },
    { name: "Zendaya", year: 1996, avatar: "🎬" },
    { name: "Tom Holland", year: 1996, avatar: "🕷️" },
    { name: "Billie Eilish", year: 2001, avatar: "🎵" },
    { name: "Millie Bobby Brown", year: 2004, avatar: "👽" },
    { name: "Greta Thunberg", year: 2003, avatar: "🌍" },
    { name: "Elon Musk", year: 1971, avatar: "🚀" },
    { name: "Dwayne Johnson", year: 1972, avatar: "💪" },
    { name: "Beyoncé", year: 1981, avatar: "👑" },
    { name: "Rihanna", year: 1988, avatar: "💎" },
    { name: "Drake", year: 1986, avatar: "🎤" },
    { name: "Kylie Jenner", year: 1997, avatar: "💄" },
    { name: "Emma Watson", year: 1990, avatar: "🧙‍♀️" },
    { name: "Chris Evans", year: 1981, avatar: "🛡️" },
    { name: "Robert Downey Jr.", year: 1965, avatar: "🦾" },
    { name: "Scarlett Johansson", year: 1984, avatar: "🦸‍♀️" },
    { name: "Bruno Mars", year: 1985, avatar: "🕺" },
    { name: "Ed Sheeran", year: 1991, avatar: "🎸" },
    { name: "LeBron James", year: 1984, avatar: "🏀" },
    { name: "Serena Williams", year: 1981, avatar: "🎾" }
];

const PERSONAS = {
    child: { 
        icon: '🧸', 
        type: 'The Explorer', 
        traits: ['Curious', 'Playful', 'Learning', 'Growing'] 
    },
    teen: { 
        icon: '🎮', 
        type: 'The Rebel', 
        traits: ['Energetic', 'Ambitious', 'Social', 'Dreaming'] 
    },
    young: { 
        icon: '🚀', 
        type: 'The Hustler', 
        traits: ['Driven', 'Creative', 'Bold', 'Adventurous'] 
    },
    adult: { 
        icon: '👔', 
        type: 'The Builder', 
        traits: ['Responsible', 'Focused', 'Leader', 'Provider'] 
    },
    senior: { 
        icon: '🦉', 
        type: 'The Sage', 
        traits: ['Wise', 'Patient', 'Mentor', 'Experienced'] 
    }
};

const MILESTONES = [
    { age: 0, label: 'Born' },
    { age: 1, label: 'Walking' },
    { age: 5, label: 'School' },
    { age: 13, label: 'Teen' },
    { age: 16, label: 'Drive' },
    { age: 18, label: 'Adult' },
    { age: 21, label: 'Legal' },
    { age: 25, label: 'Quarter' },
    { age: 30, label: 'Thirty' },
    { age: 40, label: 'Forty' },
    { age: 50, label: 'Golden' },
    { age: 65, label: 'Retire' },
    { age: 80, label: 'Legacy' },
    { age: 100, label: 'Century' }
];

const FACTS = [
    { emoji: '😴', calc: d => Math.floor(d * 0.33), label: 'Days Slept' },
    { emoji: '🍽️', calc: d => d * 3, label: 'Meals' },
    { emoji: '🚶', calc: d => d * 7000, label: 'Steps' },
    { emoji: '💧', calc: d => Math.floor(d * 2.5), label: 'Liters Water' },
    { emoji: '📱', calc: d => d * 100, label: 'Times Scrolled' },
    { emoji: '🎬', calc: d => Math.floor(d * 2.5), label: 'Hours TV' },
    { emoji: '📚', calc: d => Math.floor(d * 0.5), label: 'Books Read' },
    { emoji: '💤', calc: d => d * 8, label: 'Dreams' },
    { emoji: '🎵', calc: d => Math.floor(d * 24), label: 'Songs Heard' },
    { emoji: '☕', calc: d => Math.floor(d * 2), label: 'Cups Coffee' }
];

// ============================================
// UTILITY FUNCTIONS
// ============================================
const getGeneration = year => {
    if (year >= 2013) return 'alpha';
    if (year >= 1997) return 'z';
    if (year >= 1981) return 'millennial';
    if (year >= 1965) return 'x';
    return 'boomer';
};

const getPersona = age => {
    if (age < 13) return PERSONAS.child;
    if (age < 20) return PERSONAS.teen;
    if (age < 35) return PERSONAS.young;
    if (age < 60) return PERSONAS.adult;
    return PERSONAS.senior;
};

const getDayName = date => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
};

const getSeason = date => {
    const m = date.getMonth();
    if (m >= 2 && m <= 4) return { icon: '🌸', name: 'Spring', desc: 'Born in bloom' };
    if (m >= 5 && m <= 7) return { icon: '☀️', name: 'Summer', desc: 'Sun child' };
    if (m >= 8 && m <= 10) return { icon: '🍂', name: 'Autumn', desc: 'Fall wanderer' };
    return { icon: '❄️', name: 'Winter', desc: 'Winter warrior' };
};

const formatNumber = n => n.toLocaleString();

const formatCompact = n => {
    if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
    if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
    return n.toString();
};

const animateNumber = (id, target, duration = 1500) => {
    const el = document.getElementById(id);
    if (!el) return;
    
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = formatNumber(Math.floor(current));
    }, 16);
};

// ============================================
// CELEBRITY MANAGER
// ============================================
const celebs = {
    find: birthYear => {
        const matches = CELEBRITIES.filter(c => Math.abs(c.year - birthYear) <= 3);
        state.matchedCelebs = matches.length > 0 
            ? matches 
            : [CELEBRITIES.reduce((p, c) => Math.abs(c.year - birthYear) < Math.abs(p.year - birthYear) ? c : p)];
        state.currentCelebIndex = 0;
        return state.matchedCelebs[0];
    },
    
    refresh: () => {
        if (state.matchedCelebs.length === 0) return;
        state.currentCelebIndex = (state.currentCelebIndex + 1) % state.matchedCelebs.length;
        const celeb = state.matchedCelebs[state.currentCelebIndex];
        document.getElementById('celebAvatar').textContent = celeb.avatar;
        document.getElementById('celebName').textContent = celeb.name;
        document.getElementById('celebAge').textContent = (new Date().getFullYear() - celeb.year) + 'y';
    }
};

// ============================================
// CHART MANAGER
// ============================================
const updateChart = age => {
    const ctx = document.getElementById('ageChart')?.getContext('2d');
    if (!ctx) return;
    
    if (state.ageChart) state.ageChart.destroy();

    state.ageChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['0', '10', '20', '30', '40', '50', '60', '70', '80'],
            datasets: [{
                data: [0, age > 10 ? 10 : age, age > 20 ? 20 : age, age > 30 ? 30 : age, age > 40 ? 40 : age, age > 50 ? 50 : age, age > 60 ? 60 : age, age > 70 ? 70 : age, age > 80 ? 80 : age].map((v, i) => age >= i * 10 ? v : null),
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99,102,241,0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#6366f1',
                pointRadius: age < 80 ? [0,0,0,0,0,0,0,0,0].map((_,i) => Math.abs(age - i*10) < 5 ? 6 : 0) : 4,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { 
                legend: { display: false }, 
                tooltip: { enabled: false } 
            },
            scales: {
                y: { 
                    display: false, 
                    max: 85 
                },
                x: { 
                    grid: { display: false, color: 'rgba(255,255,255,0.03)' }, 
                    ticks: { color: '#555', font: { size: 10 } } 
                }
            },
            interaction: { intersect: false }
        }
    });
};

// ============================================
// COUNTDOWN MANAGER
// ============================================
const startCountdown = target => {
    if (state.countdownInterval) clearInterval(state.countdownInterval);
    
    const update = () => {
        const diff = target - new Date();
        if (diff <= 0) {
            clearInterval(state.countdownInterval);
            document.getElementById('cdDays').textContent = '0';
            document.getElementById('cdHours').textContent = '0';
            document.getElementById('cdMins').textContent = '0';
            document.getElementById('cdSecs').textContent = '0';
            return;
        }
        
        document.getElementById('cdDays').textContent = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById('cdHours').textContent = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById('cdMins').textContent = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById('cdSecs').textContent = Math.floor((diff % (1000 * 60)) / 1000);
    };
    
    update();
    state.countdownInterval = setInterval(update, 1000);
};

// ============================================
// UI FUNCTIONS
// ============================================
const selectGen = (gen, year, el) => {
    document.querySelectorAll('.gen-chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    state.selectedGen = gen;
    document.getElementById('birthdate').value = `${year}-06-15`;
};

const showToast = msg => {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
};

const copyResults = () => {
    const age = document.getElementById('mainAge').textContent;
    const gen = document.getElementById('genName').textContent;
    const text = `I'm ${age} years old (${gen})! Discover your age stats at Chrono by Tanvir Tasin 🚀`;
    navigator.clipboard.writeText(text).then(() => showToast('Copied to clipboard!'));
};

const shareResults = () => {
    const text = `I'm ${document.getElementById('mainAge').textContent} years old! Calculate yours at Chrono`;
    if (navigator.share) {
        navigator.share({ title: 'My Age Stats', text: text }).catch(() => {});
    } else {
        copyResults();
    }
};

// ============================================
// MAIN CALCULATE FUNCTION
// ============================================
const calculate = () => {
    const input = document.getElementById('birthdate');
    if (!input.value) {
        input.style.borderColor = '#ef4444';
        input.classList.add('shake');
        setTimeout(() => {
            input.style.borderColor = '';
            input.classList.remove('shake');
        }, 500);
        return;
    }

    const birthDate = new Date(input.value);
    const now = new Date();
    const year = birthDate.getFullYear();

    if (birthDate > now) {
        showToast('Please select a past date!');
        return;
    }

    // Confetti
    confetti({
        particleCount: 200,
        spread: 80,
        origin: { y: 0.3 },
        colors: ['#6366f1', '#8b5cf6', '#ec4899', '#22c55e', '#f59e0b', '#06b6d4']
    });

    // Age calculation
    let age = now.getFullYear() - year;
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) {
        age--;
        months += 12;
    }

    const diffMs = now - birthDate;
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    const totalMins = Math.floor(diffMs / (1000 * 60));

    // Show results
    document.getElementById('results').style.display = 'block';

    // Generation
    const genKey = state.selectedGen || getGeneration(year);
    const gen = GENERATIONS[genKey];
    const badge = document.getElementById('genBadge');
    badge.className = `gen-badge ${gen.color}`;
    document.getElementById('genIcon').textContent = gen.icon;
    document.getElementById('genName').textContent = gen.name;
    document.getElementById('genTagline').textContent = gen.tagline;

    // Age
    animateNumber('mainAge', age);
    const season = getSeason(birthDate);
    document.getElementById('ageMeta').innerHTML = `${getDayName(birthDate)} child • ${season.icon} ${season.name} • ${year}`;
    animateNumber('ageMonths', age * 12 + months);
    animateNumber('ageWeeks', Math.floor(totalDays / 7));
    animateNumber('ageDays', totalDays);

    // Celebrity
    const celeb = celebs.find(year);
    document.getElementById('celebAvatar').textContent = celeb.avatar;
    document.getElementById('celebName').textContent = celeb.name;
    document.getElementById('celebAge').textContent = (now.getFullYear() - celeb.year) + 'y';

    // Persona
    const persona = getPersona(age);
    document.getElementById('personaIcon').textContent = persona.icon;
    document.getElementById('personaType').textContent = persona.type;
    document.getElementById('traits').innerHTML = persona.traits
        .map(t => `<span class="trait">${t}</span>`).join('');

    // Stats
    document.getElementById('statHeartbeats').textContent = formatCompact(totalMins * 80);
    document.getElementById('statBreaths').textContent = formatCompact(totalMins * 16);
    document.getElementById('statOrbit').textContent = (totalDays * 2.6).toFixed(0) + 'M';

    // Timeline
    const progress = Math.min((age / 80) * 100, 100);
    setTimeout(() => document.getElementById('timelineProgress').style.width = progress + '%', 100);

    // Active mark
    document.querySelectorAll('.mark').forEach(m => m.classList.remove('active'));
    const marks = document.querySelectorAll('.mark');
    let activeIdx = age < 13 ? 0 : age < 20 ? 1 : age < 60 ? 2 : 3;
    if (marks[activeIdx]) marks[activeIdx].classList.add('active');

    // Milestones
    const reached = MILESTONES.filter(m => m.age <= age);
    const next = MILESTONES.find(m => m.age > age);
    const recent = reached.slice(-3);
    
    document.getElementById('milestones').innerHTML = recent.map(m => `
        <div class="milestone ${m.age === age ? 'current' : ''}">
            <div class="milestone-age">${m.age}</div>
            <div class="milestone-label">${m.label}</div>
        </div>
    `).join('') + (next ? `
        <div class="milestone" style="opacity: 0.6; border-style: dashed;">
            <div class="milestone-age">${next.age}</div>
            <div class="milestone-label">Next</div>
        </div>
    ` : '');

    // Facts
    document.getElementById('factsScroll').innerHTML = FACTS.map(f => `
        <div class="fact-pill" title="${f.label}">
            <span class="fact-emoji">${f.emoji}</span>
            <div class="fact-data">
                <div class="fact-num">${formatCompact(f.calc(totalDays))}</div>
                <div class="fact-label">${f.label}</div>
            </div>
        </div>
    `).join('');

    // Chart
    updateChart(age);

    // Countdown
    const nextBday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBday < now) nextBday.setFullYear(now.getFullYear() + 1);
    startCountdown(nextBday);

    // Details
    document.getElementById('detailNextBday').textContent = Math.ceil((nextBday - now) / (1000 * 60 * 60 * 24)) + 'd';
    document.getElementById('detailOrbit').textContent = (totalDays * 2.6).toFixed(1) + 'B';
    document.getElementById('detailProgress').textContent = progress.toFixed(1) + '%';

    // Scroll
    document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Set max date to today
    const dateInput = document.getElementById('birthdate');
    if (dateInput) {
        dateInput.max = new Date().toISOString().split('T')[0];
    }

    // Keyboard shortcut
    document.addEventListener('keydown', e => {
        if (e.key === 'Enter' && document.activeElement === dateInput) {
            calculate();
        }
    });
});
