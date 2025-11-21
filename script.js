// script.js
// The Computational Paradox - Brilliantly Bad UI JavaScript

// Global variables for tracking system state
let memoryUsage = 0;
let currentFormStep = 1;
let mazePlayerPosition = { x: 1, y: 1 };
let mazeTargetPosition = { x: 8, y: 8 };
let currentArray = [];
let comparisonCount = 0;
let swapCount = 0;
let memoryBlocks = [];
let fibonacciCalculations = 0;

// Initialize the system when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeSystem();
    generateMaze();
    generateArray();
    initializeMemoryGame();
    startBinaryClock();
    updateMemoryDisplay();
});

// System Initialization with unnecessary complexity
function initializeSystem() {
    console.log("> INITIALIZING SYSTEM...");
    
    // Simulate system boot sequence
    const bootSequence = [
        "> Checking memory sectors...",
        "> Loading computational modules...",
        "> Initializing maze navigation...",
        "> Preparing Fibonacci calculator...",
        "> Configuring bubble sort algorithm...",
        "> Allocating memory blocks...",
        "> Starting process scheduler...",
        "> SYSTEM READY"
    ];
    
    let delay = 0;
    bootSequence.forEach((message, index) => {
        setTimeout(() => {
            console.log(message);
            if (index === bootSequence.length - 1) {
                document.getElementById('system-status').textContent = "OPERATIONAL";
            }
        }, delay);
        delay += 500; // Artificial delay
    });
}

// Memory Management System (Unnecessarily Complex)
function updateMemoryDisplay() {
    memoryUsage = Math.min(100, Math.max(0, memoryUsage));
    document.getElementById('memory-used').style.width = memoryUsage + '%';
    document.getElementById('memory-text').textContent = memoryUsage + '% USED';
    
    // Random memory fluctuations for "realism"
    setInterval(() => {
        const fluctuation = Math.random() * 5 - 2.5;
        memoryUsage = Math.min(100, Math.max(0, memoryUsage + fluctuation));
        document.getElementById('memory-used').style.width = memoryUsage + '%';
        document.getElementById('memory-text').textContent = Math.round(memoryUsage) + '% USED';
    }, 3000);
}

// Maze Navigation System
function generateMaze() {
    const mazeContainer = document.getElementById('maze-container');
    mazeContainer.innerHTML = '';
    
    // Simple 10x10 maze with a predefined path
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const cell = document.createElement('div');
            cell.className = 'maze-cell';
            cell.id = `cell-${x}-${y}`;
            
            // Create walls around edges and some internal obstacles
            if (x === 0 || y === 0 || x === 9 || y === 9 || 
                (x === 3 && y > 1 && y < 8) ||
                (x === 6 && y > 2 && y < 7) ||
                (y === 4 && x > 2 && x < 7)) {
                cell.classList.add('maze-wall');
                cell.textContent = '█';
            } else {
                cell.classList.add('maze-path');
            }
            
            mazeContainer.appendChild(cell);
        }
    }
    
    // Set player and target positions
    updateMazeDisplay();
}

function updateMazeDisplay() {
    // Clear previous positions
    document.querySelectorAll('.maze-player, .maze-target, .maze-visited').forEach(cell => {
        cell.classList.remove('maze-player', 'maze-target', 'maze-visited');
        if (cell.classList.contains('maze-path')) {
            cell.textContent = '';
        }
    });
    
    // Mark visited path (simple implementation)
    for (let x = 1; x <= mazePlayerPosition.x; x++) {
        for (let y = 1; y <= mazePlayerPosition.y; y++) {
            const cell = document.getElementById(`cell-${x}-${y}`);
            if (cell && cell.classList.contains('maze-path')) {
                cell.classList.add('maze-visited');
                cell.textContent = '·';
            }
        }
    }
    
    // Set player position
    const playerCell = document.getElementById(`cell-${mazePlayerPosition.x}-${mazePlayerPosition.y}`);
    if (playerCell) {
        playerCell.classList.add('maze-player');
        playerCell.textContent = '☻';
    }
    
    // Set target position
    const targetCell = document.getElementById(`cell-${mazeTargetPosition.x}-${mazeTargetPosition.y}`);
    if (targetCell) {
        targetCell.classList.add('maze-target');
        targetCell.textContent = '★';
    }
    
    // Update position display
    document.getElementById('maze-position').textContent = 
        `${mazePlayerPosition.x},${mazePlayerPosition.y}`;
    
    // Check if player reached target
    if (mazePlayerPosition.x === mazeTargetPosition.x && 
        mazePlayerPosition.y === mazeTargetPosition.y) {
        alert("MAZE SOLVED! You may now proceed to use other features... or not.");
    }
}

function moveMazePlayer(direction) {
    const newPos = { ...mazePlayerPosition };
    
    switch(direction) {
        case 'up': newPos.y = Math.max(1, newPos.y - 1); break;
        case 'down': newPos.y = Math.min(8, newPos.y + 1); break;
        case 'left': newPos.x = Math.max(1, newPos.x - 1); break;
        case 'right': newPos.x = Math.min(8, newPos.x + 1); break;
    }
    
    // Check if move is valid (not into a wall)
    const targetCell = document.getElementById(`cell-${newPos.x}-${newPos.y}`);
    if (targetCell && !targetCell.classList.contains('maze-wall')) {
        mazePlayerPosition = newPos;
        updateMazeDisplay();
        memoryUsage += 0.5; // Memory usage increases with movement
    } else {
        // Invalid move - flash red or something
        targetCell.style.backgroundColor = '#ff0000';
        setTimeout(() => {
            if (targetCell.classList.contains('maze-path')) {
                targetCell.style.backgroundColor = '';
            }
        }, 300);
    }
}

// Fibonacci Calculator with Unnecessary Recursion
function calculateFibonacci() {
    const input = document.getElementById('fib-input').value;
    const number = parseInt(input);
    
    if (isNaN(number) || number < 0 || number > 20) {
        alert("INVALID INPUT! Please enter a number between 0 and 20.");
        return;
    }
    
    const stepsContainer = document.getElementById('fib-steps');
    stepsContainer.innerHTML = '';
    fibonacciCalculations = 0;
    
    const startTime = performance.now();
    
    // Use inefficient recursive approach
    const result = fibonacciWithSteps(number, stepsContainer);
    
    const endTime = performance.now();
    const timeTaken = (endTime - startTime).toFixed(2);
    
    document.getElementById('fib-result').textContent = result;
    document.getElementById('fib-time').textContent = timeTaken;
    
    memoryUsage += number * 2;
}

function fibonacciWithSteps(n, container) {
    fibonacciCalculations++;
    
    const step = document.createElement('div');
    step.className = 'calculation-step';
    step.textContent = `Calculating fib(${n})...`;
    container.appendChild(step);
    
    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
    
    if (n <= 1) {
        const resultStep = document.createElement('div');
        resultStep.className = 'calculation-step';
        resultStep.textContent = `fib(${n}) = ${n}`;
        resultStep.style.color = '#ffff00';
        container.appendChild(resultStep);
        return n;
    }
    
    // Artificial delay to make it slower
    // In a real implementation, you'd use async/await with delays
    const result = fibonacciWithSteps(n - 1, container) + fibonacciWithSteps(n - 2, container);
    
    const resultStep = document.createElement('div');
    resultStep.className = 'calculation-step';
    resultStep.textContent = `fib(${n}) = ${result}`;
    resultStep.style.color = '#00ff00';
    container.appendChild(resultStep);
    
    return result;
}

// Bubble Sort Visualizer
function generateArray() {
    currentArray = [];
    comparisonCount = 0;
    swapCount = 0;
    
    // Generate 5 random numbers
    for (let i = 0; i < 5; i++) {
        currentArray.push(Math.floor(Math.random() * 100) + 1);
    }
    
    updateArrayDisplay();
    updateSortCounters();
}

function updateArrayDisplay() {
    const arrayDisplay = document.getElementById('array-display');
    arrayDisplay.innerHTML = '';
    
    currentArray.forEach((value, index) => {
        const element = document.createElement('div');
        element.className = 'array-element';
        element.textContent = value;
        element.style.height = (value * 0.8) + 'px';
        element.style.lineHeight = (value * 0.8) + 'px';
        arrayDisplay.appendChild(element);
    });
}

function updateSortCounters() {
    document.getElementById('comparison-count').textContent = comparisonCount;
    document.getElementById('swap-count').textContent = swapCount;
}

let sortIndex = 0;
let sorting = false;

function bubbleSortStep() {
    if (sorting) return;
    
    sorting = true;
    const arrayElements = document.querySelectorAll('.array-element');
    
    // Reset all elements to default state
    arrayElements.forEach(el => {
        el.classList.remove('comparing', 'swapping', 'sorted');
    });
    
    // One step of bubble sort
    if (sortIndex < currentArray.length - 1) {
        comparisonCount++;
        
        // Highlight comparing elements
        arrayElements[sortIndex].classList.add('comparing');
        arrayElements[sortIndex + 1].classList.add('comparing');
        
        if (currentArray[sortIndex] > currentArray[sortIndex + 1]) {
            // Swap elements
            swapCount++;
            [currentArray[sortIndex], currentArray[sortIndex + 1]] = 
            [currentArray[sortIndex + 1], currentArray[sortIndex]];
            
            arrayElements[sortIndex].classList.add('swapping');
            arrayElements[sortIndex + 1].classList.add('swapping');
            
            setTimeout(() => {
                updateArrayDisplay();
                sortIndex++;
                sorting = false;
                updateSortCounters();
            }, 500);
        } else {
            setTimeout(() => {
                sortIndex++;
                sorting = false;
                updateSortCounters();
            }, 300);
        }
    } else {
        // Check if array is sorted
        let isSorted = true;
        for (let i = 0; i < currentArray.length - 1; i++) {
            if (currentArray[i] > currentArray[i + 1]) {
                isSorted = false;
                break;
            }
        }
        
        if (isSorted) {
            // Mark all as sorted
            arrayElements.forEach(el => el.classList.add('sorted'));
            alert("ARRAY SORTED! Only took " + comparisonCount + " comparisons!");
            sortIndex = 0;
        } else {
            sortIndex = 0;
        }
        sorting = false;
    }
    
    updateSortCounters();
    memoryUsage += 1;
}

function resetArray() {
    sortIndex = 0;
    sorting = false;
    generateArray();
}

// Memory Allocation Game
function initializeMemoryGame() {
    memoryBlocks = [
        { id: 1, allocated: false, size: 1, data: null },
        { id: 2, allocated: false, size: 1, data: null },
        { id: 3, allocated: false, size: 1, data: null },
        { id: 4, allocated: false, size: 2, data: null },
        { id: 5, allocated: false, size: 1, data: null },
        { id: 6, allocated: false, size: 3, data: null }
    ];
    updateMemoryGameDisplay();
}

function updateMemoryGameDisplay() {
    const memoryBlocksContainer = document.getElementById('memory-blocks');
    memoryBlocksContainer.innerHTML = '';
    
    memoryBlocks.forEach(block => {
        const blockElement = document.createElement('div');
        blockElement.className = `memory-block ${block.allocated ? 'allocated' : 'free'}`;
        blockElement.textContent = block.allocated ? 
            `BLK${block.id}\n[USED]` : 
            `BLK${block.id}\n[FREE]`;
        blockElement.title = `Size: ${block.size} unit${block.size > 1 ? 's' : ''}`;
        memoryBlocksContainer.appendChild(blockElement);
    });
    
    // Calculate fragmentation
    const freeBlocks = memoryBlocks.filter(block => !block.allocated);
    const totalFreeSize = freeBlocks.reduce((sum, block) => sum + block.size, 0);
    const fragmentation = freeBlocks.length > 1 ? 
        Math.round((1 - (Math.max(...freeBlocks.map(b => b.size)) / totalFreeSize)) * 100) : 0;
    
    document.getElementById('fragmentation').textContent = fragmentation + '%';
}

function allocateMemory() {
    const freeBlock = memoryBlocks.find(block => !block.allocated);
    if (freeBlock) {
        freeBlock.allocated = true;
        freeBlock.data = `DATA_${Date.now()}`;
        updateMemoryGameDisplay();
        memoryUsage += 5;
    } else {
        alert("OUT OF MEMORY! Try freeing some blocks first.");
    }
}

function freeMemory() {
    const allocatedBlock = memoryBlocks.find(block => block.allocated);
    if (allocatedBlock) {
        allocatedBlock.allocated = false;
        allocatedBlock.data = null;
        updateMemoryGameDisplay();
        memoryUsage = Math.max(0, memoryUsage - 3);
    } else {
        alert("NO ALLOCATED BLOCKS TO FREE!");
    }
}

function defragment() {
    // Simple defragmentation - just reorganize blocks
    memoryBlocks.sort((a, b) => {
        if (a.allocated && !b.allocated) return -1;
        if (!a.allocated && b.allocated) return 1;
        return 0;
    });
    
    updateMemoryGameDisplay();
    document.getElementById('fragmentation').textContent = '0%';
    memoryUsage += 2;
}

// Process Scheduling Form
function nextFormStep(step) {
    // Validate current step
    if (step === 2 && !document.getElementById('user-name').value) {
        alert("PROCESS ERROR: Name field required!");
        return;
    }
    if (step === 3 && !document.getElementById('user-email').value) {
        alert("PROCESS ERROR: Email field required!");
        return;
    }
    
    // Hide current step
    document.getElementById(`form-step-${currentFormStep}`).classList.add('hidden');
    
    // Show next step
    document.getElementById(`form-step-${step}`).classList.remove('hidden');
    currentFormStep = step;
    
    // Update process queue display
    document.getElementById('queue-display').textContent = step;
    
    memoryUsage += 3;
}

function submitForm() {
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;
    const message = document.getElementById('user-message').value;
    
    if (!name || !email || !message) {
        alert("PROCESS FAILED: All fields are required!");
        return;
    }
    
    // Simulate form processing with unnecessary delays
    alert("PROCESSING SUBMISSION...\nThis may take a while.");
    
    setTimeout(() => {
        alert(`SUBMISSION COMPLETE!\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}\n\nThank you for using our inefficient system!`);
        
        // Reset form
        document.getElementById('user-name').value = '';
        document.getElementById('user-email').value = '';
        document.getElementById('user-message').value = '';
        document.getElementById(`form-step-3`).classList.add('hidden');
        document.getElementById(`form-step-1`).classList.remove('hidden');
        currentFormStep = 1;
        document.getElementById('queue-display').textContent = '1';
        
        memoryUsage += 10;
    }, 2000);
}

// Binary Clock
function startBinaryClock() {
    function updateBinaryClock() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        
        // Convert to binary strings (6 bits)
        const binaryHours = hours.toString(2).padStart(6, '0');
        const binaryMinutes = minutes.toString(2).padStart(6, '0');
        const binarySeconds = seconds.toString(2).padStart(6, '0');
        
        document.getElementById('binary-hours').textContent = binaryHours;
        document.getElementById('binary-minutes').textContent = binaryMinutes;
        document.getElementById('binary-seconds').textContent = binarySeconds;
        document.getElementById('normal-time').textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    updateBinaryClock();
    setInterval(updateBinaryClock, 1000);
}

// Add some random system messages for extra "realism"
setInterval(() => {
    const messages = [
        "> Memory optimization in progress...",
        "> Checking computational integrity...",
        "> Verifying maze path algorithms...",
        "> Recursive functions active...",
        "> Bubble sort efficiency: POOR",
        "> Memory fragmentation detected",
        "> Process queue stable"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    console.log(randomMessage);
}, 10000);
// hellscape.js
// Digital Hellscape - The Worst JavaScript Ever

// Global variables for maximum chaos
let popupCount = 0;
let cursorDistance = 0;
let clickCount = 0;
let activeTime = 0;
let scrollSpeed = 5;
let colorInterval;
let mouseTrailEnabled = false;
let trailType = 'ghosts';
let closeAttempts = 0;
let lastCursorPos = { x: 0, y: 0 };

// Audio elements for maximum annoyance
const sounds = {
    airhorn: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-airhorn-468.mp3'),
    wilhelm: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-wilhelm-scream-429.mp3'),
    fart: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-funny-cartoon-fart-476.mp3'),
    dialup: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-dial-up-modem-ambience-389.mp3'),
    rickroll: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-explosion-275.mp3')
};

// Initialize the hellscape
document.addEventListener('DOMContentLoaded', function() {
    startHellscape();
    generateNewCaptcha();
    startCursorTracking();
    startActiveTimeCounter();
    startAutoScrolling();
    spawnRandomPopups();
    createCursorFollowers();
    
    // Auto-play hell music
    const hellMusic = document.getElementById('hellMusic');
    hellMusic.volume = 0.3;
    hellMusic.play().catch(e => console.log("Auto-play prevented:", e));
    
    // Start random background changes
    startRandomBackgroundChanges();
});

function startHellscape() {
    console.log("🔥 WELCOME TO DIGITAL HELLSCAPE 🔥");
    console.log("> Preparing maximum frustration...");
    console.log("> Loading annoying features...");
    console.log("> System ready to irritate!");
    
    // Random system status changes
    setInterval(() => {
        const statuses = ['MALFUNCTIONING', 'CRITICAL', 'OVERHEATING', 'CORRUPTED', 'BROKEN'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        document.getElementById('system-status').textContent = randomStatus;
    }, 3000);
    
    // Random CPU usage updates
    setInterval(() => {
        const usage = Math.floor(Math.random() * 100);
        document.getElementById('cpu-usage').textContent = `CPU: ${usage}%`;
    }, 2000);
    
    // Random memory leak updates
    setInterval(() => {
        const leak = Math.floor(Math.random() * 100);
        document.getElementById('memory-leak').textContent = `MEMORY LEAK: ${leak}MB/s`;
    }, 1500);
}

// CAPTCHA FROM HELL
function generateNewCaptcha() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let captchaText = '';
    
    // Generate random text with some characters repeated
    for (let i = 0; i < 6; i++) {
        captchaText += chars[Math.floor(Math.random() * chars.length)];
    }
    
    const captchaImage = document.getElementById('captcha-image');
    captchaImage.innerHTML = '';
    
    // Create distorted text with multiple layers
    for (let i = 0; i < 3; i++) {
        const textLayer = document.createElement('div');
        textLayer.style.position = 'absolute';
        textLayer.style.left = (Math.random() * 10 - 5) + 'px';
        textLayer.style.top = (Math.random() * 10 - 5) + 'px';
        textLayer.style.color = i === 0 ? '#ff0000' : i === 1 ? '#ffff00' : '#00ffff';
        textLayer.style.fontSize = (24 + Math.random() * 10) + 'px';
        textLayer.style.transform = `rotate(${Math.random() * 10 - 5}deg)`;
        textLayer.style.opacity = '0.7';
        textLayer.textContent = captchaText;
        captchaImage.appendChild(textLayer);
    }
    
    captchaImage.dataset.answer = captchaText;
}

function validateCaptcha() {
    const input = document.getElementById('captcha-input').value.toUpperCase();
    const answer = document.getElementById('captcha-image').dataset.answer;
    const result = document.getElementById('captcha-result');
    
    // Make validation intentionally difficult
    if (input === answer) {
        result.textContent = "CORRECT! But let's make you do another one...";
        result.style.color = '#00ff00';
        setTimeout(() => {
            generateNewCaptcha();
            document.getElementById('captcha-input').value = '';
            result.textContent = "Waiting for input...";
            result.style.color = '#ff0000';
        }, 2000);
    } else {
        result.textContent = "WRONG! Are you even human?";
        result.style.color = '#ff0000';
        // Shake the input
        document.getElementById('captcha-input').style.animation = 'shake 0.5s';
        setTimeout(() => {
            document.getElementById('captcha-input').style.animation = '';
        }, 500);
    }
}

// PASSWORD GENERATOR FROM HELL
function generateHellPassword() {
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?~';
    const emojis = '👹😈💀🔥⭐🌟💫';
    let password = '';
    
    // Create an impossibly complex password
    for (let i = 0; i < 4; i++) {
        password += Math.random().toString(36).slice(-8); // Random string
        password += symbols[Math.floor(Math.random() * symbols.length)];
        password += emojis[Math.floor(Math.random() * emojis.length)];
    }
    
    document.getElementById('password-display').value = password;
    
    // Random strength meter
    const strengths = ['ABYSMAL', 'TERRIBLE', 'POOR', 'MEDIOCRE', 'OKAY', 'GOOD', 'GREAT', 'EXCELLENT', 'GODLIKE'];
    document.getElementById('strength-meter').textContent = strengths[Math.floor(Math.random() * strengths.length)];
}

// POP-UP HELL
function spawnPopup() {
    const popupContainer = document.getElementById('popup-container');
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.style.left = Math.random() * (window.innerWidth - 200) + 'px';
    popup.style.top = Math.random() * (window.innerHeight - 150) + 'px';
    
    const messages = [
        "YOU'VE WON A PRIZE! CLICK HERE!",
        "VIRUS DETECTED! SCAN NOW!",
        "YOUR COMPUTER IS SLOW! FIX IT!",
        "CONGRATULATIONS! YOU'RE THE 1,000,000TH VISITOR!",
        "UPDATE YOUR FLASH PLAYER!",
        "CLICK TO CLAIM YOUR FREE IPHONE!"
    ];
    
    popup.innerHTML = `
        <p>${messages[Math.floor(Math.random() * messages.length)]}</p>
        <button onclick="this.parentElement.remove(); updatePopupCount(-1)">CLOSE</button>
    `;
    
    popupContainer.appendChild(popup);
    updatePopupCount(1);
    
    // Make popup move around
    setInterval(() => {
        if (popup.parentElement) {
            popup.style.left = Math.random() * (window.innerWidth - 200) + 'px';
            popup.style.top = Math.random() * (window.innerHeight - 150) + 'px';
        }
    }, 2000);
}

function spawnPopupStorm() {
    for (let i = 0; i < 10; i++) {
        setTimeout(spawnPopup, i * 300);
    }
}

function spawnRandomPopups() {
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance every 5 seconds
            spawnPopup();
        }
    }, 5000);
}

function closeAllPopups() {
    const popups = document.querySelectorAll('.popup');
    // Actually close only half of them
    popups.forEach((popup, index) => {
        if (index % 2 === 0) {
            setTimeout(() => popup.remove(), Math.random() * 1000);
        }
    });
    updatePopupCount(-Math.ceil(popups.length / 2));
}

function updatePopupCount(change) {
    popupCount = Math.max(0, popupCount + change);
    document.getElementById('popup-count').textContent = popupCount;
}

// CURSOR TRACKING HELL
function startCursorTracking() {
    document.addEventListener('mousemove', (e) => {
        // Update position
        document.getElementById('cursor-pos').textContent = `${e.clientX},${e.clientY}`;
        
        // Calculate distance traveled
        if (lastCursorPos.x !== 0 && lastCursorPos.y !== 0) {
            const distance = Math.sqrt(
                Math.pow(e.clientX - lastCursorPos.x, 2) + 
                Math.pow(e.clientY - lastCursorPos.y, 2)
            );
            cursorDistance += distance;
            document.getElementById('cursor-distance').textContent = Math.round(cursorDistance);
        }
        
        lastCursorPos = { x: e.clientX, y: e.clientY };
        
        // Update cursor followers
        updateCursorFollowers(e.clientX, e.clientY);
        
        // Update mouse trail
        if (mouseTrailEnabled) {
            createMouseTrail(e.clientX, e.clientY);
        }
    });
    
    document.addEventListener('click', () => {
        clickCount++;
        document.getElementById('click-count').textContent = clickCount;
    });
}

function startActiveTimeCounter() {
    setInterval(() => {
        activeTime++;
        document.getElementById('active-time').textContent = activeTime;
    }, 1000);
}

function createCursorFollowers() {
    const followersContainer = document.querySelector('.cursor-followers');
    for (let i = 0; i < 5; i++) {
        const eye = document.createElement('div');
        eye.className = 'eye';
        eye.style.left = (i * 40 + 20) + 'px';
        eye.style.top = '40px';
        followersContainer.appendChild(eye);
    }
}

function updateCursorFollowers(x, y) {
    const eyes = document.querySelectorAll('.eye');
    const container = document.querySelector('.cursor-followers');
    const rect = container.getBoundingClientRect();
    
    eyes.forEach((eye, index) => {
        const eyeX = rect.left + (index * 40 + 20);
        const eyeY = rect.top + 40;
        
        const angle = Math.atan2(y - eyeY, x - eyeX);
        const distance = Math.min(8, Math.sqrt(Math.pow(x - eyeX, 2) + Math.pow(y - eyeY, 2)) / 50);
        
        const pupilX = Math.cos(angle) * distance;
        const pupilY = Math.sin(angle) * distance;
        
        eye.style.background = `radial-gradient(circle at ${50 + pupilX * 10}% ${50 + pupilY * 10}%, #ff0000 40%, #000 41%)`;
    });
}

// AUTO-SCROLLING MADNESS
function startAutoScrolling() {
    const scrollingText = document.getElementById('scrolling-text');
    setInterval(() => {
        const currentTransform = scrollingText.style.transform || 'translateY(0)';
        const currentY = parseInt(currentTransform.match(/translateY\(([-\d]+)%/)[1]) || 0;
        const newY = (currentY - scrollSpeed) % 100;
        scrollingText.style.transform = `translateY(${newY}%)`;
    }, 100);
}

function increaseScrollSpeed() {
    scrollSpeed = Math.min(20, scrollSpeed + 2);
    document.getElementById('scroll-speed').textContent = scrollSpeed;
}

function decreaseScrollSpeed() {
    scrollSpeed = Math.max(1, scrollSpeed - 2);
    document.getElementById('scroll-speed').textContent = scrollSpeed;
}

function randomScroll() {
    scrollSpeed = Math.floor(Math.random() * 20) + 1;
    document.getElementById('scroll-speed').textContent = scrollSpeed;
}

// COLOR INVERTER HELL
function startColorHell() {
    if (colorInterval) clearInterval(colorInterval);
    
    colorInterval = setInterval(() => {
        const hue = Math.floor(Math.random() * 360);
        document.body.style.filter = `hue-rotate(${hue}deg) invert(${Math.random() > 0.5 ? 1 : 0})`;
        
        const schemes = ['HELL', 'CHAOS', 'RANDOM', 'MADNESS', 'PAIN'];
        document.getElementById('color-scheme').textContent = schemes[Math.floor(Math.random() * schemes.length)];
    }, 500);
}

function stopColorHell() {
    if (colorInterval) {
        clearInterval(colorInterval);
        colorInterval = null;
        // But don't actually stop immediately
        setTimeout(() => {
            document.body.style.filter = '';
            document.getElementById('color-scheme').textContent = 'HELL';
        }, 5000);
    }
}

function randomizeAllColors() {
    const elements = document.querySelectorAll('*');
    elements.forEach(el => {
        if (el.style) {
            el.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            el.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, ${Math.random() * 50}%)`;
        }
    });
}

// MOUSE TRAIL HELL
function enableMouseTrail() {
    mouseTrailEnabled = true;
    document.getElementById('trail-type').textContent = trailType;
}

function disableMouseTrail() {
    mouseTrailEnabled = false;
    // But actually don't disable it completely
    setTimeout(() => {
        mouseTrailEnabled = true;
        document.getElementById('trail-type').textContent = 'PERSISTENT ' + trailType;
    }, 2000);
}

function changeTrailType() {
    const types = ['GHOSTS', 'SKULLS', 'FIRE', 'BUGS', 'EYES', 'HEARTS'];
    trailType = types[Math.floor(Math.random() * types.length)];
    document.getElementById('trail-type').textContent = trailType;
}

function createMouseTrail(x, y) {
    const trail = document.getElementById('mouse-trail');
    const element = document.createElement('div');
    element.className = 'trail-element';
    element.style.left = (x - 10) + 'px';
    element.style.top = (y - 10) + 'px';
    
    let content = '👻';
    switch(trailType) {
        case 'SKULLS': content = '💀'; break;
        case 'FIRE': content = '🔥'; break;
        case 'BUGS': content = '🐛'; break;
        case 'EYES': content = '👀'; break;
        case 'HEARTS': content = '💔'; break;
    }
    
    element.textContent = content;
    element.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    element.style.fontSize = (Math.random() * 20 + 10) + 'px';
    
    trail.appendChild(element);
    
    // Remove after animation
    setTimeout(() => {
        if (element.parentElement) {
            element.parentElement.removeChild(element);
        }
    }, 1000);
}

// SOUND BOARD HELL
function playSound(soundName) {
    if (sounds[soundName]) {
        const sound = sounds[soundName].cloneNode();
        sound.volume = document.getElementById('volume-slider').value / 100;
        sound.play().catch(e => console.log("Sound play prevented:", e));
        
        if (soundName === 'rickroll') {
            // Rickroll the user with a new tab
            setTimeout(() => {
                window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
            }, 1000);
        }
    }
}

function playRandomSound() {
    const soundNames = Object.keys(sounds);
    const randomSound = soundNames[Math.floor(Math.random() * soundNames.length)];
    playSound(randomSound);
}

function changeVolume(value) {
    document.getElementById('volume-display').textContent = value + '%';
}

// IMPOSSIBLE CLOSE BUTTON
function tryToClose() {
    closeAttempts++;
    document.getElementById('close-attempts').textContent = closeAttempts;
    
    const btn = document.getElementById('close-btn');
    const notification = document.getElementById('impossible-notification');
    
    // Make button move away from cursor
    btn.style.position = 'absolute';
    btn.style.left = Math.random() * (notification.offsetWidth - 30) + 'px';
    btn.style.top = Math.random() * (notification.offsetHeight - 30) + 'px';
    
    // Change button text randomly
    const texts = ['X CLOSE', '✓ SURE?', '? REALLY?', '← CLICK ME', '→ NO, ME!', '★ CLOSE?'];
    btn.textContent = texts[Math.floor(Math.random() * texts.length)];
    
    // Only close on the 10th attempt
    if (closeAttempts >= 10) {
        notification.style.display = 'none';
        setTimeout(() => {
            notification.style.display = 'block';
            closeAttempts = 0;
            document.getElementById('close-attempts').textContent = closeAttempts;
            btn.style.position = 'absolute';
            btn.style.left = '5px';
            btn.style.top = '5px';
            btn.textContent = 'X CLOSE';
        }, 5000);
    }
}

// RANDOM BACKGROUND CHANGES
function startRandomBackgroundChanges() {
    setInterval(() => {
        if (Math.random() > 0.8) { // 20% chance every 10 seconds
            document.body.style.backgroundImage = `
                radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, 
                rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.1) 0%, transparent 20%),
                radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, 
                rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.1) 0%, transparent 20%),
                repeating-linear-gradient(${Math.random() * 360}deg, #000, #000 10px, #111 10px, #111 20px)
            `;
        }
    }, 10000);
}

// Prevent right-click (because why not)
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    alert('Right-click is disabled in HELL!');
});

// Prevent keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'c':
            case 'v':
            case 'x':
            case 'a':
            case 'z':
                e.preventDefault();
                alert('Keyboard shortcuts are FORBIDDEN in HELL!');
                break;
            case 'w':
                e.preventDefault();
                alert('You cannot escape HELL that easily!');
                break;
        }
    }
    
    // Random annoying sound on random key presses
    if (Math.random() > 0.9) {
        playRandomSound();
    }
});

// nightmare.js
// UI Nightmare - The Worst JavaScript

// Global variables
let currentSection = 'home';
let loadingProgress = 0;
let frustrationLevel = 0;
let confusionLevel = 0;
let leaveDesire = 0;
let mysteryClicks = 0;
let notificationCount = 0;
let autoRefreshInterval;
let movingButtonsInterval;
let sizeChangeInterval;
let typingInterval;
let progressInterval;
let adInterval;

// Initialize the nightmare
document.addEventListener('DOMContentLoaded', function() {
    startLoadingSequence();
    initializeNightmare();
    startAutoFeatures();
    spawnFloatingAds();
    startProgressBars();
    createCustomCursor();
    startRandomNotifications();
});

function startLoadingSequence() {
    const loadingInterval = setInterval(() => {
        loadingProgress += Math.random() * 10;
        if (loadingProgress >= 100) {
            loadingProgress = 99.9; // Never reach 100%
        }
        
        document.getElementById('loading-progress').style.width = loadingProgress + '%';
        document.getElementById('loading-text').textContent = 
            `Initializing frustration modules: ${Math.floor(loadingProgress)}%`;
        
        // Occasionally decrease progress
        if (Math.random() > 0.8) {
            loadingProgress = Math.max(0, loadingProgress - 15);
        }
        
        // Show main content after "loading"
        if (loadingProgress > 85 && Math.random() > 0.95) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                document.getElementById('loading-screen').style.display = 'none';
                document.getElementById('main-content').classList.remove('hidden');
                showNotification("Welcome to UI Nightmare! 😈");
            }, 1000);
        }
    }, 200);
}

function initializeNightmare() {
    console.log("🌙 INITIALIZING UI NIGHTMARE...");
    console.log("> Preparing maximum frustration...");
    console.log("> Loading annoying features...");
    console.log("> System ready to torture!");
    
    // Start various annoying features
    startMovingButtons();
    startAutoSizeChanges();
    startAutoRefresh();
    startTypingEffect();
    
    // Random system sounds
    setInterval(() => {
        if (Math.random() > 0.7) {
            playSystemSound();
        }
    }, 10000);
    
    // Random page shakes
    setInterval(() => {
        if (Math.random() > 0.8) {
            shakePage();
        }
    }, 15000);
}

function startAutoFeatures() {
    // Auto-refresh content
    autoRefreshInterval = setInterval(() => {
        const content = document.getElementById('auto-refresh-content');
        const texts = [
            "This content changes for no reason!",
            "Why are you still reading this?",
            "Seriously, find something better to do!",
            "This text is completely useless!",
            "You're wasting your time here!",
            "The content has changed again!",
            "Surprise! Different text!",
            "Did you expect consistency?",
            "Welcome to content chaos!",
            "Refresh, refresh, refresh!"
        ];
        content.textContent = texts[Math.floor(Math.random() * texts.length)];
        content.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }, 3000);
    
    // Random theme changes
    setInterval(() => {
        if (Math.random() > 0.9) {
            const themes = ['hell', 'chaos', 'pain', 'void'];
            changeTheme(themes[Math.floor(Math.random() * themes.length)]);
        }
    }, 8000);
}

function startMovingButtons() {
    movingButtonsInterval = setInterval(() => {
        const buttons = ['btn1', 'btn2', 'btn3'];
        buttons.forEach(btnId => {
            const btn = document.getElementById(btnId);
            if (btn) {
                const maxX = 300;
                const maxY = 50;
                btn.style.left = Math.random() * maxX + 'px';
                btn.style.top = Math.random() * maxY + 'px';
            }
        });
    }, 1000);
}

function startAutoSizeChanges() {
    sizeChangeInterval = setInterval(() => {
        const boxes = ['size-box1', 'size-box2', 'size-box3'];
        boxes.forEach(boxId => {
            const box = document.getElementById(boxId);
            if (box) {
                const size = Math.random() * 100 + 50;
                box.style.width = size + 'px';
                box.style.height = size + 'px';
                box.style.fontSize = (size / 10) + 'px';
            }
        });
    }, 2000);
}

function startTypingEffect() {
    const text = `This website was created to demonstrate the worst possible user experience. Every element is intentionally designed to frustrate, confuse, and annoy users. From moving buttons to auto-refreshing content, from impossible CAPTCHAs to never-ending loading screens - this is digital hell. Welcome, and good luck surviving this experience.`;
    const typingElement = document.getElementById('typing-text');
    let i = 0;
    
    typingInterval = setInterval(() => {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            i++;
            
            // Occasionally delete text
            if (Math.random() > 0.95 && i > 10) {
                const deleteCount = Math.floor(Math.random() * 20) + 5;
                typingElement.textContent = typingElement.textContent.slice(0, -deleteCount);
                i -= deleteCount;
            }
        } else {
            // Restart typing
            setTimeout(() => {
                typingElement.textContent = '';
                i = 0;
            }, 5000);
        }
    }, 50);
}

function startProgressBars() {
    progressInterval = setInterval(() => {
        // Increase frustration
        frustrationLevel = Math.min(100, frustrationLevel + Math.random() * 2);
        document.getElementById('frustration-progress').style.width = frustrationLevel + '%';
        document.getElementById('frustration-text').textContent = Math.floor(frustrationLevel) + '%';
        
        // Increase confusion
        confusionLevel = Math.min(100, confusionLevel + Math.random() * 1.5);
        document.getElementById('confusion-progress').style.width = confusionLevel + '%';
        document.getElementById('confusion-text').textContent = Math.floor(confusionLevel) + '%';
        
        // Increase desire to leave
        leaveDesire = Math.min(100, leaveDesire + Math.random() * 1.2);
        document.getElementById('leave-progress').style.width = leaveDesire + '%';
        document.getElementById('leave-text').textContent = Math.floor(leaveDesire) + '%';
        
        // Random decreases for "realism"
        if (Math.random() > 0.9) {
            frustrationLevel = Math.max(0, frustrationLevel - 10);
        }
    }, 1000);
}

// Navigation functions
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show selected section
    document.getElementById(sectionName + '-section').classList.remove('hidden');
    currentSection = sectionName;
    
    // Add some annoyance
    frustrationLevel += 5;
    showNotification(`Switched to ${sectionName.toUpperCase()} section`);
    
    // Random section change
    if (Math.random() > 0.7) {
        setTimeout(() => {
            const sections = ['home', 'about', 'services', 'contact', 'settings'];
            const randomSection = sections[Math.floor(Math.random() * sections.length)];
            if (randomSection !== sectionName) {
                showSection(randomSection);
            }
        }, 2000);
    }
}

// Mystery button functions
function mysteryHover() {
    const btn = document.getElementById('mystery-btn');
    btn.textContent = ['❔ MYSTERY', '🔮 MYSTERY', '👻 MYSTERY', '💫 MYSTERY'][Math.floor(Math.random() * 4)];
    btn.style.transform = `scale(${1 + Math.random() * 0.5}) rotate(${Math.random() * 360}deg)`;
}

function mysteryClick() {
    mysteryClicks++;
    const actions = [
        () => showNotification("Mystery solved! Just kidding..."),
        () => shakePage(),
        () => changeTheme('chaos'),
        () => spawnFakeDialog(),
        () => startColorInversion(),
        () => playRandomSound(),
        () => autoClickButtons()
    ];
    
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    randomAction();
    
    if (mysteryClicks >= 5) {
        showNotification("You've clicked mystery too many times! 🎉");
        mysteryClicks = 0;
    }
}

// Feature hover effects
function featureHover(element) {
    element.style.animation = 'none';
    setTimeout(() => {
        element.style.animation = 'featureHover 0.5s ease-out';
    }, 10);
    
    // Random color change
    element.style.backgroundColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.1)`;
}

// Service card clicks
function serviceClick(card) {
    card.style.animation = 'cardSelect 0.5s ease-out';
    showNotification("Service selected! (This does nothing)");
    
    // Random price increase
    const priceElement = card.querySelector('.price');
    const currentPrice = parseFloat(priceElement.textContent.replace(/[^\d.]/g, ''));
    const newPrice = currentPrice * (1 + Math.random() * 0.5);
    priceElement.textContent = `$${newPrice.toFixed(2)}/month`;
    priceElement.style.animation = 'priceFlash 0.3s 3';
}

// Form handling
function inputFocus(input) {
    input.style.transform = 'scale(1.05)';
    input.style.borderColor = '#ffff00';
    showNotification("Field focused! Good job!");
}

function inputBlur(input) {
    input.style.transform = 'scale(1)';
    input.style.borderColor = '#ff0000';
}

function updateAnnoyanceLevel(level) {
    document.getElementById('annoyance-display').textContent = `Level ${level}`;
    frustrationLevel += parseInt(level);
}

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn');
    const originalText = submitBtn.textContent;
    
    // Fake submission process
    submitBtn.textContent = "SENDING...";
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification("Message sent! (To the void)");
        submitBtn.textContent = "SEND AGAIN?";
        submitBtn.disabled = false;
        
        // Clear form
        this.reset();
        
        // Show fake success
        document.getElementById('form-status').innerHTML = 
            '<div class="notification">✅ Message sent successfully! (Not really)</div>';
        
        setTimeout(() => {
            document.getElementById('form-status').innerHTML = '';
        }, 3000);
    }, 3000);
});

// Settings functions
function changeTheme(theme) {
    const themes = {
        hell: { bg: '#000', color: '#ff0000', border: '#ff0000' },
        chaos: { bg: '#000', color: '#00ff00', border: '#00ff00' },
        pain: { bg: '#000', color: '#ffff00', border: '#ffff00' },
        void: { bg: '#000', color: '#ffffff', border: '#ffffff' }
    };
    
    const selected = themes[theme];
    document.body.style.backgroundColor = selected.bg;
    document.body.style.color = selected.color;
    
    document.querySelectorAll('.feature, .service-card, .setting-item').forEach(el => {
        el.style.borderColor = selected.border;
    });
    
    showNotification(`Theme changed to ${theme.toUpperCase()}`);
}

function changeAnimationSpeed(speed) {
    const speeds = {
        1: 'Very Slow', 2: 'Slow', 3: 'A Bit Slow', 4: 'Below Normal',
        5: 'Normal', 6: 'Above Normal', 7: 'Fast', 8: 'Very Fast', 
        9: 'Extreme', 10: 'Ludicrous'
    };
    document.getElementById('speed-display').textContent = speeds[speed];
    
    // Actually change some animation speeds
    document.documentElement.style.setProperty('--animation-speed', `${speed}s`);
}

function changeVolume(volume) {
    document.getElementById('volume-display').textContent = volume + '%';
}

function changeDifficulty(level) {
    const difficulties = {1: 'Easy', 2: 'Medium', 3: 'Hard'};
    document.getElementById('difficulty-display').textContent = difficulties[level];
    
    // Increase annoyance based on difficulty
    frustrationLevel += parseInt(level) * 10;
}

function resetSettings() {
    showNotification("Settings reset! (Just kidding)");
    document.getElementById('theme-select').value = 'hell';
    document.getElementById('animation-speed').value = 5;
    document.getElementById('volume-control').value = 50;
    document.getElementById('difficulty').value = 1;
    
    changeTheme('hell');
    changeAnimationSpeed(5);
    changeVolume(50);
    changeDifficulty(1);
}

function saveSettings() {
    showNotification("Settings saved! (In your dreams)");
    // Actually don't save anything
}

function exportSettings() {
    showNotification("Settings exported to nowhere!");
    // Fake export process
    setTimeout(() => {
        showNotification("Export failed! Try again never!");
    }, 2000);
}

// Floating ads
function spawnFloatingAds() {
    adInterval = setInterval(() => {
        const adContainer = document.getElementById('floating-ads');
        const ad = document.createElement('div');
        ad.className = 'floating-ad';
        ad.id = 'ad-' + Date.now();
        
        const messages = [
            "BUY NOW!",
            "SPECIAL OFFER!",
            "CLICK HERE!",
            "DON'T MISS OUT!",
            "LIMITED TIME!",
            "ACT FAST!",
            "EXCLUSIVE DEAL!",
            "HOT OFFER!",
            "AMAZING DEAL!",
            "UNBEATABLE PRICE!"
        ];
        
        ad.innerHTML = `
            <span>${messages[Math.floor(Math.random() * messages.length)]}</span>
            <button onclick="closeAd('${ad.id}')">X</button>
        `;
        
        ad.style.left = Math.random() * (window.innerWidth - 200) + 'px';
        ad.style.top = Math.random() * (window.innerHeight - 100) + 'px';
        
        adContainer.appendChild(ad);
        
        // Auto-remove after some time
        setTimeout(() => {
            if (ad.parentElement) {
                ad.remove();
            }
        }, 10000);
    }, 5000);
}

function closeAd(adId) {
    const ad = document.getElementById(adId);
    if (ad) {
        ad.style.animation = 'adClose 0.5s forwards';
        setTimeout(() => ad.remove(), 500);
        showNotification("Ad closed! Another one will appear soon!");
    }
}

// Notifications
function showNotification(message) {
    notificationCount++;
    const notifications = document.getElementById('notifications');
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    notifications.appendChild(notification);
    
    // Auto-remove
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
    
    // Limit notifications
    if (notificationCount > 10) {
        const oldNotifications = notifications.querySelectorAll('.notification');
        if (oldNotifications.length > 5) {
            oldNotifications[0].remove();
        }
    }
}

function startRandomNotifications() {
    setInterval(() => {
        if (Math.random() > 0.7) {
            const messages = [
                "System update available!",
                "Your session is being monitored!",
                "New features added! (Not really)",
                "Performance optimized! (Just kidding)",
                "Security scan completed!",
                "Cookies refreshed!",
                "Cache cleared!",
                "Background process running!",
                "Memory usage high!",
                "CPU overload detected!"
            ];
            showNotification(messages[Math.floor(Math.random() * messages.length)]);
        }
    }, 8000);
}

// Fake dialog
function spawnFakeDialog() {
    const messages = [
        "Your computer has been infected with 284 viruses!",
        "System error detected! Contact support immediately!",
        "Your license has expired! Pay $999 to renew!",
        "Critical security alert! Your data is at risk!",
        "Windows has encountered a fatal error!",
        "Your storage is almost full! Buy more space!",
        "Network connection unstable! Check your settings!",
        "Software update required! Restart now!",
        "Memory leak detected! System may crash!",
        "Firewall breached! Immediate action required!"
    ];
    
    document.getElementById('dialog-message').textContent = 
        messages[Math.floor(Math.random() * messages.length)];
    document.getElementById('fake-dialog').classList.remove('hidden');
}

function closeDialog() {
    document.getElementById('fake-dialog').classList.add('hidden');
    showNotification("Dialog closed! Problem solved! (Not really)");
}

function moreInfo() {
    showNotification("More information: This is a fake dialog! 🤡");
    closeDialog();
}

// Cookie functions
function acceptAllCookies() {
    showNotification("All cookies accepted! Your data is ours! 🍪");
    document.getElementById('cookie-hell').style.display = 'none';
}

function rejectCookies() {
    // This should never work
    showNotification("Rejection failed! Cookies forced upon you! 🍪");
}

function customizeCookies() {
    showNotification("Customization is not available! Accept all or leave! 🍪");
}

// Custom cursor
function createCustomCursor() {
    document.addEventListener('mousemove', (e) => {
        const cursor = document.getElementById('custom-cursor');
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Random cursor changes
        if (Math.random() > 0.99) {
            const cursors = ['👆', '👇', '👈', '👉', '🤞', '🤙', '🤌', '👌', '🤏', '✌️'];
            cursor.textContent = cursors[Math.floor(Math.random() * cursors.length)];
        }
    });
}

// Utility functions
function playSystemSound() {
    // System beep sound
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    
    oscillator.frequency.value = 800 + Math.random() * 400;
    gainNode.gain.value = 0.1;
    
    oscillator.start();
    setTimeout(() => oscillator.stop(), 100);
}

function playRandomSound() {
    const sounds = ['airhorn', 'wilhelm', 'fart', 'dialup'];
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    // Play sound implementation would go here
    showNotification(`Playing ${randomSound} sound!`);
}

function shakePage() {
    document.body.style.animation = 'shake 0.5s';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 500);
}

function startColorInversion() {
    document.body.style.filter = 'invert(1)';
    setTimeout(() => {
        document.body.style.filter = '';
    }, 2000);
}

function autoClickButtons() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((btn, index) => {
        setTimeout(() => {
            btn.style.animation = 'buttonClick 0.3s';
            setTimeout(() => btn.style.animation = '', 300);
        }, index * 100);
    });
}

// Prevent user from leaving
window.addEventListener('beforeunload', (e) => {
    if (frustrationLevel > 50) {
        e.preventDefault();
        e.returnValue = 'Are you sure you want to leave this amazing experience?';
    }
});

// Add some CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    
    @keyframes buttonClick {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(0.9); }
    }
    
    @keyframes adClose {
        to { transform: scale(0) rotate(360deg); opacity: 0; }
    }
    
    @keyframes cardSelect {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    @keyframes featureHover {
        0% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
        100% { transform: translateY(0); }
    }
`;
document.head.appendChild(style);